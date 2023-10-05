document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const resultsDiv = document.getElementById('results');
    const wordCountElement = document.getElementById('wordCount');
    const totalCharactersElement = document.getElementById('tcCount');
    const readingTimeElement = document.getElementById('readingTime');
    const vowelCountElement = document.getElementById('vowelCount');
  
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
  
        const formData = new FormData(form);
  
        try {
            const response = await fetch('http://localhost:3000/analyze', {
                method: 'POST',
                body: formData,
            });
  
            if (response.ok) {
                const analysisResults = await response.json();
                displayResults(analysisResults);
            } else {
                resultsDiv.innerHTML = 'Error analyzing text.';
            }
        } catch (error) {
            console.error(error);
            resultsDiv.innerHTML = 'An error occurred.';
        }
    });
  
    function displayResults(results) {
        wordCountElement.textContent = `Word Count: ${results.wordCount}`;
        readingTimeElement.textContent = `Reading Time: ${results.readingTime} minutes`;
        totalCharactersElement.textContent = `total charecter Count: ${results.totalCharacters}`;
        vowelCountElement.textContent =`vowel count: ${results.vowelCount}`;

        resultsDiv.style.display = 'block';
    }
  });
  