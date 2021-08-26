const fs = require('fs');
require('colors');

const createFile = async (base = 5, onList = false, limit = 10) => {
    try {
        let outputText = '';
        let outputConsole = '';

        outputConsole += outputText += `=====================\n`;
        outputConsole += `    Tabla del: ${base.toString().blue}\n`;
        outputText += `    Tabla del: ${base}\n`;
        outputConsole += `=====================\n`;
        outputText += `=====================\n`;

        for(let i = 1; i <= limit; i++){
            outputConsole += `${base.toString().blue} ${'x'.yellow} ${i} ${'='.yellow} ${(base*i).toString().red}\n`;
            outputText += `${base} x ${i} = ${base*i}\n`;
        }

        if (onList)
            console.log(outputConsole);

        fs.writeFileSync(`./output/table-${base}.txt`, outputText);
        return `table-${base}.txt`;
    }
    catch (err) {
        throw err;
    }
}

module.exports = {
    createFile
}