# serverless-comparison

The project contains a couple of example Mocha tests for the Lambda functions. aws-sdk-mock is used for mocking DynamoDB queries.
```
cd hello-serverless
npm test
```
Lambda functions can also be run locally using sls. Note that this won't work if the sls deploy has not been executed because it creates the DynamoDB table that is queried by the Lambda function.
```
cd hello-serverless
sls invoke local --stage prod -f message-get --data '{ "pathParameters": {"id":"1"}}'
```
