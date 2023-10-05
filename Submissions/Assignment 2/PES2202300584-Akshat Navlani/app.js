const express = require('express');
const multer = require('multer');
const formidable = require('formidable');
const fs = require('fs');

const app = express();
const port = 3000;

// Set up a storage engine for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.static('public')); // Serve static files from 'public' directory
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  // Display the upload form
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/upload', upload.single('file'), (req, res) => {
  // Check if text was also provided in the form
  const uploadedText = req.body.uploadedText;

  // Process the uploaded file
  const file = req.file;
  if (!file && !uploadedText) {
    res.status(400).send('No file uploaded and no text provided.');
    return;
  }

  // Read the content of the uploaded file or the provided text
  const textToAnalyze = uploadedText || fs.readFileSync(file.path, 'utf-8');

  // Text analysis
  const wordCount = textToAnalyze.split(/\s+/).length;
  const charCount = textToAnalyze.length;
  const vowelCount = countVowels(textToAnalyze);
  const readingTime = calculateReadingTime(wordCount);
  const wordFrequencies = calculateWordFrequencies(textToAnalyze);

  // Display the result on an HTML page
  let resultHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Text Analysis Results</title>
      </head>
      <body>
        <h1>Text Analysis Results</h1>
        <p>Word Count: ${wordCount}</p>
        <p>Character Count (including spaces and special characters): ${charCount}</p>
        <p>Vowel Count (both uppercase and lowercase): ${vowelCount}</p>
        <p>Estimated Reading Time: ${readingTime} minutes</p>
        <h2>Word Frequencies</h2>
        <ul>
  `;

  for (const word in wordFrequencies) {
    resultHTML += `<li>${word}: ${wordFrequencies[word]}</li>`;
  }

  resultHTML += `
        </ul>
      </body>
    </html>
  `;

  res.send(resultHTML);
});

function countVowels(text) {
  // Count both uppercase and lowercase vowels
  const vowels = 'aeiouAEIOU';
  let count = 0;
  for (const char of text) {
    if (vowels.includes(char)) {
      count++;
    }
  }
  return count;
}

function calculateReadingTime(wordCount) {
  // Assuming an average reading speed of 200 words per minute
  return Math.ceil(wordCount / 200);
}

function calculateWordFrequencies(text) {
  const words = text.split(/\s+/);
  const wordFrequencies = {};

  for (const word of words) {
    if (word in wordFrequencies) {
      wordFrequencies[word]++;
    } else {
      wordFrequencies[word] = 1;
    }
  }

  return wordFrequencies;
}

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});