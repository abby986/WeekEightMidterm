# Project Description
My project is a video game tracker site called Checkpoint Game Hub where users can log in and browse games, save favorites, mark games as played or in progress, search and filter games, and give them a star rating and review.

# Technologies Used
The technologies used in this project are Claude Code, VS Code, HTML, JavaScript, Tailwind CSS, CSS, and Firebase (Firebase authentication and Firestore). 

# Set-Up Instructions
The project will be available online through Netlify, but to open it locally, you can clone or download the repo, and open the index.html file. 

# Known Bugs or Limitations
There are no current known bugs, but limitations apply such as a limited amount of games to search through and no image uploads.

# What I learned
From this project, I learned a lot more about Firebase integration and its capabilities. I also learned about seed scripts and their uses. From this development process with Claude Code, I learned a lot working through an iterative process within a large-scale project. Building a plan and going through each step made testing and debugging a lot easier, and allowed me to read and inspect each step.  

# Architecture Overview
In terms of front-end architecture, html files live in the main project folder and have corresponding JavaScript files in the js folder to help differentiate front-end and back-end processes. The structure consists of HTML files called browse.html, favorites.html, game-detail.html, index.html, library.html, and profile.html. JavaScript files consist of auth.js, browse.js, darkmode.js, db.js, favorites.js, firebase-config.example.js, game-detail.js, library.js, profile.js, storage.js (unused) and ui.js. CSS files live in the css folder and consist of custom.css. All back-end processes are handled with Firebase.

# Database Structure
For this project, I have two databases. the games database holds the game information, and the users database holds the user information. The games database is structured as follows: document= gameId with fields coverImage, description, genre, platform, releaseYear, Tags (array) and title. It has a subcollection titled reviews with fields userId, rating, text, displayName, and timestamp. The users database is structured as follows: document= userId with fields createdAt, displayName, and status. It contains a subcollection titled favorites with gameId and fields gameId, title, coverImage, and addedAt. It contains another subcollection titled library with gameId and fields gameId, title, coverImage, status, and updatedAt.
