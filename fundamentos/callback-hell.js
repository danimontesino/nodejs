const employes = [
    {
        id: 1,
        name: "Daniel"
    },
    {
        id: 2,
        name: "Kevin"
    },
    {
        id: 3,
        name: "Karen"
    }
]

const salaries = [
    {
        id: 1,
        value: 1000
    },
    {
        id: 2,
        value: 1200
    },
    {
        id: 3,
        value: 1500
    }
]

const getEmploye = (id, callback) => {
    const employe = employes.find( e => e.id === id)?.name;

    if(!employe)
        callback(`Employe with id ${id} not exist`);
    else
        callback(null,employe);
}

const getSalary = (id, callback) => {
    const salary = salaries.find( s => s.id === id)?.value;

    if(!salary)
        callback(`Salary with id ${id} not exist`);
    else
        callback(null,salary);
}

const id = 3;

getEmploye(id, (err, employe) => {
    if(err){
        console.log("ERROR");
        return console.log(err);
    }

    getSalary(id, (err, salary) => {
        if(err){
            return console.log(err);
        }

        console.log(`The employe: ${employe}, have a salary of: ${salary}`);
    });
});