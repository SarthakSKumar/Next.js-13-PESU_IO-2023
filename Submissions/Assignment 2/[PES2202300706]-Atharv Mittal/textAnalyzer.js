function analyzeText(text) {
    const wordCount = text.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);
    const vowelCount = (text.match(/[aeiou]/gi) || []).length;
    const charCount = text.length;
  
    // Word frequency analysis
    const words = text.toLowerCase().match(/\b\w+\b/g);
    const wordFrequency = {};
    if (words) {
      words.forEach((word) => {
        if (wordFrequency[word]) {
          wordFrequency[word]++;
        } else {
          wordFrequency[word] = 1;
        }
      });
    }
  
    return {
      wordCount,
      readingTime,
      vowelCount,
      charCount,
      wordFrequency,
    };
  }
  
  module.exports = { analyzeText };
  