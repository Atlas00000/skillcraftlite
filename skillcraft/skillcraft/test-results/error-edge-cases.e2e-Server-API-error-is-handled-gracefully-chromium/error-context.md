# Test info

- Name: Server/API error is handled gracefully
- Location: /Users/celestineemili/Desktop/CodeRoot/lastfronttest/skillcraft/apps/client/tests/error-edge-cases.e2e.spec.ts:9:5

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/courses/error
Call log:
  - navigating to "http://localhost:3000/courses/error", waiting until "load"

    at /Users/celestineemili/Desktop/CodeRoot/lastfronttest/skillcraft/apps/client/tests/error-edge-cases.e2e.spec.ts:11:14
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test('404 page is shown for unknown routes', async ({ page }) => {
   4 |   await page.goto('/this-route-does-not-exist');
   5 |   await expect(page.locator('text=404')).toBeVisible();
   6 |   await expect(page.locator('text=Page Not Found')).toBeVisible();
   7 | });
   8 |
   9 | test('Server/API error is handled gracefully', async ({ page }) => {
  10 |   // Simulate API/server error by visiting a page that triggers an error (adjust as needed)
> 11 |   await page.goto('/courses/error');
     |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/courses/error
  12 |   await expect(page.locator('text=Something went wrong')).toBeVisible();
  13 | }); 
```