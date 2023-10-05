document.addEventListener("DOMContentLoaded", function () {
    const pdfFileInput = document.getElementById("pdfFileInput");
    const wordCountElement = document.getElementById("wordCount");
    const readingTimeElement = document.getElementById("readingTime");
    const vowelCountElement = document.getElementById("vowelCount");
    const wordFrequencyList = document.getElementById("wordFrequencyList");
    const charCountElement = document.getElementById("charCount");
    
    //pdfFileInput.addEventListener("change", function (event) {
        console.log("File selected");
        submitBtn.addEventListener("click", function () {
       // const file = event.target.files[0];
        const file = pdfFileInput.files[0];
        
        if (file) {
            // Load the PDF file using pdf.js
            const reader = new FileReader();
            reader.onload = function (e) {
                const pdfData = new Uint8Array(e.target.result);
                pdfjsLib.getDocument(pdfData).promise.then(function (pdf)  {
                    // Initialize variables for analysis
                    let wordCount = 0;
                    let vowelCount = 0;
                    const wordFrequency = new Map();
                    let totalChars = 0;

                    const totalPages = pdf.numPages;
                    const promises = [];

                    // Process each page of the PDF
                    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
                        promises.push(pdf.getPage(pageNum).then(function (page) {
                            return page.getTextContent().then(function (textContent) {
                                // Count words, vowels, characters, and calculate reading time
                                const text = textContent.items.map(item => item.str).join(" ");
                                wordCount += text.split(/\s+/).filter(Boolean).length;
                                vowelCount += text.match(/[aeiouAEIOU]/g)?.length || 0;
                                totalChars += text.length;

                                // Count word frequency
                                const words = text.split(/\s+/).filter(Boolean);
                                for (const word of words) {
                                    wordFrequency.set(word, (wordFrequency.get(word) || 0) + 1);
                                }
                            });
                        }));
                    }

                    // Wait for all promises to resolve
                    Promise.all(promises).then(function () {
                        // Display results
                        wordCountElement.textContent = wordCount;
                        charCountElement.textContent = totalChars;
                        readingTimeElement.textContent = calculateReadingTime(wordCount);
                        vowelCountElement.textContent = vowelCount;

                        // Display word frequency
                        wordFrequency.forEach(function (count, word) {
                            const listItem = document.createElement("li");
                            listItem.textContent = `${word}: ${count}`;
                            wordFrequencyList.appendChild(listItem);
                        });
                    });
                });
            };

            reader.readAsArrayBuffer(file);
        }
    });
    //});
    function calculateReadingTime(wordCount) {
        const wordsPerMinute = 200;
        const minutes = wordCount / wordsPerMinute;
        return `${Math.ceil(minutes)} minutes`;
    }

});