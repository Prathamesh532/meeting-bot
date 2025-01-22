import { Builder, Browser, By, until, WebDriver } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";
import { recordingScript } from "./scripts/meet"

async function openMeet(driver: WebDriver, meetLink: string) {
  try {
    await driver.get(meetLink);
    const popupButton = await driver.wait(
      until.elementLocated(By.xpath('//span[contains(text(), "Got it")]')),
      10000
    );
    await popupButton.click();
    const nameInput = await driver.wait(
      until.elementLocated(By.xpath('//input[@placeholder="Your name"]')),
      10000
    );
    await nameInput.clear();
    await nameInput.click();
    await nameInput.sendKeys("value", "Meeting bot");
    await driver.sleep(1000);
    const buttonInput = await driver.wait(
      until.elementLocated(By.xpath('//span[contains(text(), "Ask to join")]')),
      10000
    );
    buttonInput.click();
  } finally {
  }
}

async function getDriver() {
  const options = new Options({});
  options.addArguments("--disable-blink-features=AutomationControlled");
  options.addArguments("--use-fake-ui-for-media-stream");
  options.addArguments("--window-size=1080,720");
  options.addArguments("--auto-select-desktop-capture-source=[RECORD]");
  options.addArguments("--auto-select-desktop-capture-source=[RECORD]");
  options.addArguments("--enable-usermedia-screen-capturing");
  options.addArguments('--auto-select-tab-capture-source-by-title="Meet"');
  options.addArguments("--allow-running-insecure-content");

  // ​​--allow-file-access-from-files--use-fake-device-for-media-stream--allow-running-insecure-content--allow-file-access-from-files--use-fake-device-for-media-stream--allow-running-insecure-content

  let driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .build();
  return driver;
}

async function startScreenshare(driver: WebDriver) {
  console.log("startScreensharecalled");
  const response = await driver.executeScript(recordingScript);

  console.log(response);
  driver.sleep(1000000);
}

export async function main(link: string) {
  const driver = await getDriver();
  await openMeet(driver, link);
  await new Promise((x) => setTimeout(x, 20000));
  // wait until admin lets u join
  await startScreenshare(driver);
}
