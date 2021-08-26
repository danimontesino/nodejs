console.log("Program start");

setTimeout( () => {
    console.log("First timeout");
}, 3000);

setTimeout( () => {
    console.log("Second timeout");
}, 0);

setTimeout( () => {
    console.log("Thirds timeout");
}, 0);

console.log("End of program");