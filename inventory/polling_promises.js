const AWS = require('aws-sdk');
AWS.config.region = 'us-west-2'


const sqs = new AWS.SQS({ params: { QueueUrl: QueueUrl } });


class EmptyQueue extends Error {
  constructor(message) {
    super(message);
    this.type = 'EmptyQueue';
  }
}

const pollMessages = (() => {
  sqs.receiveMessage({ WaitTimeSeconds: 10, VisibilityTimeout: 10 }).promise()
    .then(data => {
      if (!data.Messages) {
        throw new EmptyQueue('There are no messages in the queue.');
      }
      return sqs.deleteMessage({ ReceiptHandle: data.Messages[0].ReceiptHandle }).promise();
    })
    .then(data => console.log('Message Deleted!'))
    .catch(error => {
      const type = error.type || 'UnexpectedError';
      console.log(`${type}: ${error.message}`);
    })
    .finally(pollMessages);
})();
