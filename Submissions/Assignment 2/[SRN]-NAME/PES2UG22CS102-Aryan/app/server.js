const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.post('/upload', upload.single('textFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const filePath = req.file.path;
  const text = fs.readFileSync(filePath, 'utf-8');

  function analyzeText(text) {
    const words = text.split(/\s+/);
    const wordCount = words.length;
    const readingTime = Math.ceil(wordCount / 200);
    const vowelCount = (text.match(/[aeiouAEIOU]/g) || []).length;
    const characterCount = text.length;

    const wordFrequency = {};
    words.forEach((word) => {
      if (!wordFrequency[word]) {
        wordFrequency[word] = 0;
      }
      wordFrequency[word]++;
    });

    return {
      wordCount,
      readingTime,
      vowelCount,
      characterCount,
      wordFrequency,
    };
  }

  const analysisResults = analyzeText(text);
  res.send(analysisResults);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

