//var assert = require('assert');
var webdriver = require('selenium-webdriver');
//var test = require('selenium-webdriver/testing');

console.log('Starting test..');

// Input capabilities
var capabilities = {
  'browserName' : 'chrome',
  'browserstack.local' : 'true',
  'browserstack.localIdentifier' :  process.env.BROWSERSTACK_LOCAL_IDENTIFIER,
  'browserstack.user' : process.env.BROWSERSTACK_USER,
  'browserstack.key' : process.env.BROWSERSTACK_KEY,
  'browserstack.debug' : 'true',
  'build' : 'First build'
}

var driver = new webdriver.Builder().
  usingServer('http://hub-cloud.browserstack.com/wd/hub').
  withCapabilities(capabilities).
  build();

console.log('fetching page..');
driver.get('http://makeweathergreatagain.test');

console.log('fetching source..');
driver.getPageSource().then(function (src) {
    console.log('source: ' + src);
});

console.log('searching form..');
//driver.findElement(webdriver.By.name('q')).sendKeys('BrowserStack');
driver.findElement(webdriver.By.id('Form')).isDisplayed().then(function(result) {
  console.log('editor shown (no query): ' + result);
});

driver.get('http://makeweathergreatagain.test?w=2&city=Testcity');
driver.findElement(webdriver.By.id('Form')).isDisplayed().then(function(result) {
  console.log('editor shown (with query): ' + result);
});

driver.quit();
