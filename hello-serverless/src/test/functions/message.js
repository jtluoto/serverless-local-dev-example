'use strict';

const messageFunction = require('../../../src/functions/message.js');
const mochaPlugin = require('serverless-mocha-plugin');
const AWS = require('aws-sdk-mock');

const lambdaWrapper = mochaPlugin.lambdaWrapper
const expect = mochaPlugin.chai.expect;
const wrapped = lambdaWrapper.wrap(messageFunction, { handler: 'get' })

process.env.MESSAGE_TABLE_NAME = 'messages'

describe('message-get', () => {
  before((done) => {
    done();
  });

  AWS.mock('DynamoDB.DocumentClient', 'get', function (params, callback) {
    if (params.Key.id == 1) {
      callback(null, {Item: {id: 1, message: "This is a message"}});
    } else {
      callback(null, {})
    }
  });

  it('should return correct message when message for the given ID exists', () => {
    return wrapped.run({pathParameters: {id: 1}}).then((response) => {
      const body = JSON.parse(response.body)
      expect(body.message).to.equal("This is a message");
    });
  });

  it('should return 404 and an empty body when message cannot be found', () => {
    return wrapped.run({pathParameters: {id: 2}}).then((response) => {
      expect(response.statusCode).to.equal(404)
      expect(response.body).to.be.empty
    });
  });

  AWS.restore('DynamoDB')
});
