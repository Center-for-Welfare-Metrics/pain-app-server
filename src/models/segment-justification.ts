import { Schema, model } from "mongoose";
import { ISegmentValues } from "./segment";

export const typeOfEvidenceEnum = [
  "behavioral",
  "neurological",
  "physiological",
  "pharmacological",
];

const JustificationSchema = new Schema({
  title: { type: String, required: false },
  type_of_evidence: { type: String, required: false, enum: typeOfEvidenceEnum },
  description: { type: String, required: false },
  sources: { type: String, required: false },
  ranking: {
    excruciating: { type: Number, required: false, default: 0 },
    disabling: { type: Number, required: false, default: 0 },
    hurful: { type: Number, required: false, default: 0 },
    annoying: { type: Number, required: false, default: 0 },
    no_pain: { type: Number, required: false, default: 0 },
  },
  segment_id: { type: Schema.Types.ObjectId, ref: "segment", required: true },
});

type IJustificationType =
  | "behavioral"
  | "neurological"
  | "physiological"
  | "pharmacological";

export type ISegmentJustification = {
  title?: string;
  type_of_evidence?: IJustificationType;
  description?: string;
  sources?: string;
  ranking?: ISegmentValues;
};

export const SegmentJustification = model<ISegmentJustification>(
  "justification",
  JustificationSchema
);
