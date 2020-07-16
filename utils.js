const message = (err, data) => {
  if (err) { console.log(`Error: ${err.message}`); }
  else if (data) { console.log(`Success: ${JSON.stringify(data, null, 2)}`); }
};

const readJSON = (filename) => fs.existsSync(`json/${filename}.json`) ? JSON.parse(fs.readFileSync(`json/${filename}.json`)) : undefined;

const randomID = () => '_' + Math.random().toString(36).substr(2, 9);
