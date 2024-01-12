import { Episode } from "@models/episode";
import { ISegment } from "@models/segment";
import { ISegmentJustification } from "@models/segment-justification";
import { ITrack } from "@models/track";

type ImportSegmentJustificationStructure = Omit<
  ISegmentJustification,
  "segment_id" | "_id"
>;

type ImportSegmentStructure = Omit<ISegment, "track_id" | "_id"> & {
  justifications?: ImportSegmentJustificationStructure[];
};

type ImportTrackStructure = Omit<ITrack, "episode_id" | "_id"> & {
  segments?: ImportSegmentStructure[];
};

export type ImportEpisodeStructure = Omit<
  Episode,
  "patient_id" | "creator_id" | "_id"
> & {
  tracks?: ImportTrackStructure[];
};
