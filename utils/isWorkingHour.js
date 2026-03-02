// check if time within working hour 09:00-17:00

function isWorkingHour(mins) {
    const start = 9 * 60;
    const end = 17 * 60;
    return mins >= start && mins < end;
  }
  
  module.exports = { isWorkingHour };
  