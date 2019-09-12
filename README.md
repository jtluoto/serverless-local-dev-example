# Serverless local development example

A small project for trying out different ways to run and test Lambda functions and DynamoDB locally when using Serverless framework. I used:
* Mocha for the test cases
* aws-sdk-mock to mock DynamoDB queries when running the unit tests
* serverless-offline to emulate AWS Lambda and API Gateway on your local machine
* serverless-dynamodb-local to run a local DynamoDB in conjunction with serverless-offline

To support using local DynamoDB instance when running the Lambda functions locally using serverless-offline but using the AWS DynamoDB when running the functions deployed to AWS, there's a small function in aws-options.js that returns correct DocumentClient settings depending on where the function is being run.

## How to run
First install Serverless framework and npm dependencies:
```
npm install -g serverless
npm -i
```

Run unit tests:
```
npm test
```

To start an HTTP server and a local in-memory DynamoDB instance that is seeded with the data defined in messages-seed.json, run the commands below and browse to http://localhost:3000/message/1
```
sls dynamodb install
sls offline start
```

Functions can also be run locally agains the DynamoDB table created into AWS:
```
sls invoke local -f message-get --data '{"pathParameters": {"id":"1"}}'
```

Functions and the DynamoDB table defined in serverless.yml can also be deployed to AWS (AWS profile called 'default' will be used):
```
sls deploy
```

Invoke the deployed function (note: the DynamoDB table created in AWS is empty at this point):
```
sls invoke -f message-get --data '{"pathParameters": {"id":"1"}}'
```
