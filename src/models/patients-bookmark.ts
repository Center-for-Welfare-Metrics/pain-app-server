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
    index: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
});

PatientsBookmarkSchema.index({ patient_id: 1, user_id: 1 });

PatientsBookmarkSchema.virtual("patient", {
  ref: "patient",
  localField: "patient_id",
  foreignField: "_id",
  justOne: true,
});

PatientsBookmarkSchema.virtual("discussions_count", {
  ref: "discussion",
  localField: "patient_id",
  foreignField: "patient_id",
  count: true,
  match: {
    parent_id: null,
    deletedAt: null,
  },
});

PatientsBookmarkSchema.set("toObject", { virtuals: true });
PatientsBookmarkSchema.set("toJSON", { virtuals: true });

export const PatientsBookmarkModel = model<PatientsBookmark>(
  "patients_bookmark",
  PatientsBookmarkSchema
);
