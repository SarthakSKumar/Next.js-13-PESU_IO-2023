
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.render('index', { text: '', analysis: null });
});


app.post('/analyze', (req, res) => {
  const text = req.body.text;

  const words = text.split(/\s+/).filter(word => word !== '');
  const wordCount = words.length;
  const readingTime = Math.ceil(wordCount / 200); 


  const vowelCount = (text.match(/[aeiouAEIOU]/g) || []).length;

  const characterCount = text.length;


  const wordFrequencies = {};
  words.forEach(word => {
    const lowercaseWord = word.toLowerCase();
    wordFrequencies[lowercaseWord] = (wordFrequencies[lowercaseWord] || 0) + 1;
  });

  const analysis = {
    wordCount,
    readingTime,
    vowelCount,
    characterCount,
    wordFrequencies,
  };

  res.render('index', { text, analysis });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

