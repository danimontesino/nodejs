require("colors");
const inquirer = require("inquirer");
const questions = require("./questions");

const inquirerMenu = async () => {
    console.clear();
    console.log("==============================".brightCyan);
    console.log("       Select an option".bold)
    console.log("==============================\n".brightCyan);

    const { option } = await inquirer.prompt(questions);

    return option;
}

const pause = async () => {
    await inquirer.prompt([
        {
            type: "input",
            name: "enter_to_continue",
            message: `Press the ${"Enter".green} key to continue...`,
        }
    ])
}

const readInput = async (message) => {
    const question = [
        {
            type: "input",
            name: "desc",
            message,
            validate( value ){
                if (value.length === 0){
                    return "Please enter a value"
                }

                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);
    return desc;
}


module.exports = {
    inquirerMenu,
    pause,
    readInput
}