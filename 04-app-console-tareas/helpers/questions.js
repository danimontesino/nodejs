const questions = [
    {
        type: "list",
        name: "option",
        message: "What do you want to do?",
        choices: [
            {
                value: '1',
                name: `${"1.".brightBlue} Create task`
            },
            {
                value: '2',
                name: `${"2.".brightBlue} List tasks`
            },
            {
                value: '3',
                name: `${"3.".brightBlue} List completed tasks`
            },
            {
                value: '4',
                name: `${"4.".brightBlue} List pending tasks`
            },
            {
                value: '5',
                name: `${"5.".brightBlue} Completing task(s)`
            },
            {
                value: '6',
                name: `${"6.".brightBlue} Delete task`
            },
            {
                value: '0',
                name: `${"7.".brightBlue} Exit`
            },
        ]
    }
]

module.exports = questions;