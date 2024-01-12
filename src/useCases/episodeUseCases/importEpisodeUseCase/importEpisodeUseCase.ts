import { Episode } from "@models/episode";
import { ImportEpisodeStructure } from "./type";
import {
  CreateEpisodeFromImportImplementation,
  CreateEpisodeImplementation,
} from "@implementations/mongoose/episodes";
import { ITrack } from "@models/track";
import { CreateTrackFromImportImplementation } from "@implementations/mongoose/track";
import { ISegment } from "@models/segment";
import { CreateSegmentFromImportImplementation } from "@implementations/mongoose/segment";
import { CreateJustificationImplementation } from "@implementations/mongoose/segment-justification";
import {
  removeAllWhereValueIsNull,
  removeAll_ids,
} from "@utils/object-helpers";

type ImportEpisodeParams = {
  episode: ImportEpisodeStructure;
  patient_id: string;
  creator_id: string;
};

export const importEpisodeUseCase = async ({
  episode: rawEpisode,
  patient_id,
  creator_id,
}: ImportEpisodeParams) => {
  const episode = removeAll_ids(removeAllWhereValueIsNull(rawEpisode));

  const episodeData: Omit<
    Episode,
    "patient_id" | "creator_id" | "createdAt" | "updatedAt"
  > = {
    name: episode.name,
    location: episode.location,
    diagnosis: episode.diagnosis,
    start_date: episode.start_date,
    comment: episode.comment,
  };

  const episode_created = await CreateEpisodeFromImportImplementation({
    creator_id,
    patient_id,
    ...episodeData,
  });

  const tracks = episode.tracks;
  if (tracks) {
    for (const track of tracks) {
      const trackData: Omit<ITrack, "episode_id" | "_id"> = {
        name: track.name,
        pain_type: track.pain_type || "physical",
        comment: track.comment,
      };

      const trackCreated = await CreateTrackFromImportImplementation({
        episode_id: episode_created._id.toString(),
        comment: trackData.comment,
        name: trackData.name,
        pain_type: trackData.pain_type,
      });

      const segments = track.segments;

      if (segments) {
        for (const segment of segments) {
          const segmentData: Omit<ISegment, "track_id" | "_id"> = {
            estimative_type: segment.estimative_type || "reported",
            start_date: segment.start_date,
            end: segment.end,
            start: segment.start,
            intensities: segment.intensities,
            comment: segment.comment,
            interventions: segment.interventions,
            pain_type: segment.pain_type,
            symptoms: segment.symptoms,
            time_unit: segment.time_unit,
            name: segment.name,
            quality: segment.quality,
          };

          const segmentCreated = await CreateSegmentFromImportImplementation({
            track_id: trackCreated._id.toString(),
            ...segmentData,
          });

          const justifications = segment.justifications;

          if (justifications) {
            for (const justification of justifications) {
              await CreateJustificationImplementation({
                segment_id: segmentCreated._id.toString(),
                description: justification.description,
                ranking: justification.ranking,
                sources: justification.sources,
                title: justification.title,
                type_of_evidence: justification.type_of_evidence,
              });
            }
          }
        }
      }
    }
  }

  return episode_created;
};
