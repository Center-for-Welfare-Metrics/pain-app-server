import { BurdenModel } from "@models/zoo/burden";

import Run from "@api/multistage";

export const createSegment = async (req, res, next) => {
  try {
    let { track_id, episode_id } = req.body;

    const episode = await BurdenModel.findOneAndUpdate(
      { _id: episode_id },
      {},
      { new: true }
    );

    let old_segments = episode.tracks.id(track_id).segments;

    episode.tracks.id(track_id).segments.push({
      painLevel: {
        name: `Time Segment ${old_segments.length + 1}`,
      },
    });
    episode.save();

    let segments = episode.tracks.id(track_id).segments;
    res.status(201).send(segments);
    // episodeCompleteController.createCompleteEpisode(null, req.body.track_id, null)
  } catch (err) {
    next(err);
  }
};

export const updateSegment = async (req, res, next) => {
  try {
    let { body } = req;
    let { episode_id, track_id, id } = req.params;

    await BurdenModel.findById(episode_id, (err, episode) => {
      let track = episode.tracks.id(track_id);

      let segments = track.segments;

      let segment = segments.id(id);

      if (segment) {
        Object.keys(body).forEach((key) => {
          segment[key] = body[key];
        });
      }

      Run(episode, segments)
        .then((resume) => {
          track.resume = resume;
          episode.save();
          res.status(200).send(track);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    });
  } catch (err) {
    next(err);
  }
};

export const deleteSegment = async (req, res, next) => {
  let { episode_id, track_id, id } = req.params;
  try {
    const updatedDocument = await BurdenModel.findById(
      episode_id,
      (err, episode) => {
        let track = episode.tracks.id(track_id);

        let segments = track.segments;

        segments.id(id).remove();

        let segment_length = segments.length;

        let need_delete = true;

        episode.tracks.forEach((track) => {
          let this_segments = track.segments;
          let this_length = this_segments.length;
          if (this_length > segment_length) {
            need_delete = false;
          }
        });

        if (need_delete) {
          episode.durations.splice(segment_length, 1);
        }

        Run(episode, track.segments)
          .then((resume) => {
            track.resume = resume;
            episode.save();
            res.status(200).send(episode);
          })
          .catch((error) => {
            res.status(500).send(error);
          });
      }
    );
  } catch (err) {
    next(err);
  }
};
