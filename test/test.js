var assert = require('assert');
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

var driver = new webdriver.Builder().
  usingServer('http://hub-cloud.browserstack.com/wd/hub').
  withCapabilities(capabilities).
  build();

test.describe('Test MWGA', function() {
  this.timeout(10000);
  after(function() {
    // runs after all tests in this block
	console.log('quitting driver..');
	driver.quit();
  });
  test.it('Testing default view', function(done) {
    driver.get('http://localhost:8080/');
	driver.findElement(webdriver.By.id('Where')).isDisplayed().then(function(displayed) {
      console.log('input displayed (no query): ' + displayed);
      assert.equal(displayed, 'input must be displayed on default view');
	  done();
    });
  });
  test.it('Testing link/share view', function(done) {
    driver.get('http://localhost:8080/?w=2&city=Testcity');
    driver.findElement(webdriver.By.id('Where')).isDisplayed().then(function(displayed) {
		console.log('input displayed (with query): ' + displayed);
      assert.equal(!displayed, 'input must not be displayed on share link/view');
	  done();
    });
  });
});
