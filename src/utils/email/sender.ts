import AWS from "aws-sdk";

AWS.config.update({ region: "us-east-1", apiVersion: "2010-12-01" });

type SendData = {
  name: string;
  action_url: string;
  support_url: string;
  operating_system: string;
  browser_name: string;
};

export const sendRecoveryPasswordEmail = async (to: string, data: SendData) => {
  const SES = new AWS.SES({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  });

  const params: AWS.SES.SendTemplatedEmailRequest = {
    Destination: {
      ToAddresses: [to],
    },
    Source: "no-reply@welfarefootprint.org",
    Template: "RECOVERY-PASSWORD",
    TemplateData: JSON.stringify(data),
  };

  SES.sendTemplatedEmail(params, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
};
