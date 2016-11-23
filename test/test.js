var assert = require('assert');
var test = require('selenium-webdriver/testing');
var webdriver = require('selenium-webdriver');

console.log('Starting test..');

// Input capabilities
var capabilities = {
  'browserName' : process.env.BROWSER_NAME,
  'browserstack.local' : 'true',
  'browserstack.localIdentifier' :  process.env.BROWSERSTACK_LOCAL_IDENTIFIER,
  'browserstack.user' : process.env.BROWSERSTACK_USER,
  'browserstack.key' : process.env.BROWSERSTACK_KEY,
  'browserstack.debug' : 'true',
  'build' : process.env.TRAVIS_BUILD_NUMBER + ' (' + process.env.TRAVIS_BRANCH + ')'
}

if(process.env.BROWSER_VERSION) {
  capabilities['browser_version'] = process.env.BROWSER_VERSION;
}
if(process.env.DEVICE) {
  capabilities['device'] = process.env.DEVICE;
}

var driver = new webdriver.Builder().
  usingServer('http://hub-cloud.browserstack.com/wd/hub').
  withCapabilities(capabilities).
  build();

test.describe('Test MWGA', function() {
  this.timeout(10000);
  after(function(done) {
    // runs after all tests in this block
	console.log('quitting driver..');
	driver.quit().then(function() {
	  console.log('quit driver');
	  done();
	});
  });
  test.it('Testing default view', function(done) {
    driver.get('http://localhost:8080/');
	driver.findElement(webdriver.By.id('Where')).isDisplayed().then(function(displayed) {
      console.log('input displayed (no query): ' + displayed);
      assert.equal(displayed, true, 'input must be displayed on default view');
	  done();
    });
  });
  test.it('Testing link/share view', function(done) {
    driver.get('http://localhost:8080/?w=2&city=Testcity');
    driver.findElement(webdriver.By.id('Where')).isDisplayed().then(function(displayed) {
		console.log('input displayed (with query): ' + displayed);
      assert.equal(displayed, false, 'input must not be displayed on share link/view');
	  done();
    });
  });
});
