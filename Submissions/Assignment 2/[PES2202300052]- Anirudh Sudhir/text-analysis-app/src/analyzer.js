// Analyze the uploaded text
function analyzeText(text) {
  try {
    // Split words based on whitespace using regular expressions
    const words = text.split(/\s+/);
    const wordCount = words.length;
    const readingTime = (wordCount / 200).toFixed(2);
    const vowelCount = countVowels(text);
    const characterCount = text.length;
    const wordFrequency = getWordFrequency(words);

    return {
      wordCount,
      readingTime,
      vowelCount,
      characterCount,
      wordFrequency,
    };
  } catch (error) {
    console.error('Error in text analysis:', error);
    throw new Error('An error occurred during text analysis.');
  }
}

// Counting vowels in a case-insensitive manner
function countVowels(text) {
  // Counting vowels using regular expressions
  return (text.match(/[aeiou]/gi) || []).length;
}

// Calculate word frequency
function getWordFrequency(words) {
  const wordFrequency = {};
  for (const word of words) {
    const normalizedWord = word.toLowerCase();
    // Counting occurrences of a specific word and starting from 0 for first occurrence
    wordFrequency[normalizedWord] = (wordFrequency[normalizedWord] || 0) + 1;
  }
  // Creating an object that stores words and their frequencies by creating a key-value pair and mapping it
  return Object.entries(wordFrequency).map(([word, count]) => ({ word, count }));
}

// Exporting the analyzeText function
module.exports = {
  analyzeText,
};
