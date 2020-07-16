const { message } = require('./utils.js');

/********
 AWS SDK 
********/


/*******/

const listQueues = () => {};

const createQueue = (name) => {};

const getQueueUrl = (name) => {};

const pollQueue = (name) => {

    (function pollMessages() {
    })();

};

const purgeQueue = (name) => {};

const deleteQueue = (name) => {};


/****
 CLI 
****/
const cli = require('./cli.js');
switch (cli.command) {
  case 'queues': listQueues(); break;
  case 'create': createQueue(cli.name); break;
  case   'poll': pollQueue(cli.name); break;
  case  'purge': purgeQueue(cli.name); break;
  case 'delete': deleteQueue(cli.name); break;
  default      : console.error('Not a valid command!'); break;
}
