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

export type ISegmentValues = {
  excruciating?: number;
  disabling?: number;
  hurful?: number;
  annoying?: number;
};

const segmentValuesSchema = new Schema({
  excruciating: { type: Number },
  disabling: { type: Number },
  hurful: { type: Number },
  annoying: { type: Number },
});

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
      type: { type: String, enum: intensityTypeEnum, default: "values" },
      draw: { type: Object },
      values: segmentValuesSchema,
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

export type ISegmentIntensities = {
  type: IIntensityType;
  draw?: any;
  values?: ISegmentValues;
  justification?: string;
};

export type ISegmentQuality = {
  texture?: string;
  depth?: string;
  anatomy?: string;
  comment?: string;
};

export type ISegment = {
  name?: string;
  start?: number;
  end?: number;
  time_unit: ISegmentTimeUnit;
  start_date?: string;
  estimative_type: ISegmentEstimativeType;
  comment?: string;
  pain_type: ISegmentPainType;
  intensities: ISegmentIntensities;
  quality?: ISegmentQuality;
  interventions: IIntervention[];
  symptoms: ISymptom[];
  track_id: string;
};

export const SegmentModel = model<ISegment>("segment", segmentSchema);
