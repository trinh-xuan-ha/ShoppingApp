import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";

dotenv.config();
export const getAccessToken = async (payload: {
  _id: ObjectId;
  email: string;
  rule: number;
}) => {
  return jwt.sign(payload, process.env.SECRET_KEY as string);
};
