import { LitXmlOptions } from './lit-xml-options';
import { XmlFragment } from './xml-fragment';

const DEFAULT_OPTIONS: Readonly<LitXmlOptions> = {
  format: false,
  indent: 2,
  validators: [],
  strictTemplateValues: false,
};

export type XmlPrimitive = string | number | boolean | bigint | XmlFragment | XmlFragment[];

export type XmlTemplateLiteralTag<T> = (xmlLiterals: TemplateStringsArray, ...values: T[]) => XmlFragment;

export type XmlTemplateLiteral = XmlTemplateLiteralTag<unknown>;
export type StrictXmlTemplateLiteral = XmlTemplateLiteralTag<XmlPrimitive>;

export function createLitXml<T extends Partial<LitXmlOptions>>(
  overrideOptions?: T,
): XmlTemplateLiteralTag<T extends { strictTemplateValues: true } ? XmlPrimitive : unknown> {
  const options = Object.freeze({ ...DEFAULT_OPTIONS, ...overrideOptions });
  return function xml(xmlLiterals: TemplateStringsArray, ...values: unknown[]): XmlFragment {
    return new XmlFragment(xmlLiterals, values, options);
  };
}
createLitXml.inject = ['lit-xml-options'] as const;

export const xml = createLitXml();
