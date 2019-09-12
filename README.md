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
npm i
```

Run unit tests:
```
npm test
```

The following commands will start an HTTP server that emulates AWS API gateway, a local in-memory DynamoDB instance and will seed the database with the data defined in messages-seed.json. After running the commands browse to http://localhost:3000/message/1
```
sls dynamodb install
sls offline start
```

Functions can also be run locally against the DynamoDB table created into AWS:
```
sls invoke local -f message-get --data '{"pathParameters": {"id":"1"}}'
```

The command above should not be able to find a message because at this point the DynamoDB table on AWS is empty. To seed the online database run the following command:
```
sls dynamodb seed --online --region=us-east-1
```

Functions and the DynamoDB table defined in serverless.yml can also be deployed to AWS (AWS profile called 'default' will be used):
```
sls deploy
```

The deployed function can now be invoked:
```
sls invoke -f message-get --data '{"pathParameters": {"id":"1"}}'
```
