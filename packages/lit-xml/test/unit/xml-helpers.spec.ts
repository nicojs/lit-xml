import { format, valueToString, sanitize } from '../../src/xml-helpers';
import { expect } from 'chai';

describe('xml-helpers', () => {
  describe(format.name, () => {
    it('should indent the xml document', () => {
      expect(format('<foo><bar /></foo>', { format: true, indent: 2 })).eq('\n<foo>\n  <bar/>\n</foo>');
    });
    it('should do nothing if format = false', () => {
      expect(format('<foo><bar /></foo>', { format: false, indent: 2 })).eq('<foo><bar /></foo>');
    });
    it('should format xml elements with attributes', () => {
      expect(format('<foo bar="baz"></foo>', { format: true, indent: 2 })).eq('\n<foo bar="baz"/>');
    });
  });

  describe(valueToString.name, () => {
    it('should be able to handle numbers', () => {
      expect(valueToString(3.14)).eq('3.14');
    });
    it('should be able to handle strings', () => {
      expect(valueToString('foo')).eq('foo');
    });
    it('should be able to handle booleans', () => {
      expect(valueToString(true)).eq('true');
    });
    it('should be able to handle null', () => {
      expect(valueToString(null)).eq('null');
    });
    it('should be able to handle undefined', () => {
      expect(valueToString(undefined)).eq('');
    });
    it('should be able to handle arrays', () => {
      expect(valueToString([1, '2', '<>'])).eq('12&lt;&gt;');
    });
    it('should be able to handle Dates', () => {
      expect(valueToString(new Date(Date.UTC(2010, 1, 1, 23, 23, 1)))).eq('2010-02-01T23:23:01.000Z');
    });
    it('should sanitize the value', () => {
      expect(valueToString('<foo attr="test\'"></foo>')).eq('&lt;foo attr=&quot;test&apos;&quot;&gt;&lt;/foo&gt;');
    });
  });

  describe(sanitize.name, () => {
    it('should return normal input', () => {
      expect(sanitize('foo')).eq('foo');
    });

    Object.entries({ ['"']: '&quot;', ["'"]: '&apos;', ['<']: '&lt;', ['>']: '&gt;', ['&']: '&amp;' }).forEach(([specialChar, replacement]) => {
      it(`should escape ${specialChar} (${replacement})`, () => {
        expect(sanitize(specialChar)).eq(replacement);
      });
    });

    it('should escape multiple characters', () => {
      expect(sanitize(`"'&< > <<'"`)).eq('&quot;&apos;&amp;&lt; &gt; &lt;&lt;&apos;&quot;');
    });
  });
});
