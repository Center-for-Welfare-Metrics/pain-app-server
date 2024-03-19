import AWS from "aws-sdk";

AWS.config.update({ region: "us-east-1", apiVersion: "2010-12-01" });

type SendContactEmail = {
  email: string;
  subject: string;
  message: string;
  browser: string;
  os: string;
  time: string;
};

export const sendContactEmail = async (data: SendContactEmail) => {
  const SES = new AWS.SES({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  });

  const params: AWS.SES.SendTemplatedEmailRequest = {
    Destination: {
      ToAddresses: ["contact@welfarefootprint.org"],
    },
    Source: "from-pain-track@welfarefootprint.org",
    Template: "CONTACT-FORM",
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
