const fs = require('fs');
const path = require('path');
const { message, randomID } = require('../utils.js')

const express = require('express');
const app = new express();
const port = 8080;

const AWS = require('aws-sdk');
AWS.config.region = 'us-west-2';
AWS.config.apiVersion = '2012-11-05';

const sqs = new AWS.SQS();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.render('index'));

app.get('/store', (req, res) =>  res.render('store'));
app.post('/store', (req, res) => {

  const OrderID = randomID();
  const UserID = randomID();
  const ProductID = randomID();

  const params = {
    MessageAttributes: {
      "OrderID": { DataType: "String", StringValue: OrderID },
      "UserID": { DataType: "String", StringValue: UserID },
      "ProductID": { DataType: "String", StringValue: ProductID }
    },
    MessageBody: `New Order: ${OrderID}\nUserID: ${UserID}\nProductID: ${ProductID}\n`,
    QueueUrl: "SQS_QUEUE_URL"
  };
  sqs.sendMessage(params, message);
  res.render('store', { message: 'Order Complete!' });
});

app.listen(port, () => { console.log(`Carved Rock Order Service Running on ${port}!`) });

/*

sqs.listQueues({}, );


const params = {
  QueueName: 'SQS_QUEUE_NAME',
  Attributes: {
    'DelaySeconds': '60',
    'MessageRetentionPeriod': '86400'
  }
};
sqs.createQueue(params, message);


sqs.getQueueUrl({ QueueName: 'SQS_QUEUE_NAME' }, message);


sqs.deleteQueue({ QueueUrl: 'SQS_QUEUE_URL' }, message);


const params = {
   // Remove DelaySeconds parameter and value for FIFO queues
  DelaySeconds: 10,
  MessageAttributes: {
    "Title": { DataType: "String", StringValue: "The Whistler" },
    "Author": { DataType: "String", StringValue: "John Grisham" },
    "WeeksOn": { DataType: "Number", StringValue: "6" }
  },
  MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
  // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
  // MessageGroupId: "Group1",  // Required for FIFO queues
  QueueUrl: "SQS_QUEUE_URL"
};
sqs.sendMessage(params, message);


const queueURL = "SQS_QUEUE_URL";
const params = {
  AttributeNames: [ "SentTimestamp" ],
  MaxNumberOfMessages: 10,
  MessageAttributeNames: [ "All" ],
  QueueUrl: queueURL,
  VisibilityTimeout: 20,
  WaitTimeSeconds: 0
};
sqs.receiveMessage(params, (err, data) => {
  if (err) {
    console.log("Receive Error", err);
  } else if (data.Messages) {
    const deleteParams = {
      QueueUrl: queueURL,
      ReceiptHandle: data.Messages[0].ReceiptHandle
    };
    sqs.deleteMessage(deleteParams, (err, data) => {
      if (err) { console.log("Delete Error", err); } 
      else { console.log("Message Deleted", data); }
    });
  }
});


const queueURL = 'https://sqs.REGION.amazonaws.com/ACCOUNT-ID/QUEUE-NAME'
const params = {
  AttributeNames: ['SentTimestamp'],
  MaxNumberOfMessages: 1,
  MessageAttributeNames: ['All'],
  QueueUrl: queueURL
}
sqs.receiveMessage(params, (err, data) => {
  if (err) { console.log('Receive Error', err); }
  else {
    // Make sure we have a message
    if (data.Messages != null) {
      const visibilityParams = {
        QueueUrl: queueURL,
        ReceiptHandle: data.Messages[0].ReceiptHandle,
        VisibilityTimeout: 20 // 20 second timeout
      }
      sqs.changeMessageVisibility(visibilityParams, (err, data) => {
        if (err) { console.log('Delete Error', err); }
        else { console.log('Timeout Changed', data); }
      })
    } else { console.log('No messages to change'); }
  }
})


const params = {
  QueueName: 'SQS_QUEUE_NAME',
  Attributes: { 'ReceiveMessageWaitTimeSeconds': '20' }
};
sqs.createQueue(params, message);

const params = {
  Attributes: { "ReceiveMessageWaitTimeSeconds": "20" },
  QueueUrl: "SQS_QUEUE_URL"
};
sqs.setQueueAttributes(params, message);

const queueURL = "SQS_QUEUE_URL";
const params = {
  AttributeNames: [ "SentTimestamp" ],
  MaxNumberOfMessages: 1,
  MessageAttributeNames: [ "All" ],
  QueueUrl: queueURL,
  WaitTimeSeconds: 20
};
sqs.receiveMessage(params, message);


const params = {
 Attributes: { "RedrivePolicy": "{\"deadLetterTargetArn\":\"DEAD_LETTER_QUEUE_ARN\",\"maxReceiveCount\":\"10\"}" },
 QueueUrl: "SOURCE_QUEUE_URL"
};
sqs.setQueueAttributes(params, message);
*/