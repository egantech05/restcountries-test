const { fetchData, BASE_URL } = require("../../api/restCountries");

async function validateCountry(input) {
    if (typeof input !== "string" || !input.trim()) return false;

    const url = `${BASE_URL}/?fields=name,cca2,cca3`;
    const countries = await fetchData(url);
    const checkCountry = input.trim().toLowerCase();

    return countries.some((c) => {
        //getting nativeNames
        const nativeNameValues = Object.values(c?.name?.nativeName || {});
        const nativeNames = nativeNameValues.flatMap((n) => [n?.common, n?.official]);

        const names = [
            c?.cca2,
            c?.cca3,
            c?.name?.common,
            c?.name?.official,
            ...nativeNames,
        ].filter(Boolean);

        return names.some((n) => n.toLowerCase() === checkCountry);
    });
}

module.exports = { validateCountry };
