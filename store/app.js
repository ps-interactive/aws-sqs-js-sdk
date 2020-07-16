const fs = require('fs');
const path = require('path');

const randomID = () => '_' + Math.random().toString(36).substr(2, 9);

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
    QueueUrl: ''
  };
  sqs.sendMessage(params, (err, data) => {
    if (err) {
      res.render('store', { message: err.message });
    } else {
      res.render('store', { message: 'Order Complete!' });
    }
  });
});

app.listen(port, () => { console.log(`Carved Rock Order Service Running on ${port}!`) });
