require("colors");
const {inquirerMenu, pause, readInput, inquirerCheckbox, inquirerConfirm} = require("./helpers/inquirer");
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
                tasks.print(tasks.list);
                break;
            case '3':
                // list completed tasks
                tasks.print(tasks.listCompletedOrPending());
                break;
            case '4':
                // list pending tasks
                tasks.print(tasks.listCompletedOrPending(false));
                break;
            case '5':
                // Completing
                const tasksUpdate = await inquirerCheckbox(tasks.listPending);

                if (tasksUpdate === null) break;

                tasksUpdate.map(taskId => {
                    tasks._list[taskId].completedDate = new Date(Date.now()).toLocaleDateString();
                    tasks.update(tasks._list[taskId])
                });

                break;
            case '6':
                // Delete
                const tasksRemove = await inquirerCheckbox(tasks.list);
                const confirm = await inquirerConfirm("Are you sure you want to delete?");

                if (!confirm || tasksRemove === null) break;

                tasksRemove.map(taskId => tasks.delete(taskId));
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