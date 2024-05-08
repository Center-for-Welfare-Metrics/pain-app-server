import { Schema, model } from "mongoose";
import { PatientType } from "./patient";

type PatientsBookmark = {
  patient_id: string;
  user_id: string;
  patient: PatientType;
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

PatientsBookmarkSchema.set("toObject", { virtuals: true });
PatientsBookmarkSchema.set("toJSON", { virtuals: true });

export const PatientsBookmarkModel = model<PatientsBookmark>(
  "patients_bookmark",
  PatientsBookmarkSchema
);
