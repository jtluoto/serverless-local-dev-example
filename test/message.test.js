'use strict';

const message = require('../src/message.js');
const AWS = require('aws-sdk-mock');
const should = require('chai').should()

process.env.MESSAGE_TABLE_NAME = 'messages'

describe('message-get', () => {
  AWS.mock('DynamoDB.DocumentClient', 'get', function (params, callback) {
    if (params.Key.id == 1) {
      callback(null, {Item: {id: 1, message: "This is a message"}});
    } else {
      callback(null, {})
    }
  });

  it('should return correct message when message for the given ID exists', () => {
    return message.get({pathParameters: {id: 1}}).then((response) => {
      const body = JSON.parse(response.body)
      body.message.should.equal("This is a message")
      response.statusCode.should.equal(200)
    });
  });

  it('should return 404 when a message cannot be found', () => {
    return message.get({pathParameters: {id: 2}}).then((response) => {
      response.statusCode.should.equal(404)
    });
  });

  AWS.restore('DynamoDB')
});
