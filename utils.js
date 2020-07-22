const fs = require('fs');

class EmptyQueue extends Error {
  constructor(mess) {
    super(mess);
    this.type = 'EmptyQueue';
  }
}

const message = (err, data) => {
  if (err) { console.log(`Error: ${err.message}`); }
  else if (data) { console.log(`Success: ${JSON.stringify(data, null, 2)}`); }
};

module.exports = { message, EmptyQueue };
