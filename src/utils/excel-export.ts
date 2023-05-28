import excel from "exceljs";
// import { ProductionSystemModel } from "@models/zoo/production-system";
import { getRightTimeUnit } from "@utils/time-conversion";

export const excelExport = (req, res) => {
  // let workbook = new excel.Workbook();
  // let worksheet = workbook.addWorksheet("Pain Track - Export");
  // worksheet.columns = [
  //   { header: "Housing", key: "housing", width: 10 },
  //   { header: "Harm", key: "harm", width: 10 },
  //   { header: "Intensity", key: "intensity", width: 10 },
  //   {
  //     header: "Time in Pain per Average Laying Hen (all occurrences)",
  //     key: "time_in_pain",
  //     width: 10,
  //   },
  //   { header: "Error", key: "error1", width: 10 },
  //   { header: "Time in Pain per occurrence", key: "per_occurrence", width: 10 },
  //   { header: "Error", key: "error2", width: 10 },
  // ];
  // ProductionSystemModel.find({})
  //   .populate("burdens")
  //   .then((production_systems) => {
  //     production_systems.forEach((production_system) => {
  //       let burdens = production_system.burdens;
  //       let housing = production_system.name;
  //       burdens.forEach((burden) => {
  //         let harm = burden.name;
  //         let tracks = burden.tracks;
  //         let time_in_pain = burden.resume;
  //         tracks.forEach((track) => {
  //           let occurrence_resume = track.resume;
  //           ["excruciating", "disabling", "hurtful", "annoying"].forEach(
  //             (pain) => {
  //               let new_row = {
  //                 housing: housing,
  //                 harm: harm,
  //                 intensity: pain,
  //                 time_in_pain: getRightTimeUnit(
  //                   time_in_pain[pain].expected_time_spent,
  //                   "h"
  //                 ),
  //                 error1: getRightTimeUnit(
  //                   time_in_pain[pain].standard_deviation,
  //                   "h"
  //                 ),
  //                 per_occurrence: getRightTimeUnit(
  //                   occurrence_resume[pain].expected_time_spent,
  //                   "h"
  //                 ),
  //                 error2: getRightTimeUnit(
  //                   occurrence_resume[pain].standard_deviation,
  //                   "h"
  //                 ),
  //               };
  //               console.log(new_row);
  //               worksheet.addRow(new_row);
  //             }
  //           );
  //         });
  //       });
  //     });
  //     res.status(200);
  //     res.setHeader(
  //       "Content-Type",
  //       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  //     );
  //     res.setHeader(
  //       "Content-Disposition",
  //       "attachment; filename=paintrack.xlsx"
  //     );
  //     workbook.xlsx.write(res).then(function () {
  //       res.end();
  //     });
  //   });
};
