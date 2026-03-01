//link to the API

const BASE = "https://restcountries.com/v3.1";
const URL_ALL = `${BASE}/all?fields=name`;



//helper to fetch data
async function fetchData(url) {
    const response = await fetch(url);
    
    //fallback if response not OK
    if (!response.ok) {
        //return empty string if response not OK with error message
      const body = await response.text().catch(() => "");
 
      throw new Error(
        `Request failed: ${response.status} ${response.statusText}\n` 

      );
    }
    return response.json();
  }

  module.exports = { fetchData, URL_ALL };
