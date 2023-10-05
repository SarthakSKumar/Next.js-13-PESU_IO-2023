document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const resultsDiv = document.getElementById('results');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault(); 
  
      const formData = new FormData(form);
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        displayResults(data);
      } else {
        resultsDiv.innerText = 'An error occurred during file upload.';
      }
    });
  
  
    function displayResults(results) {
      const table = document.createElement('table');
      table.classList.add('results-table');
    
      const headers = ['Metric', 'Value'];
      const headerRow = document.createElement('tr');
  
      headers.forEach((headerText) => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
      });
  
      table.appendChild(headerRow);
  
      const analysisData = [
        ['Word Count', results.wordCount],
        ['Reading Time (minutes)', results.readingTime],
        ['Vowel Count', results.vowelCount],
        ['Character Count', results.characterCount],
      ];
  
      analysisData.forEach((dataItem) => {
        const row = document.createElement('tr');
  
        dataItem.forEach((cellData) => {
          const cell = document.createElement('td');
          cell.textContent = cellData;
          row.appendChild(cell);
        });
  
        table.appendChild(row);
      });
  
      resultsDiv.innerHTML = '';
      resultsDiv.appendChild(table);
    }
  });
  