import AWS from "aws-sdk";

AWS.config.update({ region: "us-east-1", apiVersion: "2010-12-01" });

const SES = new AWS.SES({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

SES.createTemplate(
  {
    Template: {
      TemplateName: "RECOVERY-PASSWORD-TEST",
      HtmlPart: "<h1>Test</h1>",
      SubjectPart: "Test",
      TextPart: "Test",
    },
  },
  function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  }
);
