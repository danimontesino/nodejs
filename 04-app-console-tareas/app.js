require("colors");
const {inquirerMenu, pause, readInput} = require("./helpers/inquirer");
const Tasks = require("./models/tasks");
const {save, read} = require("./helpers/bdd");

const main = async () => {
    let opt = '';
    const tasks = new Tasks();
    tasks.load(read()); // load task from file

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                // create
                const desc = await readInput("Description:");
                tasks.create(desc);
                break;
            case '2':
                // list all
                tasks.printList();
                break;
            case '3':
                // list completed tasks
                break;
            case '4':
                // list pending tasks
                break;
            case '5':
                // Completing
                break;
            case '6':
                // Delete
                break;
            case '0':
                // Save tasks on File before Exit
                save(tasks.list);
                break;
        }

        if (opt !== '0')
            await pause();

    } while (opt !== '0');
}

main().then(() => console.log("End of program!"));