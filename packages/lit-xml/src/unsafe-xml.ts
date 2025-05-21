import { UnsafeXmlFragment } from './xml-fragment.js';

export function unsafeXML(unsafeXml: string) {
  return new UnsafeXmlFragment(unsafeXml);
}
