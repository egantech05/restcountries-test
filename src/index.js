
//get country and time input
//validate if country exist
//validate if time is within 24hrs

const readline = require("node:readline/promises");
const { stdin, stdout } = require("node:process");
const { validateCountry } = require("./validateInput/validateCountry");
const { validateTime } = require("./validateInput/validateTime");

async function main() {
    
    //create interface to get input in console
    const read = readline.createInterface({ input: stdin, output: stdout });

    try {

        //country input
        console.log(" ");
        console.log("----------------------Call Routing----------------------");
        console.log(" ");
        console.log("Enter country in cca2/cc3/common name/official name.");
        const country = (await read.question("Country: ")).trim();
        console.log(" ");
        //time input
        console.log("Enter time in HH:MM 24hrs format");
        const time = (await read.question("Time: ")).trim();
        console.log(" ");
        
        //verify if country exist
        const isCountryValid = await validateCountry(country);
        //verify if time format is correct
        const isTimeValid = validateTime(time);

        if (!isCountryValid) {
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

        console.log("Valid input:", { country, time });

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


