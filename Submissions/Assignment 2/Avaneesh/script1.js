const http = require('http');
const fs = require('fs');

fs.mkdir("./temp",
function(err){ if(err){
console.log(err) } else {
console.log("New directory successfully created")
    }
})
const formidable = require('formidable');

const server = http.createServer((req, res) => {
if (req.method === 'POST' && req.url === '/upload') {
    const form = new formidable.IncomingForm();


    form.uploadDir = './temp';

    form.parse(req, (err, fields, files) => {
    if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
    }

    const oldPath = files.upload.path;
    const newPath = './temp/' + files.upload.name;

    fs.rename(oldPath, newPath, (err) => {
        if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error while saving the file');
        } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('File uploaded and saved successfully.');
        }
    });
    });
} else {
    
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
}
});

const port = 3000;
server.listen(port, () => {
console.log(`Server is running on port ${port}`);
});


const express = require('express');
const multer = require('multer');
const wordCount = require('word-count');
const wordFrequency = require('word-frequency');
const fs = require('fs');
const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.post('/analyze', upload.single('textFile'), (req, res) => {
    if (!req.file) {
    return res.status(400).send('No file uploaded.');
    }
    const text = req.file.buffer.toString();
    const wordCountResult = wordCount(text);
    const readingTime = Math.ceil(wordCountResult / 200);
    const vowelCount = (text.match(/[aeiouAEIOU]/g) || []).length;
    const charCount = text.length;
    const wordFreq = wordFrequency(text);
    res.json({
        wordCount: wordCountResult,
        readingTime,
        vowelCount,
        charCount,
        wordFrequency: wordFreq
    });
    });
    
    app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });
