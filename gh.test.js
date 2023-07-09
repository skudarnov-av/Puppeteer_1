let page;
beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  }, 7000);

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual(
      "GitHub for teams · Build like the best teams on the planet · GitHub"
    );
  }, 8000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 7000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  }, 7000);
});

describe("Github forgot password", () => {

  beforeEach(async () => {
    await page.goto("https://github.com/account/organizations");
  }, 7000);

  test("Sing in'", async () => {
    const link = await page.$(
      "body > div.logged-in.env-production.page-responsive > h1"
    );
    await page.waitForSelector("h1");
    const title = await page.title();
    expect(title).toEqual("Sign in to GitHub · GitHub");
  }, 7000);

  test("enter loginPassword", async () => {
    const emailEnter = 'input[type="text"]';
    await page.type(emailEnter, "email@gmail.com", { delay: 200 });
    const passwordEnter = 'input[type="password"]';
    await page.type(passwordEnter, "qwerty123",{ delay: 200 });
    const link = await page.$(
     "#login > div.auth-form-body.mt-3 > form > div > input "
     );
    await link.click();
    await page.waitForSelector("input");
  }, 7000);

  test("Forgot my password", async () => {
    const firstLink = await page.$(
      "#login > div.auth-form-body.mt-3 > form > div > a" 
      );
    await firstLink.click();
    await page.waitForSelector("a");
    const title = await page.title();
    expect(title).toEqual("Forgot your password? · GitHub");
  }, 7000);
  
});
