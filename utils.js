const fs = require('fs');

const message = (err, data) => {
  if (err) { console.log(`Error: ${err.message}`); }
  else if (data) { console.log(`Success: ${JSON.stringify(data, null, 2)}`); }
};

const messageJSON = (err, data) => {
  if (err) { console.log(`Error: ${err.message}`); }
  else if (data) {
    const json = JSON.stringify(data, null, 2);
    if(Object.keys(data).length > 1) {
      fs.writeFileSync(`json/${Object.keys(data)[1]}.json`, json, 'utf-8');
    }
    console.log(`Success: ${json}`);
  }
};

const readJSON = (filename) => fs.existsSync(`json/${filename}.json`) ? JSON.parse(fs.readFileSync(`json/${filename}.json`)) : undefined;

module.exports = { message, messageJSON, readJSON };
