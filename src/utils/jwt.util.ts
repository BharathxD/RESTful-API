import jwt from "jsonwebtoken";
import config from "config";

const privateKey = config.get<string>("privateKey");
const publicKey = config.get<string>("publicKey");

export const signJWT = (
  object: Object,
  options?: jwt.SignOptions | undefined
) => {
  // Sign JWT with Private Key
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
};

export const verifyJWT = (token: string) => {
  // Sign JWT with Public Key
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded: decoded,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
};
