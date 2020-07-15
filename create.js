const AWS = require('aws-sdk');
AWS.config.region = 'us-west-2';
AWS.config.apiVersion = '2012-11-05';

const sqs = new AWS.SQS();

const message = (err, data) => {
  if (err) { console.log(`Error: ${err.message}`); }
  else if (data) { console.log(`Success: ${JSON.stringify(data, null, 2)}`); }
};

const params = {
  QueueName: 'orders',
  Attributes: { 'ReceiveMessageWaitTimeSeconds': '10' }
};
sqs.createQueue(params, message);
