import { expect } from 'chai';

import random from '../src/randomstring-browserify';

describe('randomstringBrowserify', () => {
  it('generates string', () => {
    expect(random()).to.be.a('string');
  });

  it('generates 32 chars by default', () => {
    expect(random()).to.have.lengthOf(32);
  });

  it('accepts length parameter', () => {
    expect(random(16)).to.have.lengthOf(16);
  });

  it('accepts `numeric` as charset paremter', () => {
    expect(random(10000, 'numeric')).to.match(/^\d+$/)
  });

  it('accepts `alphabetic` as charset paremter', () => {
    expect(random(10000, 'alphabetic')).to.match(/^[a-zA-Z]+$/)
  });

  it('accepts `alphanumeric` as charset paremter', () => {
    expect(random(10000, 'alphanumeric')).to.match(/^\w+$/)
  });

  it('accepts `hex` as charset paremter', () => {
    expect(random(10000, 'hex')).to.match(/^[0-9abcdef]+$/)
  });

  it('accepts customized charset paremter', () => {
    expect(random(10000, 'loremipsum')).to.match(/^[loremipsum]+$/)
  });

  it('generates unique strings', () => {
    const num = 1000;

    const results = {};
    for (let i = 0; i < num; ++i) {
      const s = random();
      expect(results[s]).not.to.be.true;
      results[s] = true;
    }
  });

  it('generates unbiased strings', () => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const slen = 1000000;
    const avg = slen / chars.length;

    const s = random(slen, chars);

    const counts = {};
    for (let i = 0; i < s.length; ++i) {
      const c = s.charAt(i);
      counts[c] = (counts[c] || 0) + 1;
    }

    Object.keys(counts).sort().forEach(key => {
      const diff = counts[key] / avg;
      expect(diff).to.closeTo(1, 0.05, `Bias on ${key}: expected average is ${avg}, got ${counts[key]}`);
    });
  });
});
