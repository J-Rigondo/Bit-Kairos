import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const { JWT_SECRET: secret } = process.env;

export const generateToken = async (payload, subject) => {
  try {
    const result = jwt.sign(payload, secret, {
      issuer: 'bitkairos.com',
      expiresIn: '7d',
      subject
    });
    return result;
  } catch (e) {
    console.log(e);
  }
};

export const decodeToken = async (token) => {
  try {
    const result = jwt.verify(token, secret);
    return result;
  } catch (e) {
    console.log(e);
  }
};
