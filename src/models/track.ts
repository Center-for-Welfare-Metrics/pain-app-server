import { Schema, model } from "mongoose";

export interface ITrack {
  name: string;
  pain_type: string;
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
    },
    episode_id: { type: Schema.Types.ObjectId, ref: "episode", required: true },
    comment: { type: String },
  },
  {
    timestamps: true,
  }
);

export const TrackModel = model("track", trackSchema);
