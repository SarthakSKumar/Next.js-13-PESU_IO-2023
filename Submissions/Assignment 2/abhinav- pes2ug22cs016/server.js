const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define the route for handling file upload and analysis
app.post('/upload', upload.single('textFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const text = req.file.buffer.toString(); // Convert buffer to text

    // Perform text analysis here and prepare the results
    const wordCount = text.split(/\s+/).filter(word => word !== '').length;
    const readingTime = (wordCount / 200).toFixed(2);
    const vowelCount = text.match(/[aeiou]/gi).length;
    const charCount = text.length;

    // Calculate word frequency
    const words = text.split(/\s+/).filter(word => word !== '');
    const wordFrequency = {};
    for (const word of words) {
        wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    }

    // Prepare results
    const results = {
        wordCount,
        readingTime,
        vowelCount,
        charCount,
        wordFrequency,
    };

    // Send the results to the webpage
    res.send(JSON.stringify(results));
});

// Serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
