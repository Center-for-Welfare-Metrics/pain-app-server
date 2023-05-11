import axios from "axios";

const { GITLAB_API_BASE_URL } = process.env;

type IIssueData = {
  title: string;
  description: string;
};

export const addIssue = (issueData: IIssueData) => {
  const { title, description } = issueData;

  const queryString = new URLSearchParams({
    title,
    description,
    labels: "user-reported",
  }).toString();

  const fullUrl = `${GITLAB_API_BASE_URL}/projects/${process.env.GITLAB_PROJECT_ID}/issues?${queryString}`;
  return axios.post(
    fullUrl,
    {},
    {
      headers: {
        "PRIVATE-TOKEN": process.env.GITLAB_PERSONAL_TOKEN,
      },
    }
  );
};
