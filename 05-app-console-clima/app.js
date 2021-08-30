require('dotenv').config();
const {pause, inquirerMenu, readInput, inquirerList} = require("./helpers/inquirer");
const Search = require("./models/search");
const {save, read} = require("./helpers/bdd");

const main = async () => {
    let opt = -1;
    const search = new Search(read());


    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                // Search city
                const city = await readInput("City: ");

                const places = await search.city(city);

                const idSelectedPlace = await inquirerList(places);

                if (idSelectedPlace === 0) break;

                search.save(places.find( p => p.id === idSelectedPlace));
                await search.print(places, idSelectedPlace);

                break;
            case 2:
                // History
                if (search.history.length < 1) {
                   console.log("\n Empty history \n".bold);
                }
                else{
                    const idSelectedPlace = await inquirerList(search.history);

                    if (idSelectedPlace === 0) break;

                    await search.print(search.history, idSelectedPlace);
                }

                break;
            case 0:
                // Save History on File before Exit
                save(search.history);
                break;
        }

        if (opt !== 0) await pause();
    } while (opt !== 0);
}

main().then(() => console.log("End application."));