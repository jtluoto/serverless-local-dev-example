'use strict';

// const AWS = require('aws-sdk')
const dynamodb = require('serverless-dynamodb-client');

module.exports.get = async (event) => {
  var id = event.pathParameters.id

  const params = {
    TableName:
      process.env.MESSAGE_TABLE_NAME,
    Key: {
      id: id
    }
  }

  const docClient = dynamodb.doc // new AWS.DynamoDB.DocumentClient()
  const promise = docClient.get(params).promise();
  const result = await promise;

  if (result.Item) {
    return sendResponse(200, JSON.stringify(result.Item));
  } else {
    return sendResponse(404, JSON.stringify({
      error: `Message corresponding to id ${id} not found`
    }))
  }
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