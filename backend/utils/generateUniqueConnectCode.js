import { customAlphabet } from "nanoid";
import User from "../models/User.js";

const generateCode = customAlphabet("0123456789", 6);

const generateUniqueConnectCode = async () => {
  let code, exists;

  do {
    code = generateCode();
    exists = await User.exists({ connectCode: code });
  } while (exists);

  return code;
};

export default generateUniqueConnectCode;
