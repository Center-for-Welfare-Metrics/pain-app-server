import { Schema, model } from "mongoose";

export type setPasswordCode = {
  user: string;
  code: string;
  code_used: boolean;
  secret_token: string;
  expires_at: Date;
  createdAt: Date;
  updatedAt: Date;
};

const setPasswordCodeSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    code: { type: String, required: true, index: true },
    secret_token: { type: String, required: true, index: true },
    code_used: { type: Boolean, required: true, default: false },
    expires_at: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

export const SetPasswordCodeModel = model<setPasswordCode>(
  "set_password_code",
  setPasswordCodeSchema
);
