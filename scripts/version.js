/* eslint-disable */

const version = process.argv[2];
const path = require('path');
const fs = require('fs');
console.log(version);

const packageJSONPath = path.resolve(__dirname, '../package.json');
const packageJSON = require(packageJSONPath);

packageJSON.version = version;

fs.writeFileSync(packageJSONPath, JSON.stringify(packageJSON, null, 2));
