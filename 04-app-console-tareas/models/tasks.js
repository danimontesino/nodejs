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

    create(desc= ''){
        const task = new Task(desc);
        this._list[task.id] = task;
    }

    load(tasks = []){
        tasks.forEach( task => this._list[task.id] = task);
    }

    printList(){
        // 1. Name :: Completed ✅ | Pending ❓

        this.list.map((task, index) => {
            const {desc,completedDate} = task;
            let textCompleted = '';
            let textId = '';

            if (completedDate === null){
                textCompleted = "Pending ❓";
                textId = `${index.toString()}.`.red;
            }
            else{
                textCompleted = "Completed ✅";
                textId = `${index.toString()}.`.green;
            }

            console.log(`${textId} ${desc} :: ${textCompleted}`);
        })
    }
}

module.exports = Tasks;