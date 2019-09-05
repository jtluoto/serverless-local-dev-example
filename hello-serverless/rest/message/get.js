const AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports.get = async (event) => {
  var id = event.pathParameters.id

  const params = {
    TableName:
      process.env.MESSAGE_TABLE_NAME,
    Key: {
      id: id
    }
  }

  const promise = dynamoDb.get(params).promise();
  const result = await promise;
  return sendResponse(200, `${result.Item.message}`);
};

const sendResponse = (status, body) => {
  var response = {
    statusCode: status,
    headers: {
      "Content-Type": "text/html"
    },
    body: body
  };
  return response;
};
