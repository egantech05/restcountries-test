function validateTime(time) {
    if (typeof time !== "string") return false;
    const trimmed = time.trim();
    const format = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
    return format.test(trimmed);
  }
  
  module.exports = { validateTime };
  