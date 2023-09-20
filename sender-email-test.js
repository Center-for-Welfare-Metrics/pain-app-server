const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1", apiVersion: "2012-10-17" });

const SES = new AWS.SES({
  accessKeyId: "",
  secretAccessKey: "",
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
