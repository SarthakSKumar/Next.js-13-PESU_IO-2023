const http = require("http");
const fs = require("fs");
const path = require("path");
const formidable = require("formidable");

const server = http.createServer((req, res) => {
    if (req.url === "/" && req.method === "GET") {
        // Serve the HTML file
        fs.readFile("./public/index.html", "utf8", (err, data) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Internal Server Error");
                return;
            }

            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        });
    } else if (req.url === "/upload" && req.method === "POST") {
        const form = new formidable.IncomingForm();
        form.uploadDir = path.join(__dirname, "uploads");

        form.parse(req, (err, fields, files) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Internal Server Error");
                return;
            }

            const filePath = files.file.path;
            // Read and analyze the text file
            fs.readFile(filePath, "utf8", (err, data) => {
                if (err) {
                    res.writeHead(500, { "Content-Type": "text/plain" });
                    res.end("Internal Server Error");
                    return;
                }

                // Perform text analysis here and prepare the analysis results
                const analysisResults = {
                    wordCount: data.split(/\s+/).length,
                    readingTime: Math.ceil(data.split(/\s+/).length / 200),
                    vowelCount: (data.match(/[aeiou]/gi) || []).length,
                    charCount: data.length,
                    wordFrequency: getWordFrequency(data),
                };

                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(analysisResults));
            });
        });
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Helper function to calculate word frequency
function getWordFrequency(text) {
    const words = text.split(/\s+/);
    const wordFrequency = {};

    words.forEach((word) => {
        if (wordFrequency[word]) {
            wordFrequency[word]++;
        } else {
            wordFrequency[word] = 1;
        }
    });

    return wordFrequency;
}
