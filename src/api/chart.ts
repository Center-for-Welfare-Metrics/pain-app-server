import RunPop from "@api/stagepop";

import { ProductionSystemModel } from "@models/zoo/production-system";
import { ChartModel } from "@models/zoo/chart";

const extract_harm_data_step_one = (harms) => {
  let harms_ = [];
  harms.forEach((harm) => {
    let { tracks, durations } = harm;
    let random_name = {
      name: harm.name,
      _id: harm._id,
      physical: {
        acute: {
          tracks: [{ segments: [] }],
          durations: [],
          occurrences: harm.occurrences,
          prevalence: harm.prevalence,
        },
        chronic: {
          tracks: [{ segments: [] }],
          durations: [],
          occurrences: harm.occurrences,
          prevalence: harm.prevalence,
        },
        color: harm.color,
      },
      psychological: {
        acute: {
          tracks: [{ segments: [] }],
          durations: [],
          occurrences: harm.occurrences,
          prevalence: harm.prevalence,
        },
        chronic: {
          tracks: [{ segments: [] }],
          durations: [],
          occurrences: harm.occurrences,
          prevalence: harm.prevalence,
        },
        color: harm.color,
      },
    };
    tracks.forEach((track, track_index) => {
      let { physical_or_psychological } = track;
      let { segments } = track;

      segments.forEach((segment, index) => {
        let { painLevel } = segment;

        let { acute_or_chronic } = painLevel;

        if (
          random_name[physical_or_psychological] &&
          random_name[physical_or_psychological][acute_or_chronic]
        ) {
          if (
            random_name[physical_or_psychological][acute_or_chronic].tracks[
              track_index
            ] === undefined
          ) {
            random_name[physical_or_psychological][
              acute_or_chronic
            ].tracks.push({ segments: [] });
          }
          if (physical_or_psychological && acute_or_chronic) {
            random_name[physical_or_psychological][acute_or_chronic].tracks[
              track_index
            ].segments.push(segment);
            random_name[physical_or_psychological][
              acute_or_chronic
            ].durations.push(durations[index]);
          }
        }
      });
    });

    harms_.push(random_name);
  });

  return harms_;
};

const valid_phy_psy_key = (key) => {
  return key === "physical" || key === "psychological";
};

const extract_harm_data_step_two = async (harms_) => {
  return new Promise(async (resolve, reject) => {
    let translated = [];
    let harms_length = harms_.length;

    for (let i = 0; harms_length > i; i++) {
      let harm = harms_[i];
      let chart_data: any = {
        _id: harm._id,
        name: harm.name,
        physical: {
          acute: {},
          chronic: {},
        },
        psychological: {
          acute: {},
          chronic: {},
        },
      };
      const promisses = Object.keys(harm).map(async (psy_or_phy) => {
        if (valid_phy_psy_key(psy_or_phy)) {
          let acute_args = harm[psy_or_phy].acute;
          let chronic_args = harm[psy_or_phy].chronic;
          const acute_response = await RunPop(acute_args);
          const chronic_response = await RunPop(chronic_args);
          return {
            psy_or_phy,
            acute: acute_response,
            chronic: chronic_response,
            color: harm[psy_or_phy].color,
          };
        }
      });

      await Promise.all(promisses).then((response) => {
        response.forEach((psy_or_phy) => {
          if (psy_or_phy) {
            if (psy_or_phy.color) {
              chart_data[psy_or_phy.psy_or_phy].acute = psy_or_phy.acute;
              chart_data[psy_or_phy.psy_or_phy].chronic = psy_or_phy.chronic;
              chart_data.harmType = psy_or_phy.color._id;
            }
          }
        });

        translated.push(chart_data);
      });
    }

    resolve(translated);
  });
};

const run = async (production_system_id, callback = (chart) => {}) => {
  ProductionSystemModel.findById(production_system_id)
    .populate({
      path: "burdens",
      populate: {
        path: "color",
      },
    })
    .then((production_system) => {
      console.log(production_system_id);
      console.log(production_system);
      if (production_system) {
        let harms = production_system.burdens;

        let harms_ = extract_harm_data_step_one(harms);

        extract_harm_data_step_two(harms_).then((translated) => {
          ChartModel.findOneAndUpdate(
            { productionSystemId: production_system_id },
            { plotInfo: translated },
            { upsert: true, new: true }
          )
            .populate("plotInfo.harmType")
            .then((chart) => {
              callback(chart);
            });
        });
      }
    });
};

export default run;
