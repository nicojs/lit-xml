import { LitXmlOptions } from './lit-xml-options';
import { XmlFragment } from './xml-fragment';

const DEFAULT_OPTIONS: Readonly<LitXmlOptions> = {
  format: false,
  indent: 2,
  validators: []
};

export type XmlTemplateLiteral = (xmlLiterals: TemplateStringsArray, ...values: unknown[]) => XmlFragment;

export function createLitXml(overrideOptions?: Partial<LitXmlOptions>) {
  const options = Object.freeze({ ...DEFAULT_OPTIONS, ...overrideOptions });
  return function xml(xmlLiterals: TemplateStringsArray, ...values: unknown[]): XmlFragment {
    return new XmlFragment(xmlLiterals, values, options);
  };
}
createLitXml.inject = ['lit-xml-options'] as const;

export const xml = createLitXml();
