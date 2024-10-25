# Test Automation training form jaktestowac.pl


## Links
- course https://jaktestowac.pl/course/playwright-wprowadzenie/
- test site
https://demo-bank.vercel.app/  
If link broken check first lesson for update:
https://jaktestowac.pl/lesson/pw1s01l01/
- Code repository

## Commands
- check `NodeJS` version    
`node -v`
- new project with Playwright:  
`npm init playwright@latest`
- record tests for given site  
`npx playwright codegen https://demo-bank.vercel.app/`
- run tests without browser GUI:  
`npx playwright test`
- run test with browser GUI:  
`npx playwright test --headed`
- viewing report  
`npx playwright show-report`


## Playwright Config modifications
- config file `playwright.config.ts`
- disabling browsers, i.e. Firefox:
    ```json
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },
    ```

    ## VisualStudioCode
- Preview: for README.md
- Autosave: in File -> Auto Save
- Timeline: file context menu -> Open Timeline
- Formatting: editor -> context menu -> Format Document

## Playwright snippets
- test:
    ```javascript
    test('test description', async ({ page }) => ) {

    });
    ```
- running one test in group: `test.only`
- grouping tests:
    ```
    test.describe('Group description', () => {
    
    });

    ```
- localizing selectors in chrome console:
    ```
    $$('#nazwa_selectora')
    ```