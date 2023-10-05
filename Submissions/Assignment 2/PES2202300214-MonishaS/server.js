const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/upload', upload.single('textFile'), (req, res) => {
    const uploadedFile = req.file;

    if (!uploadedFile) {
        return res.status(400).send('No file uploaded.');
    }

    const text = uploadedFile.buffer.toString('utf8');

    const wordCount = text.split(/\s+/).filter(word => word !== '').length;

    const readingTime = Math.ceil(wordCount / 200);

    // Count vowels (a, e, i, o, u) in the text
    const vowelCount = (text.match(/[aeiouAEIOU]/g) || []).length;

    // Count total characters (including spaces and special characters)
    const totalCharacters = text.length;

    const words = text.split(/\s+/);

    const wordFrequency = {};

    words.forEach(word => {
        const normalizedWord = word.toLowerCase(); 
        wordFrequency[normalizedWord] = (wordFrequency[normalizedWord] || 0) + 1;
    });

    let wordFrequencyHtml = '<h3>Word Frequency:</h3>';
    for (const [word, frequency] of Object.entries(wordFrequency)) {
        wordFrequencyHtml += `<p>${word}: ${frequency}</p>`;
    }

    res.send(`
        <h3>Analysis Results:</h3>
        <p>Word Count: ${wordCount}</p>
        <p>Estimated Reading Time: ${readingTime} minutes</p>
        <p>Vowel Count: ${vowelCount}</p> <!-- Include this line for vowel count -->
        <p>Total Characters: ${totalCharacters}</p> <!-- Include this line for total characters -->
        ${wordFrequencyHtml} <!-- Include this for word frequency -->
    `);
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});