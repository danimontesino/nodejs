const deadpool = {
    name: "Wade",
    lastname: "Winston",
    power: "Regeneration",
    /*age: 25,*/
    getName() {
        return `${this.name} ${this.lastname} ${this.power}`;
    }
}

console.log(deadpool.getName());

/*const name = deadpool.name;
const lastname = deadpool.lastname;
const power = deadpool.power;*/
const { name, lastname, power, age = 18 } = deadpool;

console.log(name, lastname, power, age);

function printHero({ name, lastname, power, age = 18 } ){
    /*const { name, lastname, power, age = 18 } = hero;*/
    console.log(name, lastname, power, age);
}

printHero(deadpool);

const hero = ["Deadpool","Superman","Batman"];
/*const h1 = hero[0];
const h2 = hero[1];
const h3 = hero[2];*/
const [ h1, h2, h3] = hero;
/*const [ ,, h3] = hero; // si solo me interesa el 3 elemento*/

console.log(h1, h2, h3);
