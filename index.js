const {By,Key,util, Builder} = require("selenium-webdriver");
require("chromedriver");

async function example(){
 
    // The string variable containing value to search
    var searchString = "Javascript strings with Selenium webdriver";
   
   //To wait for browser to build and launch properly
    let driver = await new Builder().forBrowser("chrome").build();
 
   //To fetch http://google.com from the browser with our code.
    await driver.get("http://google.com");
 
   //To send a search query by passing the value in searchString.
    await driver.findElement(By.name("q")).sendKeys(searchString,Key.RETURN);
   
   //To fetch the value of currentUrl and storing it into a variable by converting it to string
    var url= (await driver.getCurrentUrl()).toString();
 
   //To find the start and position of query string
    var start = url.indexOf("?q=");
    var end = url.indexOf("&");
    //To extract the query string wrt the start and end positions
    var queryString = url.slice(start+3,end);
 
    //To get an array containing all keywords by splitting with '+'
    queryStringArray = queryString.split("+");
    console.log("ACTUAL-",queryStringArray);
 
    //To get an array containing words of original searchString
    expectedArray=searchString.split(" ");
    console.log("EXPECTED-",expectedArray);
 
    //To compare the expectedArray with the Actual query string array
    console.log("Match Status:",JSON.stringify(queryStringArray)==JSON.stringify(expectedArray)); 
 
   //It is always a safe practice to quit the browser after execution
    await driver.quit();
}

example();