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

    createTask(desc= ''){
        const task = new Task(desc);
        this._list[task.id] = task;
    }
}

module.exports = Tasks;