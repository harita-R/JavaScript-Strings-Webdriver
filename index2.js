const USERNAME ='YOUR_USERNAME'; //replace with your email address
const KEY = 'YOUR_KEY'; //replace with your authkey

const {Builder,Key,By} = require("selenium-webdriver");
// require("chromedriver");
const GRID_HOST = 'hub.lambdatest.com/wd/hub';

async function example(){
    var capabilities = {
        "build" : "JavaScript Strings and Webdriver",
        "name" : "Google search",
        "platform" : "Windows 10",
        "browserName" : "Chrome",
        "version" : "90.0",
        "selenium_version" : "3.13.0",
        "chrome.driver" : "90.0"
    }
    const gridUrl = 'https://' + USERNAME + ':' + KEY + '@' + GRID_HOST;

    //To wait for browser to build and launch properly
    let driver = await new Builder()
    .usingServer(gridUrl)
    .withCapabilities(capabilities)
    .build();

    //To fetch http://google.com from the browser with our code.

    await driver.get("http://google.com");
    // The string variable containing value to search
    searchString="How to use strings in Javascript with Selenium webdriver";

    //To send a search query by passing the value in searchString.
    await driver.findElement(By.name("q")).sendKeys(searchString,Key.RETURN);

    //To fetch the value of currentUrl and storing it into a variable by converting it to string
    var url= (await driver.getCurrentUrl()).toString();

    //To find the start and position of query string
    var start = url.indexOf("?q=");
    var end = url.indexOf("&");

    //To extract the query string wrt the start and end positions
    var queryString = url.slice(start+3,end);
    // console.log("search - ",queryString);

    //To create an array containing all keywords by splitting with '+'
    queryStringArray = queryString.split("+");
    console.log("ACTUAL-",queryStringArray);

    //To get an array containing words of original search string
    expectedArray=searchString.split(" ");
    console.log("EXPECTED-",expectedArray);
    
    //To compare the expectedArray with the Actual query string array
    console.log("Match Status:",JSON.stringify(queryStringArray)==JSON.stringify(expectedArray)); 

    //It is always a safe practice to quit the browser after execution
    await driver.quit();
}

example();

