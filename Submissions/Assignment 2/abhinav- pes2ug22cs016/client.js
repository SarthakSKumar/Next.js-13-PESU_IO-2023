document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const resultDiv = document.getElementById('resultDiv'); // Change to the ID of your div

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                displayResults(data);
            } else {
                console.error('Error analyzing text.');
            }
        } catch (error) {
            console.error('Error analyzing text:', error);
        }
    });

    function displayResults(data) {
        // Create HTML elements to display the results
        const resultsHTML = `
            <h2>Analysis Results</h2>
            <p>Word Count: ${data.wordCount}</p>
            <p>Reading Time (minutes): ${data.readingTime}</p>
            <p>Vowel Count: ${data.vowelCount}</p>
            <p>Character Count: ${data.charCount}</p>
            <h3>Word Frequency:</h3>
            <ul>
                ${Object.entries(data.wordFrequency).map(([word, count]) => `<li>${word}: ${count}</li>`).join('')}
            </ul>
        `;

        // Set the results in the specified div
        resultDiv.innerHTML = resultsHTML;
    }
});
