const form = document.getElementById('upload-form');
const fileInput = document.getElementById('file-input');
const submitButton = document.getElementById('submit-button');
const resultsDiv = document.getElementById('results');

fileInput.addEventListener('change', () => {
    const fileName = fileInput.files[0] ? fileInput.files[0].name : 'Choose a .txt file';
    submitButton.textContent = `Upload: ${fileName}`;
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
        });
        if (response.ok) {
            const analysisResults = await response.json();
            displayAnalysisResults(analysisResults);
        } else {
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
function displayAnalysisResults(results) {
    resultsDiv.innerHTML = `
        <h2>Analysis Results</h2>
        <p>Word Count: ${results.wordCount}</p>
        <p>Reading Time: ${results.readingTime} minutes</p>
        <p>Vowel Count: ${results.vowelCount}</p>
        <p>Character Count: ${results.characterCount}</p>
        <h3>Word Frequency:</h3>
        <ul>
            ${Object.entries(results.wordFrequency)
                .map(([word, count]) => `<li>${word}: ${count}</li>`)
                .join('')}
        </ul>
    `;
}