/* external js module to create webpage using html and to upload a text file for analysis */

//to display output values in the form of a table
function convTableToHtmlList(table) {
    //converting listed data to a table format
    let html = '<ol>';
    for(word in table) {
        html += `<li><b>${word}</b>: <i>${table[word]} times</i>`;
    }

    html += '</ol>';
    return html;
}



/*to generate the webpage layout and to provide the required information to the main.js file for final execution*/
function generateHtmlContent(outdata) {
    return `
        <!-- html in a javascript file -->

        <html>
            <head>
                <title>Text Analyser</title>

                <!-- to control webpage layout for all devices such as laptop, phone, etc -->
                <meta name="viewport" content="width=device-width, initial-scale=1.0">

                <!-- internal css -->
                <style>
                    body {
                        background-color: sand;
                        padding: 2px;
                        font-size: 21;
                        font-style: Times New Roman;
                    }
                    h1 {
                        text-align: center;
                        font-family: Garamond;
                        font-size: 50;
                    }
                    table, tr, td {
                        border: 1px solid;
                        border-collapse: collapse;
                        padding-left: 1em;
                    }
                    h3 {
                        font-size: 23;
                    }
                    #two {
                        color: red;
                    }
                    .appblock {
                        background-color: palegoldenrod;
                        padding: 4px;
                        border: 2px solid lightgrey;
                        border-radius: 10px;
                        margin-top: 1em;
                    }
                </style>
            </head>

            <body><div class="appblock">

                <!-- p>
                    <div>The following commad prints the working of the program after the file upload takes place. It was only for reference</div>
                    <code>${JSON.stringify(outdata)}</code>
                </p -->

                <h1 name="heading"> Text Analysis </h1>
                
                <div class="appblock" style="background-color: linen">
                    
                    <div>
                        <h3 name="subhead"> Text analysis input </h3>
                        <form action="/" method="post" enctype="multipart/form-data">
                            <label for="filetoupload">Select text file for analysis:    </label>
                            <input type="file" name="filetoupload">
                            <input type="submit" value="Analyze">
                        </form>
                    </div>
                </div>

                <p>
                    <div>${outdata.err}</div>
                </p>

                <div class="appblock" style="background-color: linen">
                    <div>
                        <h3 name="subhead">
                            Text analysis result
                        </h3>
                        <table>
                            <tr>
                                <td>File details:</td>
                                <td>
                                    Filename: ${outdata.fileName} <br>
                                    Filesize: ${outdata.fileSize} bytes
                                </td>
                            </tr>
                            <tr>
                                <td>Word count</td>
                                <td>${outdata.wordCount} nos.</td>
                            <tr>
                            <tr>
                                <td>Reading time</td>
                                <td>
                                    ${outdata.readTime} minutes <br>
                                    (considering 200 words per minute)
                                </td>
                            </tr>
                            <tr>
                                <td>Vowels frequency</td>
                                <td>${convTableToHtmlList(outdata.vowelsFreq)}</td>
                            </tr>
                            <tr>
                                <td>Character count</td>
                                <td>${outdata.charCount} nos.</td>
                            </tr>
                            <tr>
                                <td>Unique word frequency</td>
                                <td>${convTableToHtmlList(outdata.uniqWordFreq)}</td>
                            </tr>
                        </table>
                    </div>
                </p>
            </div></body>
        </html>
    `;
}


//export contents of this js module to main.js
module.exports = {generateHtmlContent}