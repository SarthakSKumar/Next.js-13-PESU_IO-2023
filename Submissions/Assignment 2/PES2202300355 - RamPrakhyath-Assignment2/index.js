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
        res.write('<title>File Upload and Analysis</title>');
        res.write('<style>');
        res.write(`
            body {
                font-family: 'Courier new', monospace;
                background-color: #000;
                color: #fff;
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
                padding: 20px;
                background-color: #333;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #fff;
                text-align: center;
                font-family: 'Courier new', monospace;
            }
            p {
                color: #ccc;
                text-align: left;
                margin: 5px 0;
                font-family: 'Courier new', monospace;
            }
            input[type="file"] {
                border: none;
                padding: 10px;
                background-color: #444;
                border-radius: 5px;
                color: #fff;
                margin-top: 10px;
            }
            input[type="submit"] {
                background-color: #000;
                color: #fff;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                margin-top: 10px;
                margin-left: 750px;
                font-weight: bold;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            }
        `);
        res.write('</style>');
        res.write('</head>');
        res.write('<body>');
        res.write('<div class="container">');
        res.write('<h1>File Upload and Analysis</h1>');
        res.write(`<p>Welcome to the Text Analysis Web Application. Upload a text file to use the following functionalities:
        <br/>
        <br/>
        1. Count the number of words in the text file (words are separated by spaces).
        <br/>
        <br/>
        2. Estimate the reading time of the text based on an average reading speed of 200 words per minute.
        <br/>
        <br/>
        3. Count the number of vowels (both uppercase and lowercase) in the text file (consider 'a', 'e', 'i', 'o', and 'u').
        <br/>
        <br/>
        4. Count the total number of characters in the text file, including spaces and special characters.
        <br/>
        <br/>
        5.Display the frequency (number of occurrences) of each unique word in the text.       
        <br/>
        <br/>
        </p>`);
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
                    background-color: #000;
                    color: #fff;
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
                    padding: 20px;
                    background-color: #333;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    width: 80%; /* Adjust the width as needed */
                }
                h1 {
                    color: #fff;
                    text-align: center;
                    font-family: 'Courier new', monospace;
                }
                p {
                    color: #ccc;
                    text-align: left;
                    margin: 5px 0;
                    font-family: 'Courier new', monospace;
                }
                pre {
                    white-space: pre-wrap;
                    background-color: #444;
                    padding: 10px;
                    border-radius: 5px;
                    color: #fff;
                    margin-top: 10px;
                }
                input[type="file"] {
                    border: none;
                    padding: 10px;
                    background-color: #444;
                    border-radius: 5px;
                    color: #fff;
                    margin-top: 10px;
                }
                input[type="submit"] {
                    background-color: #000;
                    color: #fff;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-top: 10px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                }
                .file-info {
                    margin-top: 20px;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: left;
                }
                .half {
                    flex: 0 0 48%;
                }
            `);
            res.write('</style>');
            res.write('</head>');
            res.write('<body>');
            res.write('<div class="container">');
            res.write('<h1>File Uploaded Successfully</h1>');
            res.write('<div class="file-info">');
            res.write('<div class="half">'); // Left half
            res.write('<h2>File Contents:</h2>');
            res.write(`<p>${text}</p>`);
            res.write('</div>');
            res.write('<div class="half">'); // Right half
            res.write('<h2>File Analysis:</h2>');
            res.write('<p>1. Word Count: ' + analysis.wordCount + '</p>');
            res.write('<p>2. Reading Time: ' + analysis.readingTime + ' minutes</p>');
            res.write('<p>3. Vowel Count: ' + analysis.vowelCount + '</p>');
            res.write('<p>4. Total Characters: ' + analysis.charCount + '</p>');
            res.write('<p>5. Word Frequency:</p>');
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
