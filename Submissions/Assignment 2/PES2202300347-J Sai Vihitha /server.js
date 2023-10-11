const express = require('express');

const multer = require('multer');

const app = express();

const port = 3000;



// Set up Multer for file uploads

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });


app.use(express.static('public'));



app.get('/', (req, res) => {

  res.sendFile(__dirname + '/views/textanalyzer.html');

});

app.get('/analyzesummary.html', (req, res) => {
  res.send('This is the new URL.');
});



app.post('/analyze', upload.single('file'), (req, res) => {

  if (!req.file) {

    return res.status(400).send('No file uploaded.');

  }



  // Handle text analysis here

  const textContent = req.file.buffer.toString();



  const wordCount = textContent.split(' ').length;

  const readingTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute

  const vowelCount = (textContent.match(/[aeiou]/gi) || []).length;

  const charCount = textContent.length;
  


  const words = textContent.replace(/[.]/g,'').split(/\s+/);

  const wordFrequency = {};



  for (const word of words) {

    if (wordFrequency[word]) {

      wordFrequency[word]++;

    } else {

      wordFrequency[word] = 1;

    }

  }



  // Prepare analysis results as JSON

  const analysisResults = {

    wordCount,

    readingTime,

    vowelCount,

    charCount,

    wordFrequency,

  };



  //res.json(analysisResults);
  res.clearCookie('analysisResults');
  res.cookie('analysisResults',JSON.stringify(analysisResults));
  res.redirect('/analyzesummary.html');

});



app.listen(port, () => {

  console.log(`Server is running on port ${port}`);

});