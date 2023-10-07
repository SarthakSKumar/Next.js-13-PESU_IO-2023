import React from 'react'; // Import React
import styles from './styles.css';

export default function Home() {
  return (
    <div className='main'>
      <h2 className="hello">Hello there,<br />I am Rahul Senthil Kumar</h2>
      <div className="type">
        Student, Motivated learner
      </div>
      <div className="second">
        <h1 className="aboutme">About Me</h1>
        <br>
        </br>
        <br></br>
        <br></br>
    <img className="pic" src="abc.jpg" alt="nono"></img>
    <p className="para">I am Rahul Senthil Kumar, an 18 year old first year student from PES university.<br></br>
    Im a musician, athlete and an aspiring web devoloper. I've been learning and working on<br></br>
    dev applications like HTML, CSS, javascript, Node, Next, React, etc.
    </p>
      </div>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
      <div>
        <h1 className="learnmore">My Projects</h1>
        <h1 className="hhh">Weather App</h1>
        <p className="pup">I created a user-friendly web application that allows users to input a city and receive real-time weather information. The application utilizes the OpenWeatherMap API to fetch and display current weather conditions, including temperatures and climate descriptions. The project strenghtened by understanding of web development, API integration, and user interface design.</p>
        <br></br>
        <br></br>
        <h1 className="hhh">Text Analysis Application</h1>
        <p className="pup">This project involved creating a Node.js server that facilitates file uploads and performs advanced text analysis on the uploaded content.
        I created a web application using Node.js that allows users to easily upload text files and receive insightful analysis. The application calculates word count, <br></br>
        reading time, vowel count, character count, and word frequency, providing users with valuable information about their documents. I also prioritized user-friendliness by incorporating a simple and visually appealing interface.
        I utilized the multer middleware for handling file uploads, specifying the storage location and file naming conventions. 
        </p>
      </div>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
      <div>
        <h1 className="reach">Reach Me!</h1>
        <a className="linkedin" href='https://www.linkedin.com/in/rahul-senthil-kumar-576621294/' text='Linkedin'>Linkedin</a>
        <a className="github" href='https://github.com/Rahul6700' text='GitHub'>GitHub</a>
        <br></br>
        <br></br>
        <p className="mail">Email: rahulsk4087@gmail.com</p>
      </div>
    </div>
  );
}
        
        
