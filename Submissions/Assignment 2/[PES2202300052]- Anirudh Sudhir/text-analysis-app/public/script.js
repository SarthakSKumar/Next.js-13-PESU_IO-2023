// Event listener for the "Submit" button click
document.getElementById('submitButton').addEventListener('click', () => {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];

  if (file) {
    const formData = new FormData();
    formData.append('fileInput', file);

    // Send a POST request to the server for analysis
    fetch('/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error in the network response!');
        }
        return response.json();
      })
      .then((data) => {
        displayResults(data);
      })
      .catch((error) => {
        console.error('Error:', error);
        displayError('An error occurred during analysis.');
      });
  }
});

// Display analysis results in the website
function displayResults(results) {
  const resultsDiv = document.getElementById('results');
  // Using map() and join() to display each word and its count in a new list element
  resultsDiv.innerHTML = `
    <p><strong>Word Count:</strong> ${results.wordCount}</p>
    <p><strong>Reading Time:</strong> ${results.readingTime} minutes</p>
    <p><strong>Vowel Count:</strong> ${results.vowelCount}</p>
    <p><strong>Character Count:</strong> ${results.characterCount}</p>
    <h2>Word Frequency:</h2>
    <ul>
      ${results.wordFrequency.map((word) => `<li>${word.word}: ${word.count}</li>`).join('')}
    </ul>
  `;
}

// Display error messages in the website
function displayError(message) {
  const resultsDiv = document.getElementById('results');
  // Appending error message
  resultsDiv.innerHTML = `<p class="error">${message}</p>`;
}
