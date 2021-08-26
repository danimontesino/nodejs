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

const getInfoUser = async (id) => {
    try{
        const employe = await getEmploye(id)
        const salary = await getSalary(id)
        return `The employe: ${employe}, have a salary of: ${salary}`
    }
    catch (err){
        throw err
    }
}

const id = 3;

getInfoUser(id)
    .then(msg => console.log(msg))
    .catch(err => console.log(err))