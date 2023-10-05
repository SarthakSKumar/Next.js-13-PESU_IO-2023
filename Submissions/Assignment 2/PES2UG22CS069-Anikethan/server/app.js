const http = require('http');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    // Serve the HTML form for uploading text files
    fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (req.method === 'POST' && req.url === '/analyze') {
    // Create a multer storage configuration
    const storage = multer.memoryStorage();
    const upload = multer({ storage });

    // Use the multer middleware for the 'textFile' field
    upload.single('textFile')(req, res, (err) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }

      // Access the uploaded file data
      const uploadedFile = req.file;

      if (!uploadedFile) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('No file was uploaded. Please choose a text file to upload.');
        return;
      }

      if (uploadedFile.mimetype !== 'text/plain') {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid file format. Please upload a text file.');
        return;
      }

      // Access the file buffer for text analysis
      const fileBuffer = uploadedFile.buffer;

      // Perform text analysis (you can add more analysis logic here)
      const fileContent = fileBuffer.toString('utf-8');
      const wordCount = fileContent.split(' ').length;
      const totalCharacters = fileContent.length;
      const readingTime = Math.ceil(wordCount / 80); // Assuming 200 words per minute reading speed
      const vowelCount = (fileContent.match(/[aeiou]/gi) || []).length;

      // Prepare the analysis results
      const analysisResults = {
        wordCount,
        readingTime,
        vowelCount,
        totalCharacters,
      };

      // Send the analysis results as JSON
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(analysisResults));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});