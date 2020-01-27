import parser from 'fast-xml-parser';
import { InvalidXmlError } from './invalid-xml-error';

export function isWellFormed(xml: string) {
  const validationResult = parser.validate(xml);
  if (validationResult !== true) {
    throw new InvalidXmlError(validationResult.err.line, validationResult.err.msg, xml);
  }
}
