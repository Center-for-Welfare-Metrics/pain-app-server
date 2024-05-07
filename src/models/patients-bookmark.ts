import { Schema, model } from "mongoose";

type PatientsBookmark = {
  patient_id: string;
  user_id: string;
};

const PatientsBookmarkSchema = new Schema({
  patient_id: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

PatientsBookmarkSchema.virtual("patient", {
  ref: "patient",
  localField: "patient_id",
  foreignField: "_id",
  justOne: true,
});

export const PatientsBookmarkModel = model<PatientsBookmark>(
  "patients_bookmark",
  PatientsBookmarkSchema
);
