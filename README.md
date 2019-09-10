# Serverless local development example

A small study on how to execute and test Lambda functions locally. I used:
* Serverless framework to run and deploy the functions to AWS
* Mocha for the test cases
* serverless-mocha-plugin to create the test case skeleton
* aws-sdk-mock to mock DynamoDB queries

First install Serverless framework and npm dependencies:
```
npm install -g serverless
npm -i
```

Mocha plugin can be used to create new functions and tests for them:
```
sls create function -f newFunction --handler src/functions/newFunction.get --path src/test/functions
```

Run unit tests:
```
npm test
```

Functions and the DynamoDB table defined in serverless.yml can be deployed to AWS (AWS profile called 'default' will be used):
```
sls deploy
```

After the DynamoDB table has been created, the functions can be run locally against it:
```
sls invoke local -f message-get --data '{"pathParameters": {"id":"1"}}'
```

The functions deployed to AWS can also be called from the command line:
```
sls invoke -f message-get --data '{"pathParameters": {"id":"1"}}'
```

Start local DynamoDB instance:
```
sls dynamodb start
```

Start HTTP server to access the REST APIs on localhost:3000:
```
sls offline
```
TODO:
- Unit tests don't work with this setup
- For some reason local dynamodb isn't used when invoking functions locally using sls or browser
