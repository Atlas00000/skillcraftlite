# Test info

- Name: Registration fails with mismatched passwords
- Location: /Users/celestineemili/Desktop/CodeRoot/lastfronttest/skillcraft/apps/client/tests/auth-negative-flows.e2e.spec.ts:26:5

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/signup
Call log:
  - navigating to "http://localhost:3000/signup", waiting until "load"

    at /Users/celestineemili/Desktop/CodeRoot/lastfronttest/skillcraft/apps/client/tests/auth-negative-flows.e2e.spec.ts:27:14
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | const existingUser = {
   4 |   email: 'existinguser@example.com',
   5 |   password: 'TestPassword123!',
   6 | };
   7 |
   8 | test('Registration fails with invalid email', async ({ page }) => {
   9 |   await page.goto('/signup');
  10 |   await page.fill('input[name="email"]', 'invalid-email');
  11 |   await page.fill('input[name="password"]', 'TestPassword123!');
  12 |   await page.fill('input[name="confirmPassword"]', 'TestPassword123!');
  13 |   await page.click('button[type="submit"]');
  14 |   await expect(page).toHaveURL('/signup');
  15 | });
  16 |
  17 | test('Registration fails with weak password', async ({ page }) => {
  18 |   await page.goto('/signup');
  19 |   await page.fill('input[name="email"]', 'weakpass@example.com');
  20 |   await page.fill('input[name="password"]', '123');
  21 |   await page.fill('input[name="confirmPassword"]', '123');
  22 |   await page.click('button[type="submit"]');
  23 |   await expect(page.locator('text=Something went wrong')).toBeVisible();
  24 | });
  25 |
  26 | test('Registration fails with mismatched passwords', async ({ page }) => {
> 27 |   await page.goto('/signup');
     |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/signup
  28 |   await page.fill('input[name="email"]', 'mismatch@example.com');
  29 |   await page.fill('input[name="password"]', 'TestPassword123!');
  30 |   await page.fill('input[name="confirmPassword"]', 'DifferentPassword!');
  31 |   await page.click('button[type="submit"]');
  32 |   await expect(page.locator('text=Something went wrong')).toBeVisible();
  33 | });
  34 |
  35 | test('Login fails with wrong password', async ({ page }) => {
  36 |   await page.goto('/login');
  37 |   await page.fill('input[name="email"]', existingUser.email);
  38 |   await page.fill('input[name="password"]', 'WrongPassword!');
  39 |   await page.click('button[type="submit"]');
  40 |   await expect(page.locator('text=Invalid credentials')).toBeVisible();
  41 | });
  42 |
  43 | test('Registration fails with already used email', async ({ page }) => {
  44 |   await page.goto('/signup');
  45 |   await page.fill('input[name="email"]', existingUser.email);
  46 |   await page.fill('input[name="password"]', existingUser.password);
  47 |   await page.fill('input[name="confirmPassword"]', existingUser.password);
  48 |   await page.click('button[type="submit"]');
  49 |   await expect(page.locator('text=Email already registered')).toBeVisible();
  50 | });
  51 |
  52 | test('Reset password fails with invalid token', async ({ page }) => {
  53 |   await page.goto('/reset-password?token=invalidtoken');
  54 |   await page.fill('input[name="password"]', 'NewPassword123!');
  55 |   await page.fill('input[name="confirmPassword"]', 'NewPassword123!');
  56 |   await page.click('button[type="submit"]');
  57 |   await expect(page.locator('text=Invalid or expired reset token')).toBeVisible();
  58 | }); 
```