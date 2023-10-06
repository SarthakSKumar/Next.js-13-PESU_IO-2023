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
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        // Serve the HTML form for file upload
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html>');
        res.write('<head>');
        res.write('<title>File Upload Form</title>');
        res.write('<style>');
        res.write('body { font-family: Arial, sans-serif; background-color: #f0f0f0; }');
        res.write('h1 { color: #333; text-align: center; }');
        res.write('.container { max-width: 400px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }');
        res.write('form { display: flex; flex-direction: column; align-items: center; }');
        res.write('input[type="file"] { margin: 10px 0; }');
        res.write('input[type="submit"] { padding: 10px 20px; background-color: #333; color: #fff; border: none; border-radius: 5px; cursor: pointer; }');
        res.write('</style>');
        res.write('</head>');
        res.write('<body>');
        res.write('<div class="container">');
        res.write('<h1>File Upload Form</h1>');
        res.write('<form method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="fileinput" id="fileinput">');
        res.write('<input type="submit" value="Upload File">');
        res.write('</form>');
        res.write('</div>');
        res.write('</body>');
        res.write('</html>');
        res.end();
    } else if (req.method === 'POST') {
        upload.single('fileinput')(req, res, function (err) {
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
                //1. Count words (split by spaces)
                const words = data.split(/\s+/).filter(word => word !== '');
                const wordCount = words.length;
                //2. Calculate reading time (200 words per minute)
                const readingTime = Math.ceil(wordCount / 200);
                //3. Count vowels (a, e, i, o, u)
                const vowelCount = data.match(/[aeiouAEIOU]/g).length;
                //4. Count total characters
                const charCount = data.length;
                //5. Count word frequency
                const wordFrequency = {};
                words.forEach(word => {
                    wordFrequency[word] = (wordFrequency[word] || 0) + 1;
                });
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write('<html>');
                res.write('<head>');
                res.write('<title>Upload Result</title>');
                res.write('<style>');
                res.write('body { font-family: Arial, sans-serif; background-color: #f0f0f0; }');
                res.write('.container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }');
                res.write('h1 { color: #333; }');
                res.write('p { color: #666; }');
                res.write('ul { list-style-type: none; padding: 0; }');
                res.write('li { margin: 5px 0; }');
                res.write('</style>');
                res.write('</head>');
                res.write('<body>');
                res.write('<div class="container">');
                res.write('<h1>File Uploaded Successfully</h1>');
                res.write('<p>File Contents:</p>');
                res.write(`<pre>${data}</pre>`);
                res.write('<p>Word Count: ' + wordCount + '</p>');
                res.write('<p>Reading Time: ' + readingTime + ' minutes</p>');
                res.write('<p>Vowel Count: ' + vowelCount + '</p>');
                res.write('<p>Total Characters: ' + charCount + '</p>');
                res.write('<p>Word Frequency:</p>');
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
