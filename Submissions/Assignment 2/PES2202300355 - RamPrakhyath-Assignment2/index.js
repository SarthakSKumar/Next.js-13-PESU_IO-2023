const http = require('http');
const fs = require('fs');
const path = require('path');
const multiparty = require('multiparty');

const port = 8080;
const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

function analyzeText(text) {
    const words = text.split(/\s+/).filter(word => word !== '');
    const wordCount = words.length;
    const readingTime = Math.ceil(wordCount / 200);
    const vowelCount = text.match(/[aeiouAEIOU]/g).length;
    const charCount = text.length;
    const wordFrequency = {};

    words.forEach(word => {
        wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    });

    return {
        wordCount,
        readingTime,
        vowelCount,
        charCount,
        wordFrequency,
    };
}

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        // Serve the HTML form for file upload
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html>');
        res.write('<head>');
        res.write('<title>File Upload Form</title>');
        res.write('<style>');
        res.write(`
            body {
                font-family: Arial, sans-serif;
                background-color: #f7f7f7;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
            }
            .container {
                display: flex;
                flex-direction: column;
                max-width: 800px;
                padding: 20px;
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            h1 {
                color: #333;
                text-align: center;
            }
            p {
                color: #666;
            }
            ul {
                list-style-type: none;
                padding: 0;
            }
            li {
                margin: 5px 0;
            }
            pre {
                white-space: pre-wrap;
                background-color: #f0f0f0;
                padding: 10px;
                border-radius: 5px;
            }
            input[type="file"] {
                border: none;
                padding: 10px;
                background-color: #f0f0f0;
                border-radius: 5px;
            }
            input[type="submit"] {
                background-color: #007bff;
                color: #fff;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
            }
            .file-info {
                margin-top: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
        `);
        res.write('</style>');
        res.write('</head>');
        res.write('<body>');
        res.write('<div class="container">');
        res.write('<h1>File Upload Form</h1>');
        res.write('<form method="post" action="/upload" enctype="multipart/form-data">');
        res.write('<input type="file" name="fileinput" id="fileinput">');
        res.write('<input type="submit" value="Upload File">');
        res.write('</form>');
        res.write('</div>');
        res.write('</body>');
        res.write('</html>');
        res.end();
    } else if (req.method === 'POST' && req.url === '/upload') {
        const form = new multiparty.Form({ uploadDir: uploadDir });

        form.parse(req, (err, fields, files) => {
            if (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }

            const uploadedFile = files.fileinput[0];
            if (!uploadedFile) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('No file uploaded');
                return;
            }

            const filePath = uploadedFile.path;
            const newFilePath = path.join(uploadDir, uploadedFile.originalFilename);

            fs.renameSync(filePath, newFilePath);

            // Read the uploaded file
            const text = fs.readFileSync(newFilePath, 'utf8');

            // Analyze the text
            const analysis = analyzeText(text);

            // Send the analysis results as the response
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<html>');
            res.write('<head>');
            res.write('<title>Upload Result</title>');
            res.write('<style>');
            res.write(`
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f7f7f7;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                }
                .container {
                    display: flex;
                    flex-direction: column;
                    max-width: 800px;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                h1 {
                    color: #333;
                    text-align: center;
                }
                p {
                    color: #666;
                }
                ul {
                    list-style-type: none;
                    padding: 0;
                }
                li {
                    margin: 5px 0;
                }
                pre {
                    white-space: pre-wrap;
                    background-color: #f0f0f0;
                    padding: 10px;
                    border-radius: 5px;
                }
                input[type="file"] {
                    border: none;
                    padding: 10px;
                    background-color: #f0f0f0;
                    border-radius: 5px;
                }
                input[type="submit"] {
                    background-color: #007bff;
                    color: #fff;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                }
                .file-info {
                    margin-top: 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
            `);
            res.write('</style>');
            res.write('</head>');
            res.write('<body>');
            res.write('<div class="container">');
            res.write('<h1>File Uploaded Successfully</h1>');
            res.write('<div class="file-info">');
            res.write('<div class="header">');
            res.write('<h2>File Contents:</h2>');
            res.write('<h2>File Analysis:</h2>');
            res.write('</div>');
            res.write('<div>');
            res.write('<pre>' + text + '</pre>'); // Use <pre> to preserve line breaks
            res.write('</div>');
            res.write('<div>');
            res.write('<p>Word Count: ' + analysis.wordCount + '</p>');
            res.write('<p>Reading Time: ' + analysis.readingTime + ' minutes</p>');
            res.write('<p>Vowel Count: ' + analysis.vowelCount + '</p>');
            res.write('<p>Total Characters: ' + analysis.charCount + '</p>');
            res.write('<p>Word Frequency:</p>');
            res.write('<ul>');
            for (const word in analysis.wordFrequency) {
                res.write('<li>' + word + ': ' + analysis.wordFrequency[word] + '</li>');
            }
            res.write('</ul>');
            res.write('</div>');
            res.write('</div>');
            res.write('</div>');
            res.write('</body>');
            res.write('</html>');
            res.end();
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
