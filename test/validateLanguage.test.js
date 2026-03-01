const { fetchData, BASE_URL } = require("../api/restCountries");

//validate if SASL is the officially recognized as one of South Africa's official language

describe("Scenario 2: Validate SASL", () => {
    test("Verify SASL is listed as South Africa Language", async () => {
        //fetch data
        const url = `${BASE_URL}?fields=cca3,languages`;
        const countries = await fetchData(url);    

        //fetch South Africa language
        const sa = countries.find(c => c.cca3 === "ZAF");
        const saLang = sa.languages;


        //expected results
        const expectedResults = "sasl";


        if (Object.prototype.hasOwnProperty.call(saLang, expectedResults)) {

            // message when test pass
            console.log(`SASL is part of South Africa languages.`);
        }
        else {
            // message when test fail
            throw new Error(`SASL not found in South Africa languages`);
        }

  });
});