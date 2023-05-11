import { BurdenModel } from "@models/zoo/burden";

export const updateById = async (req, res, next) => {
  try {
    let { track_id, episode_id } = req.params;

    let placeholder = {};
    Object.keys(req.body).forEach((key) => {
      placeholder["tracks.$." + key] = req.body[key];
    });

    const updatedDocument = await BurdenModel.findOneAndUpdate(
      {
        _id: episode_id,
        "tracks._id": track_id,
      },
      {
        $set: placeholder,
      }
    );

    res.send(updatedDocument);
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const { episode_id } = req.body;

    BurdenModel.findById(episode_id, (err, episode) => {
      let tracks = episode.tracks;

      let length = tracks.length;

      const newTrack = {
        physical_or_psychological: "",
        segments: [
          {
            painLevel: {
              name: "Time Segment 1",
            },
          },
        ],
      };

      if (length > 0) {
        let track = tracks[length - 1];
        track.segments.forEach((segment, index) => {
          if (index > 0) {
            newTrack.segments.push({
              painLevel: {
                name: `Time Segment ${index + 1}`,
              },
            });
          }
        });
      }

      episode.tracks.push(newTrack);

      episode.save();

      res.status(201).send(episode.tracks);
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBurden = async (req, res, next) => {
  let { episode_id, track_id } = req.params;
  try {
    BurdenModel.findById(episode_id, (err, episode) => {
      episode.tracks.id(track_id).remove();
      episode.save();
      res.status(200).send(episode.tracks);
    });
  } catch (err) {
    next(err);
  }
};
