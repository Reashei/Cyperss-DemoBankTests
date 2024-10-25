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

- jak chcesz dodać zmienną jak w fstring to zamiast
```
zamiast 'cos tam' robisz backtick `cos tam ${twoja_zmienna}`
```

## Uruchamianie istniejącego już projektu z testami

Kroki:

    - Przechodzimy do repozytorium na GitHubie. Cały kod do tego kursu znajdziesz w dedykowanym repozytorium na GitHub.
    - Pobieramy repozytorium (np. jako zip).
    - Rozpakowujemy zip z projektem w katalogu np Projects
    - W VSC otwieramy folder z daną lekcją (np. folder L01_pierwszy_test: playwright_automatyzacja_wprowadzenie/S01_wprowadzenie/L01_pierwszy_test/) jako nowy projekt, który zawiera package.json,
    - W konsoli/terminalu wykonujemy polecenie do instalacji wymaganych paczek:
    npm install

    albo krócej:
    npm i
    Możemy zacząć działać z projektem! 😀

Warto zweryfikować czy projekt poprawnie działa uruchamiając testy.

```
npx playwright test
```

Jeśli otrzymasz błąd o nieaktualnych przeglądarkach wykonaj polecenie:

```
npx playwright install
```

### Prettier

- install Prettier
  `npm install --save-dev --save-exact prettier`
  configure Prettier
  - exlude files in `.prettierignore`
    `    package-lock.json
playwright.report` - set rules in `.prettiercc.json`
    `    {
    "singleQuote": true
}`
- run Prettier
  `npx prettier --write .`
  - ignorowanie plikow prettier
    ```
    tworzymy plik .prettierignore
    i dodajemy w nim nazwy plikow do ignorowania np.
    package-lock.json
    playwright-report
    ```
    - dodawanie konfiguracji prettiera
    ```
    tworzymy plik .prettierc.json
    i dodajemy w nim opcje configu np.
    {
        "singleQuote": true
    }
    Sprawia, ze uzywamy tylko pojedynczych cudzyslowiow
    ```
