const { message, messageJSON, readJSON } = require('../utils.js');

const AWS = require('aws-sdk');
AWS.config.region = 'us-west-2';
AWS.config.apiVersion = '2012-11-05';

const sqs = new AWS.SQS();

const listQueues = () => {
  sqs.listQueues(message);
};

const createQueue = (name) => {
  const params = {
    QueueName: name,
    Attributes: { 'ReceiveMessageWaitTimeSeconds': '10' }
  };
  sqs.createQueue(params, messageJSON);
};

const pollQueue = (name) => {
  (function pollMessages() {
    sqs.receiveMessage({ QueueUrl: QueueUrl, WaitTimeSeconds: 10, VisibilityTimeout: 10 }).promise()
      .then(data => {
        if (!data.Messages) {
          throw new EmptyQueue('There are no messages in the queue.');
        }
        console.log(`Processing Message ${data.Messages[0].MessageId}: ${data.Messages[0].Body}`);
        console.log(`Deleting: ${data.Messages[0].MessageId}`);
        return sqs.deleteMessage({ ReceiptHandle: data.Messages[0].ReceiptHandle }).promise();
      })
      .then(data => console.log('Message Deleted!'))
      .catch(error => {
        const type = error.type || 'UnexpectedError';
        console.log(`${type}: ${error.message}`);
      })
      .finally(pollMessages);
  })();
};

const purgeQueue = () => {
  sqs.purgeQueue({ QueueUrl: 'STRING_VALUE' }, message);
};

const deleteQueue = () => {
  sqs.deleteQueue({ QueueUrl: 'STRING_VALUE' }, message);
};


/****
 CLI 
****/
const cli = require('./cli.js');
switch (cli.command) {
  case 'queues': listQueues(); break;
  case 'create': createQueue(cli.resourceName); break;
  case   'poll': pollQueue(cli.resourceName); break;
  case  'purge': purgeQueue(cli.resourceName); break;
  case 'delete': deleteQueue(cli.resourceName); break;
  default      : console.error('Not a valid command!'); break;
}
