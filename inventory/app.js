const fs = require('fs');
const path = require('path');

const express = require('express');
const app = new express();
const port = 8081;

app.set('views',path.join(__dirname, '/views'));
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.render('index'));

app.listen(port, () => { console.log(`Carved Rock Inventory Service Running on ${port}!`) });


/*
const AWS = require('aws-sdk');
AWS.config.region = 'us-west-2'

const QueueUrl = 'https://sqs.us-west-2.amazonaws.com/159180450383/orders';
const sqs = new AWS.SQS({ params: { QueueUrl: QueueUrl } });


class EmptyQueue extends Error {
  constructor(message) {
    super(message);
    this.type = 'EmptyQueue';
  }
}

(function pollMessages() {
  sqs.receiveMessage({ WaitTimeSeconds: 10, VisibilityTimeout: 10 }).promise()
    .then(data => {
      if (!data.Messages) {
        throw new EmptyQueue('There are no messages in the queue.');
      }
      // TODO: process the message
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

*/
