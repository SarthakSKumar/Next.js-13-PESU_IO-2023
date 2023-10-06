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
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html>');
        res.write('<head>');
        res.write('<title>Text Analyzer</title>');
        res.write('<style>');
        res.write('body{background-color: beige;color: black;}');
        res.write('h1{text-decoration: underline;text-underline-offset: 10px;text-align: center;}');
        res.write('.container{width:50%;margin:3% 25%;border-radius:10px;height:auto;border:2px dashed grey;background-color: rgb(241, 241, 232);box-shadow: 0px 8px 16px 8px rgba(0,0,0,0.2);display:flex;flex-direction:column;align-items:center}');
        res.write('.container:hover{border:2px solid grey}')
        res.write('.conatiner h2{}text-align:center')
        res.write('form { display: flex; flex-direction: column; align-items: center; }');
        res.write('input[type="file"] { margin: 10px 30px; }');
        res.write('input[type="submit"] { width:20%; margin: 1% 40%; border: none; border-radius: 5px; cursor: pointer; }');
        res.write('</style>');
        res.write('</head>');
        res.write('<body>');
        res.write('<h1>Text Analyzer</h1>');
        res.write('<div class="container">');
        res.write('<h2>Upload File</h2>');
        res.write('<form method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="fileinput" id="fileinput">');
        res.write('<br>');
        res.write('<br>');
        res.write('<input type="submit" value="Analyze">');
        res.write('<br>');
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
                res.write('<title>Analyzed</title>');
                res.write('<style>');
                res.write('body{background-color: beige;color: black;}');
                res.write('.container{width:50%;margin:3% 25%;padding:3% 3%;border-radius:10px;height:auto;border:2px dashed grey;background-color: rgb(241, 241, 232);box-shadow: 0px 8px 16px 8px rgba(0,0,0,0.2);display:flex;flex-direction:column;}');
                res.write('h1 { color: #333;text-align:center; }');
                res.write('p { color: #666;}');
                res.write('ul { list-style-type: none; padding: 0; }');
                res.write('li { margin: 5px 0; }');
                res.write('</style>');
                res.write('</head>');
                res.write('<body>');
                res.write('<div class="container">');
                res.write('<h1>RESULT</h1>');
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