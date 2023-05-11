import { EpisodeModel } from "@models/episode structure/episode";
import Run from "@api/multistage";

export const createSegment = async (req, res, next) => {
  try {
    let { track_id, episode_id } = req.body;
    const episode = await EpisodeModel.findOneAndUpdate(
      { _id: episode_id },
      {},
      { new: true }
    ).exec();

    let old_segments = episode.tracks.id(track_id).segments;

    episode.tracks.id(track_id).segments.push({
      painLevel: {
        name: `Time Segment ${old_segments.length + 1}`,
      },
      pathData: {
        name: `Time Segment ${old_segments.length + 1}`,
      },
    });

    await episode.save();

    let newSegments = episode.tracks.id(track_id).segments;

    let createdSegment = newSegments[newSegments.length - 1];

    res.status(201).send(createdSegment);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const updateSegment = async (req, res, next) => {
  try {
    let { body } = req;
    let { episode_id, track_id, id } = req.params;

    const episode = await EpisodeModel.findById(episode_id).exec();

    let track = episode.tracks.id(track_id);

    let segments = track.segments;

    let segment = segments.id(id);

    Object.keys(body).forEach((key) => {
      segment[key] = body[key];
    });

    if (episode.mode === "chance") {
      Run(episode, segments)
        .then((resume) => {
          track.resume = resume;
          episode.save();
          res.status(200).send(segment);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    } else {
      episode.save();
      res.status(200).send(segment);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

export const deleteSegment = async (req, res, next) => {
  let { episode_id, track_id, id } = req.params;
  try {
    const episode = await EpisodeModel.findById(episode_id).exec();
    let track = episode.tracks.id(track_id);
    let segments = track.segments;
    segments.id(id).deleteOne();
    let segment_length = segments.length;
    let need_delete = true;

    episode.tracks.forEach((track) => {
      let this_segments = track.segments;
      let this_segments_length = this_segments.length;
      if (this_segments_length > segment_length) {
        need_delete = false;
      }
    });

    if (episode.mode === "chance") {
      Run(episode, segments)
        .then((resume) => {
          track.resume = resume;
          episode.save();
          res.status(200).send(episode);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    } else {
      episode.save();
      res.status(200).send(episode);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
