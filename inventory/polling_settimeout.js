var AWS = require('aws-sdk');
AWS.config.region = 'us-west-2';

const sqs = new AWS.SQS();
const QueueUrl = "<queueurl>";

const receiveMessage = () => {
  const params = {
    QueueUrl: QueueUrl,
    MaxNumberOfMessages: 10,
    VisibilityTimeout: 10,
    WaitTimeSeconds: 10
  };
  sqs.receiveMessage(params, (err, data) => {
    if (err) { console.log(err); }
    if (data.Messages) {
      data.Messages.map(message => {
        const body = JSON.parse(message.Body);
        removeFromQueue(message);
      });
      receiveMessage();
    } else {
      setTimeout(() => receiveMessage(), 20 * 1000);
    }
  });
};

const removeFromQueue = (message) => {
  const params = {
    QueueUrl : QueueUrl,
    ReceiptHandle : message.ReceiptHandle
  };
  sqs.deleteMessage(params, (err, data) => { err && console.log(err); });
};

receiveMessage();
