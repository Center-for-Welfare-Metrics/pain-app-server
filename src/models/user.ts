import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  provider: { type: String, required: false },
  super: { type: Boolean, default: false },
  role: { type: String, enum: ["doctor", "veterinarian"], required: false },
});

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UserModel = model("user", userSchema);
