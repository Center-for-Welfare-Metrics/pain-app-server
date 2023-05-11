import { EpisodeModel } from "@models/episode structure/episode";

export const list = async (req, res, next) => {
  const { episode_id } = req.query;

  try {
    const episode = await EpisodeModel.findById(episode_id).exec();
    res.send(episode.tracks);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const updateById = async (req, res, next) => {
  try {
    let { track_id, episode_id } = req.params;

    let placeholder = {};
    Object.keys(req.body).forEach((key) => {
      placeholder["tracks.$." + key] = req.body[key];
    });

    const updatedDocument = await EpisodeModel.findOneAndUpdate(
      {
        _id: episode_id,
        "tracks._id": track_id,
      },
      {
        $set: placeholder,
      }
    );

    res.send(updatedDocument);
    // episodeCompleteController.createCompleteEpisode(updatedDocument.episode_id)
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const { episode_id } = req.body;

    EpisodeModel.findById(episode_id, (err, episode) => {
      if (err) req.status(500).send(err.message);

      let tracks = episode.tracks;

      let length = tracks.length;

      const newTrack = {
        name: `Track ${length + 1}`,
        physical_or_psychological: "",
        segments: [],
      };

      let episode_mode = episode.mode;

      if (episode_mode === "path") {
        newTrack.segments.push({
          pathData: {
            name: "Time Segment 1",
          },
        });
      } else {
        newTrack.segments.push({
          painLevel: {
            name: "Time Segment 1",
          },
        });
      }

      if (length > 0) {
        let track = tracks[length - 1];
        track.segments.forEach((segment, index) => {
          if (index > 0) {
            if (episode_mode === "path") {
              newTrack.segments.push({
                pathData: {
                  name: `Time Segment ${index + 1}`,
                },
              });
            } else {
              newTrack.segments.push({
                painLevel: {
                  name: `Time Segment ${index + 1}`,
                },
              });
            }
          }
        });
      }

      episode.tracks.push(newTrack);

      episode.save();

      const newTracks = episode.tracks;

      const trackCreated = newTracks[tracks.length - 1];

      res.status(201).send(trackCreated);
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTrack = async (req, res, next) => {
  let { episode_id, track_id } = req.params;
  try {
    EpisodeModel.findById(episode_id, (err, episode) => {
      episode.tracks.id(track_id).remove();
      episode.save();
      res.status(200).send(episode.tracks);
    });
  } catch (err) {
    next(err);
  }
};
