import api from "@api/api";
import { performConversion } from "@utils/time-conversion";

const getPythonMathParameters = (burden) => {
  let dist_arr = [];

  let inter_arr = [];

  let occurrences = burden.occurrences || { min: 1, max: 3 };

  let prevalence = burden.prevalence || { min: 1, max: 1 };

  let tracks = burden.tracks;

  tracks.forEach((track) => {
    let dist = [[], [], [], []];

    let intervals = [];

    let segments = track.segments;
    segments.forEach((segment, index) => {
      let { painLevel } = segment;
      dist[0].push(painLevel.excruciating / 100);
      dist[1].push(painLevel.disabling / 100);
      dist[2].push(painLevel.hurtful / 100);
      dist[3].push(painLevel.annoying / 100);

      let duration = burden.durations ? burden.durations[index] : null;

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

    dist_arr.push(dist);
    inter_arr.push(intervals);
  });

  return {
    dist: dist_arr,
    intervals: inter_arr,
    prevalence,
    occurrences,
    count: tracks.length,
  };
};

const run = (burden) => {
  let { dist, intervals, prevalence, occurrences, count } =
    getPythonMathParameters(burden);

  return new Promise((resolve, reject) => {
    api
      .post("pain_app/stagepop", {
        intervals,
        dist,
        prevalence,
        occurrences,
        count,
      })
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
