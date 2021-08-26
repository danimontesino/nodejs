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
]

const getEmploye = (id, callback) => {
    return new Promise((resolve, reject) => {
        const employe = employes.find( e => e.id === id)?.name;

        (employe)
            ? resolve(employe)
            : reject(`No exist the employe with id ${id}`)
    })
}

const getSalary = (id, callback) => {
    return new Promise((resolve, reject) => {
        const salary = salaries.find( s => s.id === id)?.value;

        (salary)
            ? resolve(salary)
            : reject(`No exist the salary with id ${id}`)
    })
}

const id = 3;

/*
getEmploye(id)
    .then(employe => console.log(employe))
    .catch( err => console.log(err));

getSalary(id)
    .then(employe => console.log(employe))
    .catch( err => console.log(err));*/

/*
getEmploye(id)
    .then(employe => {
        getSalary(id)
            .then(salary => {
                console.log(`The employe: ${employe}, have a salary of: ${salary}`)
            })
            .catch(err => console.log(err))
    })
    .catch(err => console.log(err))*/
let name;
getEmploye(id)
    .then(employe => {
        name = employe
        return getSalary(id)
    })
    .then(salary => console.log(`The employe: ${name}, have a salary of: ${salary}`))
    .catch( err => console.log(err) )