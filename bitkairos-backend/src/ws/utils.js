import lzutf8 from 'lzutf8';

export const parseJSON = (str) => {
  let parsed = null;

  try {
    parsed = JSON.parse(str);
  } catch (e) {
    return null;
  }
  return parsed;
};

export const compress = (str) => {
  return new Promise((resolve, reject) => {
    lzutf8.compressAsync(
      str,
      { outputEncoding: 'BinaryString' },
      (result, error) => {
        if (error) reject(error);
        resolve(result);
      }
    );
  });
};
