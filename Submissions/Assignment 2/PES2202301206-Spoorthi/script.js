document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("fileInput");
    const submitBtn = document.getElementById("submitBtn");
    const resultsDiv = document.getElementById("results");
    const wordCountSpan = document.getElementById("wordCount");
    const readingTimeSpan = document.getElementById("readingTime");
    const vowelCountSpan = document.getElementById("vowelCount");
    const charCountSpan = document.getElementById("charCount");
    const wordFrequencyList = document.getElementById("wordFrequency");

    submitBtn.addEventListener("click", () => {
        const file = fileInput.files[0];

        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            fetch("/upload", {
                method: "POST",
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    wordCountSpan.textContent = data.wordCount;
                    readingTimeSpan.textContent = data.readingTime;
                    vowelCountSpan.textContent = data.vowelCount;
                    charCountSpan.textContent = data.charCount;

                    // Clear previous word frequency data
                    wordFrequencyList.innerHTML = "";
                    const wordFrequency = data.wordFrequency;
                    for (const word in wordFrequency) {
                        const listItem = document.createElement("li");
                        listItem.textContent = `${word}: ${wordFrequency[word]}`;
                        wordFrequencyList.appendChild(listItem);
                    }

                    resultsDiv.classList.remove("hidden");
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    });
});