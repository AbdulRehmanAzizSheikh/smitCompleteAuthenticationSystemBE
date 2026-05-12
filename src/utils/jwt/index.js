import jwt from "jsonwebtoken";

const generateToken = async (payload, expiresIn) => {
  return await jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn });
};

const verifyToken = async (token) => {
  return await jwt.verify(token, process.env.JWT_SECRET);
};

export { generateToken, verifyToken };
