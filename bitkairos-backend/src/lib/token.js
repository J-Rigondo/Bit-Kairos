import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const generateToken = async (payload, subject) => {
  const { JWT_SECRET: secret } = process.env;
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

export default generateToken;
