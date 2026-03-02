//convert UTC offset to offset in minutes

function parseUtcOffset(tz) {
    if (tz === "UTC") return 0;
    const match = /^UTC([+-])(\d{2}):(\d{2})$/.exec(tz);
    if (!match) return null;
    const sign = match[1] === "-" ? -1 : 1;
    return sign * (Number(match[2]) * 60 + Number(match[3]));
  }
  
  module.exports = { parseUtcOffset };