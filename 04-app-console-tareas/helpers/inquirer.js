require("colors");
const inquirer = require("inquirer");
const questions = require("./questions");

const inquirerMenu = async () => {
    console.clear();
    console.log("==============================".blue);
    console.log("       Select an option".cyan)
    console.log("==============================\n".blue);

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


module.exports = {
    inquirerMenu,
    pause
}