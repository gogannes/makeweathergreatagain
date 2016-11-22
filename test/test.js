var assert = require('assert'),
var test = require('selenium-webdriver/testing');
var webdriver = require('selenium-webdriver');

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

test.describe('Test MWGA', function() {
  test.it('Testing default view and link/share view', function() {
    var driver = new webdriver.Builder().
      usingServer('http://hub-cloud.browserstack.com/wd/hub').
      withCapabilities(capabilities).
      build();
    driver.get('http://localhost:8080/');
	driver.findElement(webdriver.By.id('Where')).isDisplayed().then(function(displayed) {
      assert.equal(displayed, 'input must be displayed on default view');
    });
    driver.get('http://localhost:8080/?w=2&city=Testcity');
    driver.findElement(webdriver.By.id('Where')).isDisplayed().then(function(displayed) {
      assert.equal(!displayed, 'input must not be displayed on share link/view');
    });
    driver.quit();
  });
});
