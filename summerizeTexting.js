
function summarizeText(input) {
    if (!input) {
      return { error: "No input provided" };
    }
    if (input.length > 10000) {
      return { error: "Input exceeds the allowed limit of 10,000 characters" };
    }
    // Assume only supports English and Spanish
    if (!/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ ]+$/.test(input)) {
      return { error: "Unsupported language" };
    }
    return { summary: "This is a summarized text (example output)" };
  }
  
  module.exports = summarizeText;
  

  