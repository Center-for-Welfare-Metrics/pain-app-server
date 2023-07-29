import { Schema, model } from "mongoose";
import { ISegment } from "./segment";

export type ITrackPainType = "psychological" | "physical";

export const TrackPainTypeEnum: ITrackPainType[] = [
  "psychological",
  "physical",
];

export interface ITrack {
  name: string;
  pain_type: ITrackPainType;
  episode_id: string;
  comment?: string;
  segments?: ISegment[];
}

const trackSchema = new Schema(
  {
    name: { type: String, required: true },
    pain_type: {
      type: String,
      enum: ["psychological", "physical"],
      required: true,
      default: "physical",
    },
    episode_id: { type: Schema.Types.ObjectId, ref: "episode", required: true },
    comment: { type: String },
  },
  {
    timestamps: true,
  }
);

trackSchema.virtual("segments", {
  ref: "segment",
  localField: "_id",
  foreignField: "track_id",
});

trackSchema.set("toObject", { virtuals: true });
trackSchema.set("toJSON", { virtuals: true });

export const TrackModel = model<ITrack>("track", trackSchema);
