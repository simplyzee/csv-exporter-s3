"use strict";

const AWS = require("aws-sdk"),
  csv = require("csvtojson");

module.exports.handler = (event) => {
  console.log("received", event);

  AWS.config.update({
    region: "eu-west-2",
  });

  const s3 = new AWS.S3();
  const client = new AWS.DynamoDB.DocumentClient();

  const params = {
    Bucket: "csv-cities-example-bucket",
    Key: "cities.csv",
  };

  const stream = s3.getObject(params).createReadStream();

  csv()
    .fromStream(stream)
    .on("data", (row) => {
      let content = JSON.parse(row);

      console.log(JSON.stringify(content));

      let pushParams = {
        TableName: "PremierLeague",
        Item: {
          Date: Date().now(),
          City: content.City,
          State: content.State,
        },
      };

      client.put(pushParams, (err, res) => {
        if (err) console.log(err);
        else {
          console.log("Added item:", JSON.stringify(pushParams.Item, null, 2));
        }
      });
    });
}
