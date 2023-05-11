import { CircumstanceModel } from "@models/external/Circumstance";

export const search = (request, response) => {
  let { name } = request.query;
  CircumstanceModel.find({ name: { $regex: name, $options: "i" } }).then(
    (documents) => {
      response.status(200).json(documents);
    }
  );
};
