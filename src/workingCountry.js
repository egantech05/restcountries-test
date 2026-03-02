

const { fetchData, BASE_URL } = require("../api/restCountries");

const { parseUtcOffset } = require("../utils/parseUtcOffset");
const { normalizeMinutes } = require("../utils/normalizeMinutes");
const { isWorkingHour } = require("../utils/isWorkingHour");
const { formatMinutes } = require("../utils/formatMinutes");

//function to check which country with the same language are in working hour during given origin time (inputTime)
//inputCountry in cca2 code
//sameLanguageList is array of country in cca2 code
//inputTime in HH:MM format

async function workingCountry(inputCountry, inputTime, sameLanguageList) {
  const url = `${BASE_URL}?fields=cca2,timezones`;
  const countries = await fetchData(url);

  // get origin timezone
  const origin = countries.find((c) => c?.cca2 === inputCountry);
  const originTz = origin.timezones[0];
  const originOffset = parseUtcOffset(originTz);

  const [hh, mm] = inputTime.split(":").map(Number);
  //convert origin time to minutes
  const inputLocalMinutes = hh * 60 + mm;

  // get origin offset time in minutes
  const utcMinutes = normalizeMinutes(inputLocalMinutes - originOffset);

  const potential = new Set(sameLanguageList);
  const results = [];

  for (const c of countries) {
    // continue if country is not in the same language list
    if (!potential.has(c.cca2)) continue;

    // get timezone of each country in sameLanguage
    const tz = c.timezones[0];
    const offset = parseUtcOffset(tz);

    const localMinutes = normalizeMinutes(utcMinutes + offset);
    //save to results if each local time is in working hour
    if (isWorkingHour(localMinutes)) {
      results.push({
        cca2: c.cca2,
        //convert to HH:MM format
        time: formatMinutes(localMinutes),
      });
    }
  }

  return results;
}

module.exports = { workingCountry };