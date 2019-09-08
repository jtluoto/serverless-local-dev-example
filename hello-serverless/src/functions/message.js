const AWS = require('aws-sdk')

module.exports.get = async (event) => {
  var id = event.pathParameters.id

  const params = {
    TableName:
      process.env.MESSAGE_TABLE_NAME,
    Key: {
      id: id
    }
  }

  const dynamoDb = AWS.DynamoDB.DocumentClient()
  const promise = dynamoDb.get(params).promise();
  const result = await promise;
  return sendResponse(200, JSON.stringify(result.Item));
};

const sendResponse = (status, body) => {
  var response = {
    statusCode: status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: body
  };
  return response;
};
