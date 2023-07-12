import { valueToString, format } from './xml-helpers';
import { LitXmlOptions } from './lit-xml-options';

export class XmlFragment {
  constructor(
    private xmlLiterals: TemplateStringsArray,
    private values: unknown[],
    private options: LitXmlOptions,
  ) {}

  public toString(): string {
    const xml = this.toStringRaw();
    this.options.validators.forEach((validator) => validator(xml));
    return format(xml, this.options);
  }

  /**
   * @internal
   */
  public toStringRaw() {
    let stringBuilder = '';
    for (let i = 0; i < this.values.length; i++) {
      stringBuilder = stringBuilder.concat(this.xmlLiterals[i], valueToString(this.values[i]));
    }
    return stringBuilder + this.xmlLiterals[this.xmlLiterals.length - 1];
  }
}
