const http = require('http');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const uploadDir = path.join(__dirname, 'uploads');
const port = 8080;

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: uploadDir,
    filename: function (req, file, cb) {
        cb(null, 'uploaded-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html>');
        res.write('<head>');
        res.write('<title>File Upload Form</title>');
        res.write('</head>');
        res.write('<body style="font-family: Arial, sans-serif; background-color: black; color: white;">');
        res.write('<div class="container" style="max-width: 400px; margin: 50px auto; padding: 20px; background-color: #333; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.4); text-align: center;">');
        res.write('<h1 style="color: #0077b6;">File Upload Form</h1>');
        res.write('<form method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="fileInput" id="fileInput" style="margin: 20px 0; padding: 10px; background-color: #555; border: none; border-radius: 5px; color: white; cursor: pointer;">');
        res.write('<input type="submit" value="Upload File" style="padding: 10px 20px; background-color: #000080; color: white; border: none; border-radius: 5px; cursor: pointer;">');
        res.write('</form>');
        res.write('</div>');
        res.write('</body>');
        res.write('</html>');
        res.end();
    } else if (req.method === 'POST') {
        upload.single('fileInput')(req, res, function (err) {
            if (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }
            if (!req.file) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('No file uploaded');
                return;
            }
            fs.readFile(req.file.path, 'utf8', function (err, data) {
                if (err) {
                    console.error(err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                    return;
                }
                const words = data.split(/\s+/).filter(word => word !== '');
                const wordCount = words.length;
                const readingTime = Math.ceil(wordCount / 200);
                const vowelCount = data.match(/[aeiouAEIOU]/g).length;
                const charCount = data.length;
                const wordFrequency = {};
                words.forEach(word => {
                    wordFrequency[word] = (wordFrequency[word] || 0) + 1;
                });
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write('<html>');
                res.write('<head>');
                res.write('<title>Upload Result</title>');
                res.write('</head>');
                res.write('<body style="font-family: Arial, sans-serif; background-color: black; color: white;">');
                res.write('<div class="container" style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #333; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);">');
                res.write('<h1 style="color: #0077b6;">File Uploaded Successfully</h1>');
                res.write('<p style="color: white;">File Contents:</p>');
                res.write(`<pre>${data}</pre>`);
                res.write('<p style="color: white;">Word Count: ' + wordCount + '</p>');
                res.write('<p style="color: white;">Reading Time: ' + readingTime + ' minutes</p>');
                res.write('<p style="color: white;">Vowel Count: ' + vowelCount + '</p>');
                res.write('<p style="color: white;">Total Characters: ' + charCount + '</p>');
                res.write('<p style="color: white;">Word Frequency:</p>');
                res.write('<ul>');
                for (const word in wordFrequency) {
                    res.write('<li>' + word + ': ' + wordFrequency[word] + '</li>');
                }
                res.write('</ul>');
                res.write('</div>');
                res.write('</body>');
                res.write('</html>');
                res.end();
                fs.unlinkSync(req.file.path);
            });
        });
    }
});

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

