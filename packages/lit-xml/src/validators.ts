import { XMLValidator } from 'fast-xml-parser';
import { InvalidXmlError } from './invalid-xml-error';

export function isWellFormed(xml: string) {
  const validationResult = XMLValidator.validate(xml);
  if (validationResult !== true) {
    throw new InvalidXmlError(validationResult.err.line, validationResult.err.msg, xml);
  }
}
