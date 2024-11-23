// calendar.test.js
const createEvent = require('./calendar');

describe('Google Calendar Event Management', () => {
  // Positive Test Cases
  test('should successfully create an event with valid inputs', () => {
    const input = {
      title: "Team Meeting",
      startTime: "2024-11-24T10:00:00",
      endTime: "2024-11-24T11:00:00",
    };
    const result = createEvent(input);
    expect(result).toHaveProperty('success', true);
    expect(result.event).toEqual(input);
  });

  test('should edit event details successfully', () => {
    const input = {
      title: "Updated Meeting",
      startTime: "2024-11-24T12:00:00",
      endTime: "2024-11-24T13:00:00",
    };
    const result = createEvent(input);
    expect(result).toHaveProperty('success', true);
    expect(result.event.title).toBe("Updated Meeting");
  });

  // Negative Test Cases
  test('should return error for missing required fields', () => {
    const input = {
      title: "Incomplete Event",
      startTime: "",
      endTime: "",
    };
    const result = createEvent(input);
    expect(result).toHaveProperty('error');
    expect(result.error).toBe("Missing required fields");
  });

  test('should return error for invalid date format', () => {
    const input = {
      title: "Invalid Dates",
      startTime: "invalid-date",
      endTime: "2024-11-24T12:00:00",
    };
    const result = createEvent(input);
    expect(result).toHaveProperty('error');
    expect(result.error).toBe("Invalid date/time format");
  });

  test('should return error for end time earlier than start time', () => {
    const input = {
      title: "Backwards Event",
      startTime: "2024-11-24T14:00:00",
      endTime: "2024-11-24T13:00:00",
    };
    const result = createEvent(input);
    expect(result).toHaveProperty('error');
    expect(result.error).toBe("End time must be later than start time");
  });

  // Boundary Test Cases
  test('should allow the shortest valid event duration (1 minute)', () => {
    const input = {
      title: "Quick Event",
      startTime: "2024-11-24T15:00:00",
      endTime: "2024-11-24T15:01:00",
    };
    const result = createEvent(input);
    expect(result).toHaveProperty('success', true);
  });

  test('should allow the longest valid event duration (4 weeks)', () => {
    const input = {
      title: "Long Event",
      startTime: "2024-11-01T00:00:00",
      endTime: "2024-11-29T00:00:00",
    };
    const result = createEvent(input);
    expect(result).toHaveProperty('success', true);
  });

  test('should return error for event duration exceeding 4 weeks', () => {
    const input = {
      title: "Too Long Event",
      startTime: "2024-11-01T00:00:00",
      endTime: "2024-12-01T00:00:00",
    };
    const result = createEvent(input);
    expect(result).toHaveProperty('error');
    expect(result.error).toBe("Event duration exceeds maximum limit");
  });
});
