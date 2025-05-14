# Test info

- Name: Tab/keyboard navigation works on login form
- Location: /Users/celestineemili/Desktop/CodeRoot/lastfronttest/skillcraft/apps/client/tests/accessibility.e2e.spec.ts:3:5

# Error details

```
Error: page.goto: Could not connect to the server.
Call log:
  - navigating to "http://localhost:3000/login", waiting until "load"

    at /Users/celestineemili/Desktop/CodeRoot/lastfronttest/skillcraft/apps/client/tests/accessibility.e2e.spec.ts:4:14
```

# Test source

```ts
   1 | import { test, expect, devices } from '@playwright/test';
   2 |
   3 | test('Tab/keyboard navigation works on login form', async ({ page }) => {
>  4 |   await page.goto('/login');
     |              ^ Error: page.goto: Could not connect to the server.
   5 |   await page.keyboard.press('Tab'); // Focus email
   6 |   await expect(page.locator('input[name="email"]')).toBeFocused();
   7 |   await page.keyboard.press('Tab'); // Focus password
   8 |   await expect(page.locator('input[name="password"]')).toBeFocused();
   9 |   await page.keyboard.press('Tab'); // Focus submit
  10 |   await expect(page.locator('button[type="submit"]')).toBeFocused();
  11 | });
  12 |
  13 | test.use({ ...devices['iPhone 12'] });
  14 | test('Main flows work on mobile viewport (iPhone 12)', async ({ page }) => {
  15 |   await page.goto('/login');
  16 |   await expect(page.locator('input[name="email"]')).toBeVisible();
  17 |   await expect(page.locator('input[name="password"]')).toBeVisible();
  18 |   await expect(page.locator('button[type="submit"]')).toBeVisible();
  19 | }); 
```