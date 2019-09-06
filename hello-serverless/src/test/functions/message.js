'use strict';
const mochaPlugin = require('serverless-mocha-plugin');
const expect = mochaPlugin.chai.expect;
let wrapped = mochaPlugin.getWrapper('message-get', '../../../src/functions/message.js', 'get');
const AWS = require('aws-sdk-mock');
const message = require('../../../src/functions/message.js');
const AWS_SDK = message.getAWS();

describe('message-get', () => {
  before((done) => {
    done();
  });

  process.env.MESSAGE_TABLE_NAME = 'messages'
  AWS.setSDKInstance(AWS_SDK);
  AWS.mock('DynamoDB', 'get', function (params, callback){
    callback(null, {Item: {id: 1, message: "This is the message"}});
  });

  it('implement tests here', () => {
    return wrapped.run({pathParameters: {id: 1}}).then((response) => {
      expect(response).to.not.be.empty;
    });
  });
});
