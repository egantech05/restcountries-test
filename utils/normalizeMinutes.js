// normalize minute value in daily range
// timezone may cause the time to go negative or over 24 hours

function normalizeMinutes(mins) {
    return ((mins % 1440) + 1440) % 1440;
  }
  
  module.exports = { normalizeMinutes };
  