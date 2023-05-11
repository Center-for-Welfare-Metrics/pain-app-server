import * as gitlabApi from "@external-api/gitlab";

export const create = async (req, res, next) => {
  try {
    await gitlabApi.addIssue(req.body);
    res.status(201).send();
  } catch (err) {
    next(err);
  }
};
