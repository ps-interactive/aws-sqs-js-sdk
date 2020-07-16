const fs = require('fs');
const path = require('path');

const randomID = () => '_' + Math.random().toString(36).substr(2, 9);

const express = require('express');
const app = new express();
const port = 8080;

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.render('index'));

/********
 AWS SDK 
********/


/*******/

app.get('/store', (req, res) =>  res.render('store'));
app.post('/store', (req, res) => {
  const OrderID = randomID();
  const UserID = randomID();
  const ProductID = randomID();

  /**************
   Send Messages 
  **************/


  /*************/

});

app.listen(port, () => { console.log(`Carved Rock Order Service Running on ${port}!`) });
