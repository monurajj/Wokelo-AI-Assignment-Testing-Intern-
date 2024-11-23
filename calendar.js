// calendar.js
function createEvent({ title, startTime, endTime }) {
    if (!title || !startTime || !endTime) {
      return { error: "Missing required fields" };
    }
  
    const start = new Date(startTime);
    const end = new Date(endTime);
  
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return { error: "Invalid date/time format" };
    }
  
    if (start >= end) {
      return { error: "End time must be later than start time" };
    }
  
    const duration = (end - start) / (1000 * 60); // duration in minutes
    if (duration < 1) {
      return { error: "Event duration must be at least 1 minute" };
    }
  
    if (duration > 60 * 24 * 7 * 4) { // assuming max event is 4 weeks
      return { error: "Event duration exceeds maximum limit" };
    }
  
    return { success: true, event: { title, startTime, endTime } };
  }
  
  module.exports = createEvent;
  