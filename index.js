const AWS = require('aws-sdk'),
  fs = require('fs'),
  parse = require('csv-parse/lib/sync'),
  csv=require('csvtojson');


AWS.config.update({
  region: "eu-west-2"
});

const s3 = new AWS.S3();
const client = new AWS.DynamoDB.DocumentClient();

const params = {
  Bucket: 'csv-premier-league-bucket',
  Key: 'cities.csv',
};

async function csvToDynamoDB() {
  const stream = s3.getObject(params).createReadStream();

  csv().fromStream(stream).on('data', (row) => {
    let content = JSON.parse(row);

    console.log(JSON.stringify(content))

    let pushParams = {
      TableName: "PremierLeague",
      Item: {
        "Date": Date().now(),
        "City": content.City,
        "State": content.State,
      }
    };

    client.put(pushParams, (err, res) => {
      
      if(err)
        console.log(err)
      else {
        console.log("Added item:", JSON.stringify(pushParams.Item, null, 2));
      }
    })
  })
}

csvToDynamoDB();
