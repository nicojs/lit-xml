import { Validator } from './validator';

export interface LitXmlOptions {
  readonly validators: Validator[];
  readonly format: boolean;
  readonly indent: number;
}
