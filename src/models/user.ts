/* eslint-disable linebreak-style */
import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: false },
  provider: { type: String, required: false },
  zoo: { type: Boolean, default: false },
  super: { type: Boolean, default: false },
});

export const UserModel = model("user", userSchema);
