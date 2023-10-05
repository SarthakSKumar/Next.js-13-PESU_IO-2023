## Assignment 2: Text Analysis Web Application

### Objective
The objective of this assignment is to create a web-based text analysis application using Node.js. You will build a server, implement file upload functionality, and display the results of text analysis on a webpage.
### Deadline
The assignment is graded for **20 marks** and the deadline for submission is on **5th October 2023 11:59 pm**. Marks will be deducted for late submissions if any.

### Assignment Description

You are tasked with building a web application that allows users to upload a text (.txt) file and receive various text analysis results on a webpage. Here are the key requirements:

1. **User Interface (UI):**
   - Create an interface to upload a text file.
   - Include an input field or file upload button where users can select and upload a text file.
   - Implement a "Submit" button to trigger the file upload and analysis process.
   - Design the webpage to display analysis results.

2. **Node.js Server:**
   - Use the built-in 'http' module in Node.js to create an HTTP server.
   - Handle incoming file uploads from the user using the required libraries.
   - Save the uploaded text file to a temporary location on the server.
   - Implement server-side logic for text analysis tasks as described below.

3. **Text Analysis Functionality:**

   - When the user uploads a text file and clicks the "Submit" button, your Node.js server should perform the following text analysis tasks:
     - Count the number of words in the text file (words are separated by spaces).
     - Estimate the reading time of the text based on an average reading speed of **200 words per minute**.
     - Count the number of vowels (both uppercase and lowercase) in the text file (consider 'a', 'e', 'i', 'o', and 'u').
     - Count the total number of characters in the text file, including spaces and special characters.
     - Display the frequency (number of occurrences) of each unique word in the text.

4. **Styling:**
   - Apply CSS to style the webpage and make it visually appealing.
   - Ensure that the design is responsive and looks good on both desktop and mobile devices.

### Submission
- Your project directory files must be added to the `Submissions/Assignment 2/[SRN]-NAME` folder in this repository. Fork this repository, add the files in the location and create a Pull Request to this repository.
- It is compulsory to include a screenshot of the application along with your submission.

### Grading Criteria
Your assignment will be graded based on the following criteria:

1. Correct Implementation::
   - Properly implement file upload, text analysis, and result display.

2. Creativity and Design:
   - Design a user-friendly and visually appealing interface.
   - Apply creativity in presenting weather information.

3. Functionality and Interactivity:
   - Ensure that the web application correctly analyzes uploaded text files.
   - Ensure that the user interface is interactive and responsive to user actions.

4. Responsiveness and Usability:
   - Ensure that the Text Analysis App works well on various devices and screen sizes.

5. Code Quality and Organization:
   - Write clean and well-organized code.
   - Use meaningful variable and function names.
   - Comment your code to explain complex logic.

### Note
Stick to building the Text Analysis App with Node.js. Feel free to be creative in your approach and explore different libraries or technologies if you'd like. While you have the flexibility to choose your tools, it's essential to ensure that the core required functionality is present and working as specified in the assignment description.
You have the freedom to use libraries or technologies that you believe will enhance your project, but make sure they align with the assignment's objectives and requirements. Creativity in design and presentation of results is highly encouraged, as long as it does not compromise the core functionality. Proper error handling for file upload and analysis is also crucial.

Good luck!
