import { BurdenModel } from "@models/zoo/burden";
import { TrackModel } from "@models/episode structure/track";
import RunMulti from "@api/multistage";
import RunPop from "@api/stagepop";
import RunChart from "@api/chart";

import { reorder as sortReorder } from "@utils/sort";

export const create = async (req, res, next) => {
  try {
    let defName;
    let order;
    if (req.user) {
      const queryObj: any = {};
      Object.assign(queryObj, req.query);
      queryObj.userId = req.user._id;
      if (req.body.productionSystemId) {
        queryObj.productionSystemId = req.body.productionSystemId;
      } else {
        queryObj.productionSystemId = { $exists: true, $ne: null };
      }
      const count = await BurdenModel.countDocuments(queryObj).exec();
      defName = `Burden ${count + 1}`;
      order = count + 1;
    } else {
      defName = "Burden";
    }
    const burden: any = {
      productionSystemId: null,
      userId: null,
      name: defName,
      order: order,
    };
    if (req.user) {
      burden.userId = req.user._id;
    }

    if (req.body.productionSystemId) {
      burden.productionSystemId = req.body.productionSystemId;
    }

    if (!burden.userId) delete burden.userId;
    if (!burden.productionSystemId) delete burden.productionSystemId;

    const newTrack = {
      name: "",
      physical_or_psychological: "",
      segments: [
        {
          painLevel: {},
        },
      ],
    };

    burden.tracks = [new TrackModel(newTrack)];
    burden.segment_names = [""];
    const newburden = new BurdenModel(burden);
    const createdburden = await newburden.save();

    createdburden.save();

    res.status(201);
    res.send(createdburden);
  } catch (err) {
    next(err);
  }
};

export const countAllWithPatient = async (req, res, next) => {
  try {
    const queryObj: any = {};
    Object.assign(queryObj, req.query);
    queryObj.userId = req.user._id;
    queryObj.productionSystemId = { $exists: true, $ne: null };
    const count = await BurdenModel.countDocuments(queryObj).exec();

    res.send({ count });
  } catch (err) {
    next(err);
  }
};

export const updateById = async (req, res, next) => {
  try {
    const { track_id, data } = req.body;

    BurdenModel.findByIdAndUpdate(req.params.id, data, { new: true })
      .populate("color productionSystemId")
      .then((burden) => {
        if (track_id) {
          let track = burden.tracks.id(track_id);
          RunMulti(burden, track.segments)
            .then((resume) => {
              track.resume = resume;
              burden.save();
              res.status(200).send(track);
            })
            .catch((error) => {
              next(error);
            });
        } else {
          burden.save();
          res.status(200).send(burden);
        }
      })
      .catch((error) => {
        next(error);
      });
  } catch (err) {
    next(err);
  }
};

export const reorder = async (req, res, next) => {
  const { items } = req.body;

  sortReorder(items, BurdenModel)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      next(error);
    });
};

export const updateResume = async (req, res, next) => {
  try {
    let { id, prod_id } = req.params;
    BurdenModel.findByIdAndUpdate(id, req.body, { new: true })
      .then((burden) => {
        RunPop(burden).then((resume) => {
          burden.resume = resume;
          burden.save().then(() => {
            try {
              RunChart(prod_id);
            } catch (error) {
              console.error(error);
            }
          });
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
