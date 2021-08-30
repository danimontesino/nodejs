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

const inquirerCheckbox = async (tasks = []) => {
    if(tasks.length < 1)
        return null;

    const options = [
        {
            type: "checkbox",
            name: "selectedOptions",
            message: "Select at least one",
            choices: tasks.map(task => {
                const {desc,completedDate} = task;
                let textCompleted = '';

                if (completedDate === null){
                    textCompleted = "Pending ❓".red;
                }
                else{
                    textCompleted = "Completed ✅".green;
                }
                return {value: task.id, name: `${desc} :: ${textCompleted}`};
            }),
            validate( answer ){
                if (answer.length < 1){
                    return 'You must choose at least one topping.';
                }

                return true;
            }
        }
    ];

    const {selectedOptions} = await inquirer.prompt(options);

    return selectedOptions;
}

const inquirerConfirm = async (message) => {
    const question = [
        {
            type: "confirm",
            name: "valueConfirm",
            message,
            default: true
        }
    ];

    const {valueConfirm} = await inquirer.prompt(question);

    return valueConfirm;
}


module.exports = {
    inquirerMenu,
    pause,
    readInput,
    inquirerCheckbox,
    inquirerConfirm
}