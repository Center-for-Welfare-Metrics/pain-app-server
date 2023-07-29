import { Schema, model } from "mongoose";

const interventionSchema = new Schema(
  {
    name: { type: String, required: true },
    date: { type: Date, required: true },
    dose: { type: String, required: true },
    effective: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

export type IIntervention = {
  name: string;
  date: Date;
  dose: string;
  effective: boolean;
};

const symptomSchema = new Schema(
  {
    name: { type: String, required: true },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

export type ISymptom = {
  name: string;
  date: Date;
};

export const intensityTypeEnum = ["draw", "values"];
export const segmentTimeUnitEnum = ["minutes", "hours", "days"];
export const segmentEstimativeTypeEnum = ["reported", "measured", "inferred"];
export const segmentPainTypeEnum = ["acute", "chronic"];

const segmentSchema = new Schema(
  {
    name: { type: String },
    start: { type: Number },
    end: { type: Number },
    time_unit: {
      type: String,
      enum: segmentTimeUnitEnum,
      required: true,
      default: "minutes",
    },
    start_date: { type: Date },
    estimative_type: {
      type: String,
      enum: segmentEstimativeTypeEnum,
      required: true,
      default: "reported",
    },
    comment: { type: String },
    pain_type: {
      type: String,
      enum: segmentPainTypeEnum,
      required: true,
      default: "acute",
    },
    intensities: {
      type: { type: String, enum: intensityTypeEnum, default: "draw" },
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
    track_id: { type: Schema.Types.ObjectId, ref: "track" },
  },
  {
    timestamps: true,
  }
);

type IIntensityType = "draw" | "values";
type ISegmentTimeUnit = "minutes" | "hours" | "days";
type ISegmentEstimativeType = "reported" | "measured" | "inferred";
type ISegmentPainType = "acute" | "chronic";
export interface ISegment {
  name: string;
  start: number;
  end: number;
  time_unit: ISegmentTimeUnit;
  start_date: Date;
  estimative_type: ISegmentEstimativeType;
  comment: string;
  pain_type: ISegmentPainType;
  intensities: {
    type: IIntensityType;
    draw: any;
    values: any;
    justification: string;
  };
  quality: {
    texture: string;
    depth: string;
    anatomy: string;
    comment: string;
  };
  interventions: IIntervention[];
  symptoms: ISymptom[];
}

export const SegmentModel = model<ISegment>("segment", segmentSchema);
