const fs = require('fs');
const path = require('path');

const AWS = require('aws-sdk');
AWS.config.region = 'us-west-2';
AWS.config.apiVersion = '2012-11-05';

const sqs = new AWS.SQS();

const express = require('express');
const app = new express();
const port = 8081;

app.set('views',path.join(__dirname, '/views'));
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  sqs.listQueues((err, data) => {
    if (err) {
      res.render('index', { message: err.message, queues: [] });
    } else {
      res.render('index', { message: err.message, queues: data.QueueUrls });
    }
  });
});

app.get('/create', (req, res) => {
  const params = {
    QueueName: 'orders',
    Attributes: { 'ReceiveMessageWaitTimeSeconds': '10' }
  };
  sqs.createQueue(params, (err, data) => {
    if (err) {
      res.render('index', { message: err.message, queues: [] });
    } else if (data) { 
      res.render('index', { message: '', queues: [ data.QueueUrl ] });
    }
  });
});


app.get('/review', (req, res) => {
  const params = {
    QueueUrl: '', // get from link
    WaitTimeSeconds: 10,
    VisibilityTimeout: 10
  };
  sqs.receiveMessage(params, (err, data) => {
    if (err) {
      res.render('index', { message: err.message, messages: [] });
    } else if (data) {
      res.render('index', { message: '', messages: data.Messages });
    }
  });
});

app.get('/delete', (req, res) => {
  const params = {
    ReceiptHandle: '' // get from link
  };
  sqs.deleteMessage(params, (err, data) => {});
});

app.listen(port, () => { console.log(`Carved Rock Inventory Service Running on ${port}!`) });
