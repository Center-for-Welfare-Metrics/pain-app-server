import { PatientModel } from "@models/patient";
import { EpisodeModel } from "@models/episode structure/episode";

export const create = async (req, res, next) => {
  try {
    const patient = { ...req.body, userId: null };
    if (!patient.name) {
      const queryObj: any = {};
      Object.assign(queryObj, req.query);
      queryObj.userId = req.user._id;
      const count = await PatientModel.countDocuments(queryObj).exec();
      patient.name = `Patient ${count + 1}`;
    }
    if (req.user) {
      patient.userId = req.user._id;
    }

    if (!patient.userId) delete patient.userId;

    const newPatient = new PatientModel(patient);
    const createdPatient = await newPatient.save();
    res.status(201);
    res.send(createdPatient);
  } catch (err) {
    next(err);
  }
};

export const deleteById = async (req, res, next) => {
  try {
    await PatientModel.findByIdAndDelete(req.params.id).exec();
    await EpisodeModel.deleteMany({ patientId: req.params.id }).exec();
    res.send();
  } catch (err) {
    next(err);
  }
};
