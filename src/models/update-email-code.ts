import { Schema, model } from "mongoose";

export type UpdateEmailCode = {
  newEmail: string;
  user: string;
  code: string;
  expires_at: Date;
  createdAt: Date;
  updatedAt: Date;
};

const updateEmailCodeSchema = new Schema(
  {
    newEmail: { type: String, required: true, index: true },
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    code: { type: String, required: true, index: true },
    expires_at: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

export const UpdateEmailCodeModel = model<UpdateEmailCode>(
  "update_email_code",
  updateEmailCodeSchema
);
