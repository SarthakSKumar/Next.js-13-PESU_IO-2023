const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

// Set up middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up file upload with Multer
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

// Serve your HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle file upload and analysis
app.post('/upload', upload.single('textFile'), (req, res) => {
  // Check if a file was uploaded
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Perform text analysis here
  const text = req.file.buffer.toString(); // Convert buffer to text
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const readingTime = wordCount / 200;
  const vowelCount = (text.match(/[aeiou]/gi) || []).length;
  const charCount = text.length;

  // Calculate word frequency
  const words = text.split(/\s+/);
  const wordFrequency = {};
  words.forEach((word) => {
    wordFrequency[word] = (wordFrequency[word] || 0) + 1;
  });

  // Send analysis results as JSON
  res.json({
    wordCount,
    readingTime,
    vowelCount,
    charCount,
    wordFrequency,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

  