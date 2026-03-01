const { fetchData, BASE_URL } = require("./source");

describe("Scenario 3: Max Request Field", () => {
    test("More than 10 fields requested should be rejected", async () => {


        const request= [
            "name",
            "cca2",
            "cca3",
            "area",
            "borders",
            "capital",
            "continents",
            "currencies",
            "flags",
            "gini",
            "languages",
        ];

        //fetch data based on fields listed
        const url = `${BASE_URL}/all?fields=${encodeURIComponent(request.join(","))}`;
        const response = await fetch(url);

        if (response.status >= 400 && response.status < 500) {
            console.log("Request rejected for more than 10 fields.");
            return;
          }

        expect(response.ok).toBe(true);
        //message if fails
        if (!response.ok) {
            throw new Error(
              `Expected error response when requesting more than 10 fields.`
            );
          }
        
        //check if request 1 up to 10 fields return ok response

        for (let n=1;n<=10;n++){
            const fields = request.slice(0,n);
            const url = `${BASE_URL}/all?fields=${encodeURIComponent(fields.join(","))}`;

            const response = await fetch(url);
            console.log(`[Fields ${n}] status: ${res.status}`);

            if (!res.ok) {
                throw new Error(
                  `FAIL for ${n} field(s).` 
                );
              }
        };

        onsole.log("PASS: All requests from 1 to 10 number of fields returned response ok");

  });
});