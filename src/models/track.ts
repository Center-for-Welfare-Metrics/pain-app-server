import { Schema, model } from "mongoose";

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

export const TrackModel = model<ITrack>("track", trackSchema);
