# Test info

- Name: User can logout
- Location: /Users/celestineemili/Desktop/CodeRoot/lastfronttest/skillcraft/apps/client/tests/auth.e2e.spec.ts:27:5

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/login
Call log:
  - navigating to "http://localhost:3000/login", waiting until "load"

    at /Users/celestineemili/Desktop/CodeRoot/lastfronttest/skillcraft/apps/client/tests/auth.e2e.spec.ts:28:14
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | const testUser = {
   4 |   email: `testuser+${Date.now()}@example.com`,
   5 |   password: 'TestPassword123!',
   6 | };
   7 |
   8 | // Registration flow
   9 | test('User can register', async ({ page }) => {
  10 |   await page.goto('/signup');
  11 |   await page.fill('input[name="email"]', testUser.email);
  12 |   await page.fill('input[name="password"]', testUser.password);
  13 |   await page.fill('input[name="confirmPassword"]', testUser.password);
  14 |   await page.click('button[type="submit"]');
  15 |   await expect(page).toHaveURL(/dashboard|login|verify|onboarding/);
  16 | });
  17 |
  18 | test('User can login', async ({ page }) => {
  19 |   await page.goto('/login');
  20 |   await page.fill('input[name="email"]', testUser.email);
  21 |   await page.fill('input[name="password"]', testUser.password);
  22 |   await page.click('button[type="submit"]');
  23 |   await expect(page).toHaveURL(/dashboard|onboarding/);
  24 |   await expect(page.locator('text=Logout')).toBeVisible();
  25 | });
  26 |
  27 | test('User can logout', async ({ page }) => {
> 28 |   await page.goto('/login');
     |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/login
  29 |   await page.fill('input[name="email"]', testUser.email);
  30 |   await page.fill('input[name="password"]', testUser.password);
  31 |   await page.click('button[type="submit"]');
  32 |   await expect(page).toHaveURL(/dashboard|onboarding/);
  33 |   await page.click('text=Logout');
  34 |   await expect(page).toHaveURL(/login/);
  35 | });
  36 |
  37 | test('Forgot password flow shows success', async ({ page }) => {
  38 |   await page.goto('/forgot-password');
  39 |   await page.fill('input[name="email"]', testUser.email);
  40 |   await page.click('button[type="submit"]');
  41 |   await expect(page.locator('text=Check your email')).toBeVisible();
  42 | });
  43 |
  44 | // Note: Reset password flow usually requires a token from email. This test is a placeholder.
  45 | test('Reset password page loads', async ({ page }) => {
  46 |   await page.goto('/reset-password?token=dummytoken');
  47 |   await expect(page.locator('input[name="password"]')).toBeVisible();
  48 |   await expect(page.locator('input[name="confirmPassword"]')).toBeVisible();
  49 | }); 
```