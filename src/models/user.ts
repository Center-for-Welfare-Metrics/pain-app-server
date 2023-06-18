import { Schema, model } from "mongoose";

export interface IUser {
  email: string;
  name: string;
  password: string;
  provider?: string;
  super?: boolean;
  role?: string;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    provider: { type: String, required: false },
    super: { type: Boolean, default: false },
    role: { type: String, enum: ["doctor", "veterinarian"], required: false },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UserModel = model<IUser>("user", userSchema);
