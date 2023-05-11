import { EpisodeModel } from "@models/episode structure/episode";
import { TrackModel } from "@models/episode structure/track";
const RunPop = require("../api/stagepop");

export const create = async (req, res, next) => {
  try {
    let defName;
    if (req.user) {
      const queryObj: any = {};
      Object.assign(queryObj, req.query);
      queryObj.userId = req.user._id;
      queryObj.patientId = { $exists: true, $ne: null };
      const count = await EpisodeModel.countDocuments(queryObj).exec();
      defName = `Episode ${count + 1}`;
    } else {
      defName = "Episode";
    }
    const episode: any = {
      patientId: null,
      userId: null,
      name: defName,
      segment_names: ["Time Segment 1"],
    };
    if (req.user) {
      episode.userId = req.user._id;
    }

    if (req.body.patientId) {
      episode.patientId = req.body.patientId;
    }

    if (!episode.userId) delete episode.userId;
    if (!episode.patientId) delete episode.patientId;

    episode.mode = "path";

    let newTrack = {
      name: "Track 1",
      physical_or_psychological: "",
      segments: [
        {
          painLevel: {
            name: "Time Segment 1",
          },
          pathData: {
            name: "Time Segment 1",
          },
        },
      ],
    };

    episode.tracks = [new TrackModel(newTrack)];

    const newEpisode = new EpisodeModel(episode);
    const createdEpisode = await newEpisode.save();

    createdEpisode.save();

    res.status(201);
    res.send(createdEpisode);

    // episodeCompleteController.createCompleteEpisode(createdEpisode._id)
  } catch (err) {
    next(err);
  }
};

export const countAllWithPatient = async (req, res, next) => {
  try {
    const queryObj: any = {};
    Object.assign(queryObj, req.query);
    queryObj.userId = req.user._id;
    queryObj.patientId = { $exists: true, $ne: null };
    const count = await EpisodeModel.countDocuments(queryObj).exec();

    res.send({ count });
  } catch (err) {
    next(err);
  }
};

export const updateById = async (req, res, next) => {
  try {
    const episode = await EpisodeModel.findById(req.params.id).exec();
    let update = {
      ...req.body,
    };
    if (!episode.userId) {
      if (req.user?._id) {
        update.userId = req.user._id;
      }
    }
    const updatedDocument = await EpisodeModel.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    )
      .populate("patientId")
      .exec();
    res.send(updatedDocument);
  } catch (err) {
    next(err);
  }
};

export const updateResume = async (req, res, next) => {
  try {
    EpisodeModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((episode) => {
        RunPop(episode).then((resume) => {
          episode.resume = resume;

          episode.save();

          res.status(200).send(resume);
        });
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
};
