const AWS = require('aws-sdk');
AWS.config.region = 'us-west-2';
AWS.config.apiVersion = '2012-11-05';

const sqs = new AWS.SQS();
const params = {
  QueueName: 'orders',
  Attributes: { 'ReceiveMessageWaitTimeSeconds': '10' }
};
sqs.createQueue(params, messageJSON);
