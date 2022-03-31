import { XmlFragment } from './xml-fragment';
import { LitXmlOptions } from './lit-xml-options';
import { X2jOptions, XmlBuilderOptions, XMLParser, XMLBuilder } from 'fast-xml-parser';

export function valueToString(value: unknown): string {
  if (value instanceof XmlFragment) {
    return value.toStringRaw();
  }
  if (value === null) {
    return 'null';
  }
  if (value === undefined) {
    return '';
  }
  if (isJsonSerializable(value)) {
    return sanitize(value.toJSON());
  }
  if (Array.isArray(value)) {
    return value.map(valueToString).join('');
  }
  // eslint-disable-next-line
  return sanitize((value as any).toString());
}

function isJsonSerializable(value: unknown): value is { toJSON(): string } {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return Boolean(value) && typeof (value as any).toJSON === 'function';
}

const fastXmlOptions: Partial<XmlBuilderOptions & X2jOptions> = {
  attributeNamePrefix: '',
  preserveOrder: true, //to keep the formatted result same
  textNodeName: '#text',
  ignoreAttributes: false,
  removeNSPrefix: false,
  allowBooleanAttributes: false,
  suppressBooleanAttributes: false,
  parseTagValue: true,
  parseAttributeValue: false,
  trimValues: true,
  cdataPropName: '__cdata', //default is 'false'
  suppressEmptyNode: true,
  // @ts-expect-error It's missing in options type but it's there available for XMLBuilder
  entities: [
    { regex: new RegExp('&', 'g'), val: '&amp;' }, //it must be on top
    { regex: new RegExp('>', 'g'), val: '&gt;' },
    { regex: new RegExp('<', 'g'), val: '&lt;' },
    { regex: new RegExp('"', 'g'), val: '&quot;' },
  ],
};

export function format(xml: string, { format, indent }: Pick<LitXmlOptions, 'format' | 'indent'>): string {
  if (format) {
    const indentBy = new Array(indent).fill(' ').join('');
    const xmlAsJson: unknown = new XMLParser(fastXmlOptions).parse(xml, fastXmlOptions);
    return new XMLBuilder({ ...fastXmlOptions, format, indentBy }).build(xmlAsJson) as string;
  } else {
    return xml;
  }
}

const XML_ESCAPE_MAP = Object.freeze({
  ['&']: '&amp;',
  ["'"]: '&apos;',
  ['"']: '&quot;',
  ['<']: '&lt;',
  ['>']: '&gt;',
});

const XML_SPECIAL_CHAR_REGEX = new RegExp(`([${Object.keys(XML_ESCAPE_MAP).join('')}])`, 'g');

/**
 * Escapes XML characters
 * " => &quot;
 * ' => &apos;
 * < => &lt;
 * > => &gt;
 * & => &amp;
 * @see https://stackoverflow.com/questions/1091945/what-characters-do-i-need-to-escape-in-xml-documents#answer-1091953
 * @param text the input text to be escaped
 */
export function sanitize(text: string) {
  return text.replace(XML_SPECIAL_CHAR_REGEX, (_match, char: keyof typeof XML_ESCAPE_MAP) => XML_ESCAPE_MAP[char]);
}
