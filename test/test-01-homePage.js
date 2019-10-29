var mocha = require("mocha"),
    chai  = require("chai"),
    should = require("should"),
    mochawesome = require("mochawesome"),
    chrome = require("selenium-webdriver/chrome"),
    webdriver = require("selenium-webDriver");
    require("chromedriver");

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
    //     page = new page();
    //     driver = page.driver;
    //     await page.visit("http://opensource-demo.orangehrmlive.com/");
    // });
    beforeEach( async function(){
       await driver.get("http://opensource-demo.orangehrmlive.com/");
       driver.wait(until.titleIs('OrangeHRM'), 1000);
    });

    after( async function(){
         await driver.quit();
        //  .quite();
    });
    

    describe("should display on login page",   async function(){
      
        it("should display page title",   async function(){
        var title = await driver.getTitle();
        console.log("Title", title);
        expect(title).is.equal("OrangeHRM");
        });

        it("should display page logo",   async function(){
          // var element = await driver.findElement(By.id("divLogo"));
          var rstlogo = await driver.findElement(By.xpath("//img[contains(@src, 'logo')]")).getAttribute ("src");
          console.log("Logo Image:", rstlogo);
          expect(rstlogo).contains("logo.png");
           });

         // ( Username : Admin | Password : admin123 )  
        it("should display helping instruction detail",   async function(){
            var rstHelping = await driver.findElement(By.id("content")).findElement(By.tagName("span"));
            rstHelping.getText().then(function(txt){
              console.log('Entry', txt);
              expect(txt).contains("Username : Admin");
              expect(txt).contains("Password : admin123");
              });
             });
        
        it("should display alternative login detail",   async function(){
            var rstForm = await driver.findElement(By.id("openIDForm")).findElements(By.tagName("input"));
            rstForm.forEach(function(element){
              element.getAttribute('name').then(function(nameAttr){
                console.log("Name Attribute", nameAttr)
                // add expection validation
              });

              element.getAttribute('value').then(function(valueAttr){
                console.log("Value Attribute", valueAttr)
                // expectation validation 
              });

            });
          });     
  
        it("should display Text in footer",   async function(){
          var rstFooterTxt = await driver.findElement(By.id("footer")).findElements(By.tagName("div"));
            var txtArray = [];
            rstFooterTxt.forEach(function(element){
              element.getText().then(function(txt){
                 console.log("Footer text", txt);
                 txtArray.push(txt);
                console.log("txtArray:", txtArray);
                });
            });
            // expectation validation  
            // console.log("txtArray:", txtArray[0], txtArray[1]);
        });     

      it("find login Panel Heading",   async function(){
           var element = await driver.findElement(By.id("logInPanelHeading"));
           element.getText().then(function(txt){
            console.log("Login Heading Pannel", txt);
            expect(txt).is.equal("LOGIN Panel");
           });
          });
        
        }); // end of describe
      

    describe("should display forget Password page",   async function(){    
          
          it("find h1 heading on forget password page",  async function(){
            var element = await driver.findElement(By.className("head"));
            element.getText().then(function(txt){
             console.log("Login Heading Pannel", txt);
             
            });
           });

            // var searchUserName =  await driver.findElement(By.id("txtUsername")).sendKeys('Admin');
              
            // var searchPassword =  await driver.findElement(By.id("txtPassword")).sendKeys('admin123');
  
            // var loginBtn =  await driver.findElement(By.id("btnLogin")).click();  
            
            // var result =  await driver.findElement(By.id("welcome"))
            // result.getText().then(function(txt){
            //   console.log("Heading", txt);
            //   expect(txt).is.equal("Welcome Admin");
            //   });
          
        }); // end of describe
        
        
    describe("should display on home page",   async function(){    
        it("find welcome menu on home page",  async function(){
          var searchUserName =  await driver.findElement(By.id("txtUsername")).sendKeys('Admin');
            
          var searchPassword =  await driver.findElement(By.id("txtPassword")).sendKeys('admin123');

          var loginBtn =  await driver.findElement(By.id("btnLogin")).click();  
          
          var result =  await driver.findElement(By.id("welcome"))
          result.getText().then(function(txt){
            console.log("Heading", txt);
            expect(txt).is.equal("Welcome Admin");
            });
        });
      }); // end of describe
    
});

