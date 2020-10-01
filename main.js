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



const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   // prompt: "Search by> ",
// });


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



const lists = [
  {
    type: 'list',
    name: 'news',
    message: 'What kind of news do you want?',
    choices: ['Top headlines','science','general','business','entertainment','health','technology', 'Exit'],
  }
]

  
  
const getTheUrl = ()=>{///////////////main function
    
    inquirer.prompt(lists).then((answer)=>{
      let newsType = [  "business",  "entertainment",  "general",  "health",  "science",  "sports",  "technology",];
      let category = newsType.filter((item) => item===answer.news)[0]; //since the filter return an array with one value ..it's in index 0 n only index..
      urlCategory = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${key}`;//can't put this out off function ..coz category is connected with 'answer'
      
      if (answer.news === 'Top headlines'){
        url = urlHeadlines;
        repeat(url)
      } else if (answer.news === category){
        url = urlCategory;
        repeat(url)
      }else if (answer.news === 'Exit'){
        prompt.complete()
      }
    })
    .catch(err=>console.log(err))
    
    
}////////////////////////////main function end
    
let repeat = (choosenUrl) => {//////////////////call-back function
  fetch(choosenUrl)
  .then((response)=>{
    console.clear()
    return response.json()})
    .then((data)=>{data.articles.slice(0,4).forEach(({source:{name}, author, title, content})=>
    console.log(`\n\n${name}\nauthor: ${author}\n${content}\n`))
    console.log(`\n\n\n\nYou want to read again, press up/down arrow-key!\n\n\n\n\n`)
  })
  .catch((err)=>console.log(err))
  console.clear()
  getTheUrl()
}
    
  
getTheUrl()