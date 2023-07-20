import { Schema, model } from "mongoose";

export interface ISegment {
  name: string;
  pain_type: string;
  episode_id: string;
  comment?: string;
}

const interventionSchema = new Schema(
  {
    name: { type: String, required: true },
    date: { type: Date, required: true },
    dose: { type: String, required: true },
    effective: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const symptomSchema = new Schema(
  {
    name: { type: String, required: true },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const segmentSchema = new Schema(
  {
    name: { type: String, required: true },
    start: { type: Number, required: true },
    end: { type: Number, required: true },
    time_unit: { type: String, required: true },
    start_date: { type: Date },
    estimative_type: { type: String },
    comment: { type: String },
    intensities: {
      draw: { type: Object },
      values: { type: Object },
      justification: { type: String },
    },
    quality: {
      texture: { type: String },
      depth: { type: String },
      anatomy: { type: String },
      comment: { type: String },
    },
    interventions: [interventionSchema],
    symptoms: [symptomSchema],
  },
  {
    timestamps: true,
  }
);

export const SegmentModel = model("segment", segmentSchema);
