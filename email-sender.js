const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1", apiVersion: "2012-10-17" });

const SES = new AWS.SES({
  accessKeyId: "",
  secretAccessKey: "",
});

var params = {
  Destination: {
    /* required */
    CcAddresses: [
      "",
      /* more CC email addresses */
    ],
    ToAddresses: [
      "",
      /* more To email addresses */
    ],
  },
  Source: "" /* required */,
  Template: "RECOVERY-PASSWORD-TEST" /* required */,
  TemplateData: '{ "REPLACEMENT_TAG_NAME":"REPLACEMENT_VALUE" }' /* required */,
};

SES.sendTemplatedEmail(params, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});
