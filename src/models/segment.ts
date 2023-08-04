import { Schema, model } from "mongoose";

const interventionSchema = new Schema(
  {
    name: { type: String, required: true },
    datetime: { type: Date, required: true },
    dose: { type: String, required: true },
    effective: { type: Boolean, required: true },
    observation: { type: String },
  },
  {
    timestamps: true,
  }
);

export type IIntervention = {
  name: string;
  datetime: Date;
  dose: string;
  effective: boolean;
  observation?: string;
};

const symptomSchema = new Schema(
  {
    name: { type: String, required: true },
    datetime: { type: Date, required: true },
    observation: { type: String },
  },
  {
    timestamps: true,
  }
);

export type ISymptom = {
  name: string;
  datetime: Date;
  observation?: string;
};

export type ISegmentValues = {
  excruciating?: number;
  disabling?: number;
  hurful?: number;
  annoying?: number;
};

const intensityValuesSchema = new Schema(
  {
    excruciating: { type: Number },
    disabling: { type: Number },
    hurful: { type: Number },
    annoying: { type: Number },
  },
  {
    _id: false,
  }
);

export const intensityTypeEnum = ["draw", "values"];
export const segmentTimeUnitEnum = ["minutes", "hours", "days"];
export const segmentEstimativeTypeEnum = ["reported", "measured", "inferred"];
export const segmentPainTypeEnum = ["acute", "chronic"];

export const qualityTextureEnum = [
  "stretching",
  "stinging",
  "burning",
  "pressing",
] as const;

type IQualityTexture = (typeof qualityTextureEnum)[number];

export const qualityDepthEnum = [
  "muscular",
  "visceral",
  "superficial",
  "bone",
] as const;

type IQualityDepth = (typeof qualityDepthEnum)[number];

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
      values: intensityValuesSchema,
      justification: { type: String },
    },
    quality: {
      texture: { type: String, enum: qualityTextureEnum },
      depth: { type: String, enum: qualityDepthEnum },
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
  texture?: IQualityTexture;
  depth?: IQualityDepth;
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
