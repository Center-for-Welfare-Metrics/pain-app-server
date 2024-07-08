import { Schema, model } from "mongoose";
import { Episode } from "./episode";

type EpisodesBookmark = {
  episode_id: string;
  user_id: string;
  episode: Episode;
};

const EpisodesBookmarkSchema = new Schema({
  episode_id: {
    type: Schema.Types.ObjectId,
    ref: "episode",
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

EpisodesBookmarkSchema.index({ episode_id: 1, user_id: 1 });

EpisodesBookmarkSchema.virtual("episode", {
  ref: "episode",
  localField: "episode_id",
  foreignField: "_id",
  justOne: true,
});

EpisodesBookmarkSchema.virtual("discussions_count", {
  ref: "discussion",
  localField: "episode_id",
  foreignField: "episode_id",
  count: true,
});

EpisodesBookmarkSchema.set("toObject", { virtuals: true });
EpisodesBookmarkSchema.set("toJSON", { virtuals: true });

export const EpisodesBookmarkModel = model<EpisodesBookmark>(
  "episodes_bookmark",
  EpisodesBookmarkSchema
);
