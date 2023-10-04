
function analyseTextFile(filePath, outdata) {

    /*
        1. Open the file using 'fs' module
        2. read the file line by line
        3. count words, characters etc as required as you read line by line
        4. then populate final values of counts into the outdata structure fields
    */

        var fs = require('fs');
        let text = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });

        /* splitting the data into individual characters */
        let chars = text.split('');
        outdata.charCount = chars.length;

        /* trimming the data in the case of an additional blankspace that can mess up the count with respect to words */
        textTrimmed = text.trim();
        let words = textTrimmed.split(/[\s\r\n]+/);
        outdata.wordCount = words.length;

        outdata.readTime = (words.length / 200).toPrecision(1);

        //loop to count the number of words
        let tblUniqueWords = {};
        words.forEach(word => {
            if(!tblUniqueWords[word]) tblUniqueWords[word] = 0;
            tblUniqueWords[word] = tblUniqueWords[word] + 1;
        });
        outdata.uniqWordFreq = tblUniqueWords;

        //loop to count total number of vowels present in the document
        let tblVowels = {};
        let arrVowels = ['a', 'e', 'i', 'o', 'u'];
        arrVowels.forEach(char => {
            if(!tblVowels[char]) tblVowels[char] = 0;
        });
        chars.forEach(item => {
            let char = item.toLowerCase();
            if(arrVowels.includes(char)) {
                tblVowels[char] = tblVowels[char] + 1;
            }
        });
        outdata.vowelsFreq = tblVowels;


}



//exporting this js module to main.js
module.exports = {analyseTextFile}
