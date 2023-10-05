const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());

const uploads = multer({dest: __dirname + "/uploads"});

app.post("/uploads",uploads.array("files"),(req,res) =>{
    console.log(req.body);
    console.log(req.files);
    res.json({status:"files received"});
});

fs.readFile(req.files.path, 'utf8', function (err,data){
    if(err){
        console.error(err);
        res.writeHead(500, {'Content-Type':'text/plain'});
        res.end("Error!");
        return;
    }
        const words = "Words:"+(data.split(/\s+/).filter(word => word !== ''));
        const wordCount = "Word Count:"+(words.length);
        const readingTime = "Reading Time:"+(Math.ceil(wordCount / 200));
        const vowelCount = "Vowel Count:"+(data.match(/[aeiouAEIOU]/g).length);
        const charCount = "Character Count:"+(data.length);
        const wordFrequency = "Word Frequency:"+{};
        words.forEach(word => {
            wordFrequency[word] = (wordFrequency[word] || 0) + 1;
        });
        data = [words, wordCount, readingTime, vowelCount, charCount. wordFrequency];
    });
var file = fs.createWriteStream('Output.txt');
file.on('error', function(err) { /* error handling */ });
arr.forEach(function(v) { file.write(data.join(', ') + '\n'); });
file.end();

app.listen(5000, function(){
    console.log("Server running on port 5000");
});


