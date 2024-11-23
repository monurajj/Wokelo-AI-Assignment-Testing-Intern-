// summarizeText.test.js
const summarizeText = require('./summerizeTexting');

describe('Text Summarization Feature', () => {
  // Positive Test Cases
  test('should summarize a valid input text', () => {
    const input = "This is a valid input text for summarization.";

    const result = summarizeText(input);
     expect(result).toHaveProperty('summary');
    expect(result.summary).toBe("This is a summarized text (example output)");
  });

  test('should handle input in supported language (Spanish)', () => {
    const input = "Este es un texto válido para resumir.";
    
    const result = summarizeText(input);

    expect(result).toHaveProperty('summary');

    expect(result.summary).toBe("This is a summarized text (example output)");
  });

  // Negative Test Cases
  test('should return error when no input is provided', () => {
    const input = "";
    const result = summarizeText(input);
    expect(result).toHaveProperty('error');
    expect(result.error).toBe("No input provided");
  });

  test('should return error for unsupported languages', () => {
    const input = "这是一个中文文本"; // Example Chinese input
    const result = summarizeText(input);
    expect(result).toHaveProperty('error');
    expect(result.error).toBe("Unsupported language");
  });

  test('should return error for input exceeding character limit', () => {
    const input = "a".repeat(10001); // String with 10,001 characters
    const result = summarizeText(input);

    expect(result).toHaveProperty('error');

    expect(result.error).toBe("Input exceeds the allowed limit of 10,000 characters");
  });
});
