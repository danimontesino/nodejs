require("colors");
const inquirer = require("inquirer");

const inquirerMenu = async () => {
    console.clear();
    console.log("==============================".brightCyan);
    console.log("       Select an option".bold)
    console.log("==============================\n".brightCyan);

    const { option } = await inquirer.prompt([{
        type: "list",
        name: "option",
        message: "What do you want to do?",
        choices: [
            {
                value: 1,
                name: `${"1.".brightBlue} Search city`
            },
            {
                value: 2,
                name: `${"2.".brightBlue} History`
            },
            {
                value: 0,
                name: `${"3.".brightBlue} Exit`
            },
        ]
    }]);

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

const inquirerList = async (places = []) => {
    if(places.length < 1)
        return null;

    const options = [
        {
            type: "list",
            name: "id",
            message: "Select an option",
            choices: places.map((place, index) => {
                const {id,name} = place;
                const i = (index + 1).toString();
                const desc = `${i.brightBlue}. ${name}`

                return {value: id, name: `${desc}`};
            }),
            validate( answer ){
                if (answer.length < 1){
                    return 'You must choose at one topping.';
                }

                return true;
            }
        }
    ];

    // add option to cancel
    options[0].choices.unshift({
        value: 0,
        name: `${'0'.brightBlue}. Cancel`
    })

    const {id} = await inquirer.prompt(options);

    return id;
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
    inquirerList,
    inquirerConfirm
}