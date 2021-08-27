const fs = require("fs");

const file = "./db/data.json";

const save = (data) => {
    fs.writeFileSync(file, JSON.stringify( data ));
}

const read = () => {
    if(!fs.existsSync(file))
        return [];

    return JSON.parse(fs.readFileSync(file, {encoding: 'utf-8'}));
}

module.exports = {
    save,
    read
}