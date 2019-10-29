var mocha = require("mocha"),
    chai  = require("chai"),
    should = require("should"),
    mochawesome = require("mochawesome"),
    chrome = require("selenium-webdriver/chrome"),
    webdriver = require("selenium-webDriver");
    require("chromedriver");
    var Page  = require("../lib/orangePage");

    var By = webdriver.By;
    var until = webdriver.until;
    var expect = chai.expect;

// // set chrome option
//   var options = new chrome.Options();

//   // set chrome argument full-screen
//       options.addArguments("Start-maximized");
//   //   set Option.addArguments disable popup-blocking
//       options.addArguments("disable-popup-blocking"); 
//       options.addArguments('disable-infobars');
//       options.addArguments("test-type");

  // initiate Driver 
    // var driver = new webdriver.Builder().forBrowser('chrome').build();
    
  // get driver    
    // driver.get("http://opensource-demo.orangehrmlive.com/");
    
    // console.log("Title" + driver.getTitle);
    // driver.getTitle().then(function(title) {
    //   console.log("title is " + title);
    //   // expect(title).is.equal("OrangeHRM");
    //   });

    //   //Below code shows alternative syntax to use promises in Node.js
      // var promise = driver.getTitle();
      // promise.then(function(title) {
      // console.log("title is" + title);
      // });
      
   //To get current url, use getCurrentUrl() method.
// driver.getCurrentUrl().then(function(url) {
//   console.log("Url is " + url);
//   });
//   //To get html source of current page, use getPageSource() method.
//   driver.getPageSource().then(function(source) {
//   console.log("Page source is " + source);
//   });
  // driver.quit();

describe("Test Suite", function(){
    this.timeout(50000);
    var driver;
    var driver = new webdriver.Builder().forBrowser('chrome').build();
    driver.manage().window().maximize();

    // before(function(){
    //   // initialize chrome driver
    //   var driver = new webdriver.Builder().forBrowser('chrome').build();
    //   driver.manage().window().maximize();
    //   });
    
    // beforeEach (async function(){
    //     page = new Page();
    //     driver = page.driver;
    //     await page.visit("http://opensource-demo.orangehrmlive.com/");
    // });
    beforeEach(async function(){
      await driver.get("http://opensource-demo.orangehrmlive.com/");
    });

    after(async function(){
        await driver.quit();
        //  .quite();
    });
    

    describe("should display on home page", async function(){
      
        it("find page title", async  function(){
          var resultTitle = await driver.findElement(By.id("content"));
          
          console.log("Title", resultTitle);
            resultTitle.should.to.be.a("content");
        });

        it("find welcome menu on home page", async  function(){
          var searchUserName = await driver.findElement(By.id("txtUsername")).sendKeys('Admin');
            
          var searchPassword = await driver.findElement(By.id("txtPassword")).sendKeys('admin123');

          var loginBtn = await driver.findElement(By.id("btnLogin")).click();  
          
          var result = await driver.findElement(By.id("welcome-menu"))
          console.log("Result", result);
          result.should.to.be("welcome-menu");
      });

      

    });
});

