// // Use any ONE of these API's that needs an API key to get data.
// // Read the docs to see how to call for and get the data that you want
// // Or you can use one of your choosing if you are comfortable, HOWEVER it must require an API Key
// // Parse the data, and log any important information you would like to show in a nice format of your choosing.
// // You can add your own spin to the data in how you present it.
// // Use any tools we've practiced such as promises, destructuring, etc.
// // Once everything works, upload the file and submit.

// // // Weather API- https://openweathermap.org/api
// // // Weather/Air Quality API-  https://www.airvisual.com/dashboard/api
// // // Recipe API- https://developer.edamam.com/ (uses two key code)
// // // Superheroes API- https://superheroapi.com/index.html
// // // Movies API- https://www.omdbapi.com/
// // // Sports API - https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=Arsenal
// // // News API - https://newsapi.org/
// // // Harvard Art Museum API - https://www.harvardartmuseums.org/collections/api

// // If you want to make your project a little more robust and dynamic you could use tools like the ones below:
// // Read the docs to see how it works. Not hard.

// // Readline: https://nodejs.org/api/readline.html
// // OR
// // Inquirer: https://www.npmjs.com/package/inquirer
// // Read the docs to find out how to use. Pretty intuitive.

// console.clear();
// const key = require('./key')

// const fetch = require("node-fetch");


// const currentDate = new Date().toISOString().split("T")[0];


const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  // prompt: "Search by> ",
});

// let display = `\nToday is ${currentDate} \n\nTo search by a category, type any of the following category\n\n'business', 'entertainment', 'general', 'health',\n 'science', 'sports', 'technology'.\n\nTo search by a keyword, type any word.\n\n`;

// let cat = [  "business",  "entertainment",  "general",  "health",  "science",  "sports",  "technology",];

// let userInteraction = (userInput) => {//////////function.............
  
//   let category = "";
//   let url = "";
//   let urlCategory = '';
  
//   category += cat.filter((item) => userInput === item)[0]; //since the filter return an array with one value ..it's in index 0 n only index..
//   if(userInput === category){
    
//     urlCategory = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${key}`;
//   }
  
//   // let urlByKeyWord =  `https://newsapi.org/v2/everything?q=${word1}&from=2020-09-25&to=${currentDate}&sortBy=popularity&apiKey=${key}` ;

  
//   // console.clear();

//   // if (userInput === "exit") {
//   //   rl.close();
//   // }else if ( userInput===category    ){


//     url = urlCategory;
    
//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       let myData = data.articles;
            
//       if (userInput !== "exit" && userInput === category) {
//         console.log(`\nThese are the ${category} news.`);

//         myData.forEach(({ source: { name }, author, description: desc, content, url }, i) => {
//             if (i <= 2 && desc) {
//               console.log(`\n\n${name}\nauthor :${author}\n${content}\n\n`);
//               console.log("----------------------------------------------------");
//             }
//           }
//         );

//         rl.question(display, userInteraction);
//       }
//   })
//   // }
// };


// rl.question(display, userInteraction);

const fetch = require('node-fetch')
const key = require('./key')
const inquirer = require('inquirer');
console.clear();


const currentDate = new Date().toISOString().split("T")[0];

let category = '';
let word1 = '';

let urlCategory = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${key}`;
let urlByKeyWord =  `https://newsapi.org/v2/everything?q=${word1}&from=2020-09-25&to=${currentDate}&sortBy=popularity&apiKey=${key}` ;
let urlHeadlines = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${key}`

// console.clear()

const lists = [
  {
    type: 'list',
    name: 'news',
    message: 'What kind of news do you want?',
    choices: ['Top headlines','science','general','business','entertainment','health','technology', 'Exit'],
  }
]
// if ( answer.news === 'Exit'){
// readline.close()
// }


const hike = ()=>{///////////////function
  
  inquirer.prompt(lists).then((answer)=>{
    if(answer.news === 'Top headlines'){
      url = urlHeadlines;
      repeat(url)
    }
    // if ( answer.news === 'Exit'){

    // }
    let cat = [  "business",  "entertainment",  "general",  "health",  "science",  "sports",  "technology",];
    let category = cat.filter((item) => item===answer.news)[0]; //since the filter return an array with one value ..it's in index 0 n only index..
    
    urlCategory = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${key}`;
      
    if(answer.news === category){
      url = urlCategory;
      repeat(url)
    }
  


  if ( answer.news === 'Exit'){
    readline.close()
    }
  })
  .catch(err=>console.log(err))

  // if ( answer.news === 'Exit'){
  //   readline.close()
  //   }

}////////////////////////////main function end

let repeat = (choosenUrl) => {//////////////////function
  fetch(choosenUrl)
    .then((response)=>response.json())
    .then((data)=>{data.articles.slice(0,4).forEach(({source:{name}, author, title, content})=>
          console.log(`\n\n${name}\nauthor: ${author}\n${content}\n`))
          
          console.log(`\n\n\n\nYou want to read again, press up/down arrow-key!`)
    })
    .catch((err)=>console.log(err))
    console.clear()
    hike()
}

// const exit = ()=>{

// }
  

hike()