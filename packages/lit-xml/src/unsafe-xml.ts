import { UnsafeXmlFragment } from './xml-fragment.js';

/**
 * Renders a string as raw XML rather than text.
 * Note that the string passed here MUST be developer-controlled and not include untrusted content. Examples of untrusted content include query string parameters and values from user inputs.
 * For security considerations, see https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML#security_considerations (but apply to XML).
 * @param value The raw XML string that will be placed directly into the document.
 * @returns
 */
export function unsafeXml(value: string) {
  return new UnsafeXmlFragment(value);
}
