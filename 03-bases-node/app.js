const { createFile } = require('./helpers/multiply');
const argv = require('./config/yargs');
require('colors');

console.clear();

createFile(argv.base, argv.displayList, argv.limit)
    .then(fileName => console.log(`${fileName} successfully created`.white.bgGreen))
    .catch(err => console.log(err));
