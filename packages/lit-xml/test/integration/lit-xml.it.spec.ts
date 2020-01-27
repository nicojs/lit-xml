import { expect } from 'chai';
import { xml, createLitXml } from '../../src';

describe('LitXml integration', () => {
  it('should sanitize XML', () => {
    expect(xml`<foo>${'</foo>'}</foo>`.toString()).eq('<foo>&lt;/foo&gt;</foo>');
  });

  it('should sanitize "deep" XML', () => {
    expect(xml`<foo>${'</foo>'}${xml`<bar>${'</bar>'}</bar>`}</foo>`.toString()).eq('<foo>&lt;/foo&gt;<bar>&lt;/bar&gt;</bar></foo>');
  });

  it('should format the xml literal', () => {
    const xml = createLitXml({ format: true });
    expect(xml`<baz><foo bar="${true}">${42}</foo></baz>`.toString()).eq('<baz>\n  <foo bar="true">42</foo>\n</baz>\n');
  });
});
