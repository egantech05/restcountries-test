const { fetchData, BASE_URL } = require("../api/restCountries");



//function to list out all countries that has similar language as origin country
async function sameLanguage(input) {
  if (typeof input !== "string" || !input.trim()) return [];

  const url = `${BASE_URL}?fields=cca2,cca3,name,languages`;
  const countries = await fetchData(url);
  const inputCountry = input.trim().toLowerCase();

  // get origin country language
  const target = countries.find((c) => {
    const nativeNameValues = Object.values(c?.name?.nativeName || {});
    const nativeNames = nativeNameValues.flatMap((n) => [n?.common, n?.official]);

    const candidates = [
      c?.cca2,
      c?.cca3,
      c?.name?.common,
      c?.name?.official,
      ...nativeNames,
    ].filter(Boolean);

    return candidates.some((v) => String(v).toLowerCase() === inputCountry);
  });
  //return empty if no language in input country
  if (!target?.languages) return [];

  const targetLangCodes = new Set(Object.keys(target.languages));

  //list all countries that has common language code and return list of country in cca2 code
  return countries
    .filter((c) => c !== target && c?.languages)
    .filter((c) =>
      Object.keys(c.languages).some((code) => targetLangCodes.has(code))
    )
    .map((c) => c?.cca2)
    .filter(Boolean);
}

module.exports = { sameLanguage };
