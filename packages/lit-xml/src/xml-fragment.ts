import { valueToString, format } from './xml-helpers.js';
import { LitXmlOptions } from './lit-xml-options.js';

export class XmlFragment {
  constructor(
    private xmlLiterals: TemplateStringsArray,
    private values: unknown[],
    private options: LitXmlOptions,
  ) {}

  /**
   * Converts the XML fragment to a string.
   * This method runs the validators on the generated XML string.
   */
  public toString(): string {
    const xml = this.toStringRaw();
    this.options.validators.forEach((validator) => validator(xml));
    return format(xml, this.options);
  }

  /**
   * @internal
   * Same as `toString`, but does not run the validators.
   */
  public toStringRaw() {
    let stringBuilder = '';
    for (let i = 0; i < this.values.length; i++) {
      stringBuilder = stringBuilder.concat(this.xmlLiterals[i], valueToString(this.values[i]));
    }
    return stringBuilder + this.xmlLiterals[this.xmlLiterals.length - 1];
  }
}

export class UnsafeXmlFragment {
  #unsafeXml;
  constructor(unsafeXml: string) {
    this.#unsafeXml = unsafeXml;
  }

  public toString(): string {
    return this.#unsafeXml;
  }
}
