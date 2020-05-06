import { valueToString, format } from './xml-helpers';
import { LitXmlOptions } from './lit-xml-options';

export class XmlFragment {
  constructor(private xmlLiterals: TemplateStringsArray, private values: unknown[], private options: LitXmlOptions) {}

  public toString(): string {
    const xml = this.toStringRaw();
    this.options.validators.forEach((validator) => validator(xml));
    return format(xml, this.options);
  }

  /**
   * @internal
   */
  public toStringRaw() {
    const xmlBuilder: string[] = [];
    for (let i = 0; i < this.values.length; i++) {
      xmlBuilder.push(this.xmlLiterals[i]);
      xmlBuilder.push(valueToString(this.values[i]));
    }
    xmlBuilder.push(this.xmlLiterals[this.xmlLiterals.length - 1]);
    return xmlBuilder.join('');
  }
}
