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
    callback(null, {Item: {id: 1, message: "This is the message"}});
  });

  it('implement tests here', () => {
    return wrapped.run({pathParameters: {id: 1}}).then((response) => {
      expect(response).to.not.be.empty;
    });
  });

  AWS.restore('DynamoDB')
});
