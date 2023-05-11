import { ChartModel } from "@models/zoo/chart";
import chartApi from "@api/chart";

export const get = (request, response) => {
  let { prod_id } = request.params;

  ChartModel.findOne({ productionSystemId: prod_id })
    .populate("plotInfo.harmType")
    .then((chart) => {
      if (!chart) {
        chartApi(prod_id, (new_chart) => {
          response.status(200).json(new_chart);
        });
      } else {
        response.status(200).json(chart);
      }
    })
    .catch((error) => {
      response.status(500).json(error);
    });
};
