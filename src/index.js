
const readline = require("node:readline/promises");
const { stdin, stdout } = require("node:process");

const { validateCountry } = require("./validateInput/validateCountry");
const { validateTime } = require("./validateInput/validateTime");
const { sameLanguage } = require("./sameLanguage");
const { workingCountry } = require("./workingCountry");



async function main() {
    
    //create interface to get input in console
    const read = readline.createInterface({ input: stdin, output: stdout });

    try {

        //country input
        console.log(" ");
        console.log("----------------------Routing Call----------------------");
        console.log(" ");
        console.log("Enter country in cca2/cc3/common name/official name.");
        const country = (await read.question("Country: ")).trim();
        console.log(" ");
        //time input
        console.log("Enter time in HH:MM 24hrs format");
        const time = (await read.question("Time: ")).trim();
        console.log(" ");
        
        //verify if country exist
        const confirmedCountry = await validateCountry(country);
        //verify if time format is correct
        const isTimeValid = validateTime(time);

        if (!confirmedCountry) {
            console.error("Country not found");

            console.log(" ");
            console.log("-------------------------------------------------------");
            process.exitCode = 1;
            return;
        }

        if (!isTimeValid) {
            console.error("Invalid time. Use HH:MM in 24-hour format.");

            console.log(" ");
            console.log("-------------------------------------------------------");
            process.exitCode = 1;
            return;
        }
        console.log(" ");
       
        console.log(`Valid input country: ${confirmedCountry} time: ${time}`);
        // check for countries with common language
        console.log(" ");
    
        const sameLang = await sameLanguage(confirmedCountry);
        console.log("Countries with a common language:", sameLang);
        
        console.log(" ");
        // check for country that has common language and still in working hour
        // display local time for each country to confirm it is still in working hour
        const working = await workingCountry(confirmedCountry, time, sameLang);

        if (working.length === 0) {
            console.log("Call cannot be directed to any country");
          } else {
            console.log("Call can be directed to: ");
            for (const c of working) {
              console.log(`${c.cca2}: ${c.time}`);
            }
          }
        

        console.log(" ");
        console.log("-------------------------------------------------------");
    } catch (err) {
        console.error(err?.message ?? err);

        console.log(" ");
        console.log("-------------------------------------------------------");
        process.exitCode = 1;



        
    } finally {
    read.close();
    }
}

main();


