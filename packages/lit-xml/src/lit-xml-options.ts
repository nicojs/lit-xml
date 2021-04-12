import { Validator } from './validator';

export interface LitXmlOptions {
  readonly validators: Validator[];
  readonly format: boolean;
  readonly indent: number;
  /**
   * Enable strict mode for the template values.
   * This mode requires all template values to be a xml primitive (`string | number | boolean | bigint | XmlFragment | XmlFragment[]`)
   */
  readonly strictTemplateValues: boolean;
}
