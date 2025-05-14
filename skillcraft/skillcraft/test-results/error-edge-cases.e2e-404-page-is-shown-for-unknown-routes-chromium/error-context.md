# Test info

- Name: 404 page is shown for unknown routes
- Location: /Users/celestineemili/Desktop/CodeRoot/lastfronttest/skillcraft/apps/client/tests/error-edge-cases.e2e.spec.ts:3:5

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/this-route-does-not-exist
Call log:
  - navigating to "http://localhost:3000/this-route-does-not-exist", waiting until "load"

    at /Users/celestineemili/Desktop/CodeRoot/lastfronttest/skillcraft/apps/client/tests/error-edge-cases.e2e.spec.ts:4:14
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test('404 page is shown for unknown routes', async ({ page }) => {
>  4 |   await page.goto('/this-route-does-not-exist');
     |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/this-route-does-not-exist
   5 |   await expect(page.locator('text=404')).toBeVisible();
   6 |   await expect(page.locator('text=Page Not Found')).toBeVisible();
   7 | });
   8 |
   9 | test('Server/API error is handled gracefully', async ({ page }) => {
  10 |   // Simulate API/server error by visiting a page that triggers an error (adjust as needed)
  11 |   await page.goto('/courses/error');
  12 |   await expect(page.locator('text=Something went wrong')).toBeVisible();
  13 | }); 
```