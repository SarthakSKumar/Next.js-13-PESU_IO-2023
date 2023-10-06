console.log("Hello World");  //testing if program is running



/*function add(a,b) {
    return Number(a)+ Number(b);
}
console.log(add(1,2));*/

//to create a http server
var http = require('http');

/* 'formidable' module is required to read deatils
    of form submitted with enctype="multipart/form-data" */
var formidable = require('formidable');

//importing js module 'htmlresponse'
const htmlresp = require('./htmlresponse.js')
//importing js module 'textanalyser'
const analyser = require('./textanalyser.js');

const fs = require('fs');



http
    //async function to prevent these default values from being displayed as final output
    .createServer(async function (req, res) {

        let outdata = {};
        outdata.err = '';
        outdata.fileName = '';
        outdata.fileSize = '0';
        outdata.wordCount = '0';
        outdata.readTime = '0';
        outdata.vowelsFreq = '0';
        outdata.charCount = '0';
        outdata.uniqWordFreq = '0';
        
        if (req.method.toLowerCase() === 'post') {

            // parse a file upload
            const opts = { 
                uploadDir: 'temp', 
                keepExtensions: true, 
                allowEmptyFiles: false, 
                maxFileSize: 10 * 1024,     // Max 10Mb size file
                multiples: false ,
                //filter: filterFunction 
            };
            const form = new formidable.IncomingForm(opts);
            let fields;
            let files;
            try {
                //executes if the file size is within limit
                [fields, files] = await form.parse(req);

                outdata.fileName = files.filetoupload[0].originalFilename;
                outdata.fileSize = files.filetoupload[0].size;

                let filePath = files.filetoupload[0].filepath;


                /* analyze the text file */
                analyser.analyseTextFile(filePath, outdata);

                /* after analysis delete the temp file */
                fs.rmSync(filePath, {force: true});


            } catch (err) {
                // example to check for a very specific error
                outdata.err = err;
            }

            outdata.post = files;

          } /* End handling form post */


        res.writeHead(200, { "Content-Type": "text/html"});
        //recieving input from external js file (module)
        res.write(htmlresp.generateHtmlContent(outdata));
        res.end();

    })
    .listen(8000);

    



