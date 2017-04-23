const windowCrypto = typeof window !== 'undefined' && (window.crypto || window.msCrypto);

import { getCharset } from './charset';

export default function(length = 32, charset = 'alphanumeric') {
  if (!windowCrypto) throw Error('Unsupported');

  const chars = getCharset(charset);
  const charsLen = chars.length;
  const maxByte = 256 - (256 % charsLen);
  let targetLength = length;

  let string = '';
  while (targetLength > 0) {
    // window.crypto.getRandomValues() is used if available (browser env)
    const size = Math.min(Math.ceil(targetLength * 256 / maxByte), 65535);
    const buf = new Uint8Array(size);
    windowCrypto.getRandomValues(buf);

    for (let i = 0; i < buf.length && targetLength > 0; ++i) {
      const randomByte = buf[i];
      if (randomByte < maxByte) {
        string += chars.charAt(randomByte % charsLen);
        --targetLength;
      }
    }
  }

  return string;
}
