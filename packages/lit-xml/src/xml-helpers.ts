import { XmlFragment } from './xml-fragment';
import { LitXmlOptions } from './lit-xml-options';
import { j2xParser as J2xParser, parse, J2xOptions, X2jOptions } from 'fast-xml-parser';

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
  return sanitize((value as any).toString());
}

function isJsonSerializable(value: any): value is { toJSON(): string } {
  return value && typeof value.toJSON === 'function';
}

const fastXmlOptions: Partial<J2xOptions & X2jOptions> = {
  attributeNamePrefix: '',
  attrNodeName: '$attr', //default is 'false'
  textNodeName: '#text',
  ignoreAttributes: false,
  ignoreNameSpace: false,
  allowBooleanAttributes: false,
  parseNodeValue: true,
  parseAttributeValue: false,
  trimValues: true,
  cdataTagName: '__cdata', //default is 'false'
  cdataPositionChar: '\\c',
  parseTrueNumberOnly: false,
  arrayMode: false,
  supressEmptyNode: true,
};

export function format(xml: string, { format, indent }: Pick<LitXmlOptions, 'format' | 'indent'>): string {
  if (format) {
    const indentBy = new Array(indent).fill(' ').join('');
    const xmlAsJson = parse(xml, fastXmlOptions);
    return new J2xParser({ ...fastXmlOptions, format, indentBy }).parse(xmlAsJson);
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
