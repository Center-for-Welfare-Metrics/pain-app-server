import api from "@api/api";
import { performConversion } from "@utils/time-conversion";

const getPythonMathParameters = (episode, segments) => {
  let dist = [[], [], [], []];

  let intervals = [];

  segments.forEach((segment, index) => {
    let { painLevel } = segment;
    dist[0].push(painLevel.excruciating / 100);
    dist[1].push(painLevel.disabling / 100);
    dist[2].push(painLevel.hurtful / 100);
    dist[3].push(painLevel.annoying / 100);

    let duration = episode.durations ? episode.durations[index] : null;

    if (duration && duration.unit) {
      let min = performConversion(
        "hour",
        duration.unit.name,
        duration.duration_min || 0
      );
      let max = performConversion(
        "hour",
        duration.unit.name,
        duration.duration_max || 0
      );
      intervals.push([min, max]);
    } else {
      intervals.push([0, 0]);
    }
  });

  return {
    dist,
    intervals,
  };
};

const run = (source_of_duration, segments) => {
  let { dist, intervals } = getPythonMathParameters(
    source_of_duration,
    segments
  );

  return new Promise((resolve, reject) => {
    api
      .post("pain_app/multistage", { intervals, dist })
      .then((response) => {
        let json = response.data;
        let names = ["excruciating", "disabling", "hurtful", "annoying"];
        let resume = {};
        json.forEach((item, index) => {
          resume[names[index]] = item;
        });
        resolve(resume);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export default run;
