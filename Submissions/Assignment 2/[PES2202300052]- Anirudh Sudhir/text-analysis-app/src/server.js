// Using the http and other useful modules
const http = require('http');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { analyzeText } = require('./analyzer');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/') {
      // Serve the HTML page
      fs.readFile(path.join(__dirname, '../public/index.html'), 'utf-8', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data);
        }
      });
    } else if (req.url === '/styles.css') {
      // Serve the CSS file
      fs.readFile(path.join(__dirname, '../public/styles.css'), 'utf-8', (err, data) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('File Not Found');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/css' });
          res.end(data);
        }
      });
    } else if (req.url === '/script.js') {
      // Serve the JavaScript file
      fs.readFile(path.join(__dirname, '../public/script.js'), 'utf-8', (err, data) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('File Not Found');
        } else {
          res.writeHead(200, { 'Content-Type': 'application/javascript' });
          res.end(data);
        }
      });
    } else if (req.url.startsWith('/public/')) {
      // Serve other static files manually
      const filePath = path.join(__dirname, '../', req.url);
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('File Not Found');
        } else {
          // Determine the content type based on file extension
          const ext = path.extname(filePath);
          let contentType = 'text/plain';
          if (ext === '.css') {
            contentType = 'text/css';
          } else if (ext === '.js') {
            contentType = 'application/javascript';
          }
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(data);
        }
      });
    } else {
      // Handle 404 Not Found error for other paths
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  } else if (req.method === 'POST' && req.url === '/upload') {
    // Handle file upload and text analysis
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'uploads/');
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
    });
    
    const upload = multer({ storage });

    upload.single('fileInput')(req, res, (err) => {
      if (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'File upload failed.' }));
        return;
      }

      if (!req.file) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'No file uploaded.' }));
        return;
      }

      const fileContents = fs.readFileSync(req.file.path, 'utf-8');

      // Perform text analysis
      const analysisResults = analyzeText(fileContents);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(analysisResults));
    });
  } else {
    // Handle other HTTP methods
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
