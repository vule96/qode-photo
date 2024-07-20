import { encode } from 'blurhash';
import sharp from 'sharp';

const encodeImageToBlurHash = (
  buffer: Buffer,
  width: number,
  height: number
) => {
  const hash = encode(new Uint8ClampedArray(buffer), width, height, 4, 4);

  return hash;
};

export const getImageHash = async (path: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    sharp(path)
      .raw()
      .ensureAlpha()
      .resize({ width: 300, height: 300, fit: 'inside' })
      .toBuffer((err, buffer, { width, height }) => {
        if (err) {
          reject(err);
        }

        const hash = encodeImageToBlurHash(buffer, width, height);

        resolve(hash);
      });
  });
};
