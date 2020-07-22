const { message } = require('./utils.js');

class EmptyQueue extends Error {
  constructor(message) {
    super(message);
    this.type = 'EmptyQueue';
  }
}

/********
 AWS SDK 
********/


/*******/

const listQueues = () => {};

const createQueue = (name) => {};

const getQueueUrl = (name) => {};

const pollQueue = (name) => {

    (async function pollMessages() {
    })();

};

const purgeQueue = async (name) => {};

const deleteQueue = async (name) => {};


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
