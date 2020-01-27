import { createLitXml, XmlTemplateLiteral, validators, InvalidXmlError, xml } from '../../src';
import { expect } from 'chai';

describe(createLitXml.name, () => {
  describe('with well formed validator', () => {
    let customXml: XmlTemplateLiteral;
    beforeEach(() => {
      customXml = createLitXml({ validators: [validators.isWellFormed] });
    });
    it('should throw for non-well-formed xml', () => {
      expect(() => customXml`<foo></bar>`.toString()).throws(InvalidXmlError);
    });
  });
  describe('default xml template tag', () => {
    it('should allow non well-formed documents', () => {
      expect(xml`test</test>`.toString()).eq('test</test>');
    });

    it('should allow an interpolated value right at the end', () => {
      expect(xml`${4 + 4}`.toString()).eq('8');
    });
  });
});
