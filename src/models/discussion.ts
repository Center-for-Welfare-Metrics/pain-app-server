import { Schema, model } from "mongoose";

type DiscussionType = {
  path: string;
  user_id: string;
  text: string;
  parent_id: string | null;
  patient_id: string;
  episode_id?: string;
  track_id?: string;
  segment_id?: string;
  deleted?: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const discussionSchema = new Schema(
  {
    path: {
      type: String,
      required: false,
      default: "",
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    text: {
      type: JSON,
      required: true,
    },
    patient_id: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
    },
    episode_id: {
      type: Schema.Types.ObjectId,
      ref: "Episode",
    },
    track_id: {
      type: Schema.Types.ObjectId,
      ref: "Track",
    },
    segment_id: {
      type: Schema.Types.ObjectId,
      ref: "Segment",
    },
    parent_id: {
      type: Schema.Types.ObjectId,
      ref: "Discussion",
      default: null,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

discussionSchema.virtual("user", {
  ref: "user",
  localField: "user_id",
  foreignField: "_id",
  justOne: true,
});

discussionSchema.virtual("replies_count", {
  ref: "discussion",
  localField: "_id",
  foreignField: "parent_id",
  count: true,
});

discussionSchema.virtual("edited").get(function (this: DiscussionType) {
  return this.createdAt.toString() !== this.updatedAt.toString();
});

discussionSchema.set("toObject", { virtuals: true });
discussionSchema.set("toJSON", { virtuals: true });

discussionSchema.methods.toJSON = function () {
  const obj = this.toObject();

  if (!!obj.deletedAt) {
    return {
      ...obj,
      text: null,
    };
  }

  return obj;
};

export const DiscussionModel = model<DiscussionType>(
  "discussion",
  discussionSchema
);
