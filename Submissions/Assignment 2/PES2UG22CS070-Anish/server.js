const express = require('express');
const multer = require('multer');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.post('/upload', upload.single('text-file'), (req, res) => {
    try {
        const { path, originalname } = req.file;
        const fileContent = fs.readFileSync(path, 'utf-8');
        const analysisResults = analyzeText(fileContent);
        res.json(analysisResults);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing the file.' });
    }
});

function analyzeText(text) {
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    const readingTime = Math.ceil(wordCount / 200);
    const vowelCount = (text.match(/[aeiou]/gi) || []).length;
    const characterCount = text.length;
    const wordFrequency = countWordFrequency(text);

    return {
        wordCount,
        readingTime,
        vowelCount,
        characterCount,
        wordFrequency,
    };
}

function countWordFrequency(text) {
    const words = text.split(/\s+/).filter(Boolean);
    const wordFrequency = {};

    words.forEach((word) => {
        const lowerCaseWord = word.toLowerCase();
        wordFrequency[lowerCaseWord] = (wordFrequency[lowerCaseWord] || 0) + 1;
    });

    return wordFrequency;
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});