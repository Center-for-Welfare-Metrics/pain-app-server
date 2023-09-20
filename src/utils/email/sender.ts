import AWS from "aws-sdk";

AWS.config.update({ region: "us-east-1" });

const SES = new AWS.SES({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const params = {
  Destination: {
    CcAddresses: [],
    ToAddresses: [],
  },
};
