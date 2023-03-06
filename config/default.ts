import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT,
  dbUri: process.env.MONGODB_URI,
  saltWorkFactor: process.env.SALT_WORK_FACTOR,
  accessTokenTTL: process.env.ACCESS_TOKEN_TTL,
  refreshTokenTTL: process.env.REFRESH_TOKEN_TTL,
  accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
  refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY,
  accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY,
  refreshTokenPublicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY,
};
