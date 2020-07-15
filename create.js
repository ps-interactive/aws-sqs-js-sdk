const AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});

const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

const message = (err, data) => {
  if (err) { console.log(`Error: ${err.message}`); }
  else if (data) { console.log(`Success: ${JSON.stringify(data, null, 2)}`); }
};

const params = {
  QueueName: 'orders',
  Attributes: { 'ReceiveMessageWaitTimeSeconds': '10' }
};
sqs.createQueue(params, message);
