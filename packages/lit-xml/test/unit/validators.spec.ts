import { isWellFormed } from '../../src/validators.js';
import { expect } from 'chai';
import { InvalidXmlError } from '../../src/invalid-xml-error.js';

describe('validators', () => {
  describe(isWellFormed.name, () => {
    it('should validate a well formed fragment', () => {
      expect(() => isWellFormed('<test>a</test>')).not.throws();
    });
    it('should validate a well formed xml document', () => {
      expect(() => isWellFormed('<?xml version="1.0" encoding="UTF-8" ?>\n<test>a</test>')).not.throws();
    });
    it('should invalidate a not well formed fragment', () => {
      const xml = '<testa</test>';
      expect(() => isWellFormed(xml))
        .throws(InvalidXmlError)
        .property('message')
        .contains("line 1: Tag 'testa</test' is an invalid name");
    });
    it('should invalidate a not well formed document', () => {
      const xml = '<?xml version="1.0" encoding="UTF-8" ?>\n\n<test>a</test>\n<test>b<test>';
      expect(() => isWellFormed(xml))
        .throws(InvalidXmlError)
        .property('message')
        .contains('line 4: Multiple possible root nodes found');
    });
  });
});
