import { Schema, model } from "mongoose";

const patientSchema = new Schema(
  {
    name: { type: String, required: true },
    birth_date: { type: Date, required: true },
    creator_id: { type: Schema.Types.ObjectId, ref: "user", required: true },
    about: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

export const PatientModel = model("patient", patientSchema);
