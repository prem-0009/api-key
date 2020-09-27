// Use any ONE of these API's that needs an API key to get data.
// Read the docs to see how to call for and get the data that you want
// Or you can use one of your choosing if you are comfortable, HOWEVER it must require an API Key
// Parse the data, and log any important information you would like to show in a nice format of your choosing.
// You can add your own spin to the data in how you present it.
// Use any tools we've practiced such as promises, destructuring, etc.
// Once everything works, upload the file and submit.

// // Weather API- https://openweathermap.org/api
// // Weather/Air Quality API-  https://www.airvisual.com/dashboard/api
// // Recipe API- https://developer.edamam.com/ (uses two key code)
// // Superheroes API- https://superheroapi.com/index.html
// // Movies API- https://www.omdbapi.com/
// // Sports API - https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=Arsenal
// // News API - https://newsapi.org/
// // Harvard Art Museum API - https://www.harvardartmuseums.org/collections/api

// If you want to make your project a little more robust and dynamic you could use tools like the ones below:
// Read the docs to see how it works. Not hard.

// Readline: https://nodejs.org/api/readline.html
// OR
// Inquirer: https://www.npmjs.com/package/inquirer
// Read the docs to find out how to use. Pretty intuitive.

console.clear();
const key = require('./key')
// const key = "8c715e8a95cb4fe0abbbcf7463ecf1b5";
const fetch = require("node-fetch");
// console.log(`${key}`)

let currentDate = new Date().toISOString().split("T")[0];


const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Search by> ",
});

let display = `\nToday is ${currentDate} \n\nTo search by a category, type any of the following category\n\n'business', 'entertainment', 'general', 'health',\n 'science', 'sports', 'technology'.\n\nTo search by a keyword, type any word.\n\n`;

let cat = [  "business",  "entertainment",  "general",  "health",  "science",  "sports",  "technology",];





let userInteraction = (userInput) => {//////////function.............
  let category = "";
  let url = "";
  let word1 = '';
  
  category += cat.filter((item) => userInput === item)[0]; //since the filter return an array with one value ..it's in index 0 n only index..

  // if (userInput !== category){}

  
  let urlCategory = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${key}`;
  let urlByKeyWord =  `https://newsapi.org/v2/everything?q=${word1}&from=2020-09-25&to=${currentDate}&sortBy=popularity&apiKey=${key}` ;


  url = urlCategory;
  console.clear();
  if (userInput === "exit") {
    rl.close();
  }else{




  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let myData = data.articles;
      
      
      if (userInput !== "exit" && userInput === category) {
        console.log(`\nThese are the ${category} news.`);

        myData.forEach(({ source: { name }, author, description: desc, content, url }, i) => {
            if (i <= 2 && desc) {
              console.log(`\n\n${name}\nauthor :${author}\n${content}\n\n`);
              console.log("----------------------------------------------------");
            }
          }
        );

        rl.question(display, userInteraction);
      }
      if (userInput !== category){
        return myData;
      }

      
    })

    // .then((myData)=>{
    //   if (userInput !== category){
    //     word1 = userInput;
    //     url =  `https://newsapi.org/v2/everything?q=${word1}&from=2020-09-25&to=${currentDate}&sortBy=popularity&apiKey=${key}` ;

    //     myData.forEach(({ source: { name }, author, description: desc, content, url }, i) => {
    //       if (i <= 2 && desc) {
    //         console.log(`\n\n${name}\nauthor :${author}\n${content}\n\n`);
    //         console.log("----------------------------------------------------");
    //       }
    //     }
    //   );

    //   rl.question(display, userInteraction);
    //   }
      
    // });

  }
};

// rl.question(`If you want all "Technology" news type: hi there?\n`,(answer) => {
//     // to read the word typed into command line
//     // TODO: Log the answer in a database
//     console.log(`Thank you for your valuable feedback: ${answer}`);
//     rl.close();
//   }
// );
// rl.on("close", () => {
//   console.log("correct answer");
// });

rl.question(display, userInteraction);

// fetch(url)
// .then((data) => data.json())

// const request = require('request');
// const argv = require('yargs').argv;

// let apiKey = '*****************************';
// let city = argv.c || 'portland';
// let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

// request(url, function (err, response, body) {
//   if(err){
//     console.log('error:', error);
//   } else {
//     let weather = JSON.parse(body)
//     let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
//     console.log(message);
//   }
// });
