# csv-importer-s3

A nodejs application that will import the object of a specific CSV file and then store the data in dynamodb.

## Requirements

The `import` requirements must be installed if you want to run this locally.

`npm install`
`node index.js` will execute the application

## Environment Variables

AWS Access keys are required for this to run locally. On a Lambda function, this won't be necessary.

``` bash
export AWS_ACCESS_KEY_id=[the-key]
export AWS_SECRET_ACCESS_KEY=[secret-key]
```
