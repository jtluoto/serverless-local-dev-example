# Serverless local development example

A small project for trying out different ways to run and test Lambda functions and DynamoDB locally. I used:
* Serverless framework to run and deploy the functions to AWS
* Mocha for the test cases
* aws-sdk-mock to mock DynamoDB queries when running the unit tests
* serverless-offline to emulate AWS Lambda and API Gateway on your local machine
* serverless-dynamodb-local to run local DynamoDB in conjunction with serverless-offline
* serverless-dynamodb-dlient to switch between local and online DynamoDB
* serverless-mocha-plugin to create the test case skeleton

First install Serverless framework and npm dependencies:
```
npm install -g serverless
npm -i
```

Run unit tests:
```
npm test
```

To start an HTTP server and a local in-memory DynamoDB instance that is seeded with the data defined in messages-seed.json, run the command below and browse to http://localhost:3000/message/1
```
sls offline start
```

Functions and the DynamoDB table defined in serverless.yml can also be deployed to AWS (AWS profile called 'default' will be used):
```
sls deploy
```

Invoke the deployed function (note: the DynamoDB table created in AWS is empty at this point):
```
sls invoke -f message-get --data '{"pathParameters": {"id":"1"}}'
```

Functions can also be run locally agains the DynamoDB table created into AWS:
```
sls invoke local -f message-get --data '{"pathParameters": {"id":"1"}}'
```

Mocha plugin can be used to create new functions and tests for them:
```
sls create function -f newFunction --handler src/functions/newFunction.get --path src/test/functions
```
