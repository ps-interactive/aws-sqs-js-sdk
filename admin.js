const { message } = require('./utils.js');

/********
 AWS SDK 
********/


/*******/

const listQueues = () => {};

const createQueue = (name) => {};

const pollQueue = (name) => {
  (function pollMessages() {

    /*****************
     Receive Messages 
    *****************/


    /****************/

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
  case 'create': createQueue(cli.resourceName); break;
  case   'poll': pollQueue(cli.resourceName); break;
  case  'purge': purgeQueue(cli.resourceName); break;
  case 'delete': deleteQueue(cli.resourceName); break;
  default      : console.error('Not a valid command!'); break;
}
