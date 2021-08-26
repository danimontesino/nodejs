const argv = require('yargs')
    .options({
        'b': {
            alias: 'base',
            type: 'number',
            demandOption: true,
            describe: 'It is the base number of the multiplication table',
        },
        'd' : {
            alias: 'displayList',
            type: 'boolean',
            demandOption: false,
            default: false,
            describe: 'Displays the table in console',
        },
        'l' : {
            alias: 'limit',
            type: 'number',
            demandOption: false,
            default: 10,
            describe: 'Multiplier limit',
        }
    })
    .check( (argv, options) => {
        if ( isNaN(argv.b)) {
            throw "The base must be a number";
        }

        if(isNaN(argv.l) || argv.l < 1){
            throw "The limit must be a number and positive";
        }

        return true;
    })
    .argv;

module.exports = argv;