require("colors");
/**
 * _list:
 * {'uuid-12123213123-123232: {id:12, desc: asd, completedDate: 1923}'}
 */

const Task = require("./task");

class Tasks{
    constructor( ) {
        this._list = {};
    }

    get list() {
        const listResponse = [];
        Object.keys(this._list).forEach( key => listResponse.push(this._list[key]) )
        return listResponse;
    }

    get listCompleted() {
        return Object.keys(this._list).filter( key => this._list[key].completedDate !== null );
    }

    get listPending() {
        return Object.keys(this._list).filter( key => this._list[key].completedDate === null );
    }

    create(desc= ''){
        const task = new Task(desc);
        this._list[task.id] = task;
    }

    load(tasks = []){
        tasks.forEach( task => this._list[task.id] = task);
    }

    delete(id = ''){
        if (this._list[id]){
            delete this._list[id];
        }
    }

    update(task = {}) {
        if (this._list[task.id]){
            this._list[task.id] = task;
        }
    }

    /**
     * @param list of tasks
     * @return void print task list in console
     */
    print(list = []){
        // 1. Name :: Completed ✅ | Pending ❓
        console.log(); // Line break
        if (!list.length){
            // is empty
            console.log("You don't have any tasks yet".underline);
        }
        else{
            list.map((task, index) => {
                const {desc,completedDate} = task;
                let textCompleted = '';
                const textIndex = (index + 1).toString();

                if (completedDate === null){
                    textCompleted = "Pending ❓".red;
                }
                else{
                    textCompleted = "Completed ✅".green;
                }

                console.log(`${textIndex.brightBlue} ${desc} :: ${textCompleted}`);
            })
        }
        console.log(); // Line break
    }

    /**
     * @param cp boolean true = completed | false = pending
     * @return array
     */
    listCompletedOrPending(cp = true){
        if(cp){
            // Completed
            return this.list.filter(task => task.completedDate !== null);
        }
        else{
            // Pending
            return this.list.filter(task => task.completedDate === null);
        }
    }
}

module.exports = Tasks;