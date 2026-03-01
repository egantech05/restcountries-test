const { fetchData, URL_ALL } = require("./source");






//verify if country count is exactly the same amount as per ISO 3166 (249 countries)
describe("Scenario 1: Confirmation on Number of Countries", () => {
    test("Verify the total number of countries", async () => {
        //fetch data
        const url = `${URL_ALL}?fields=name`;
        const countries = await fetchData(url);    

        //Based on ISO 3166
        const expectedCount = 249;

        // count from API
        const actualCount = countries.length;
        // message when test fail
        console.log(`[Scenario 1] Country records returned: ${actualCount} (expected ${expectedCount})`);
        if (actualCount !== expectedCount) {
            throw new Error(`Test fail. Expected ${expectedCount}, Actual ${actualCount}`);
          }


  });
});
