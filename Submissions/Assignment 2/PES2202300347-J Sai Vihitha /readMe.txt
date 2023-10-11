1)Folders - Public and views

2)server.js - Node js backend file to process file. Core logics are here , including API to process file data.

3) Files
  * package.json - npm packages to run the app
  * views\textanalyzer.html - Start up page to upload file
  * Public\analyzesummary.html - After proceesing file - the redirect happens from node.js backend to                            
 analyzesummary.html. Results are displayed in analyzesummary.html.

4) To Run
  * Browse - https://nodejs.org/en/download
  * donwload node-v18.18.0-x64.msi for windows
  * install node-v18.18.0-x64.msi by double clicking
  * Verify - Open CMD ->  node -v
  * browse folder path - .\Fileanalyzer\Fileanalyzer in CMD
  * type npm install
  * type npm start
Example: (You will see this on CMD)
C:\Users\vshrivastava\Downloads\Fileanalyzer\Fileanalyzer>npm start

> start
> node server.js

Server is running on port 3000


  * goto browser type localhost:3000
  * Test by uploading a .txt file.



