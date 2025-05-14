import { test, expect } from '@playwright/test';

const existingUser = {
  email: 'existinguser@example.com',
  password: 'TestPassword123!',
};

test('Registration fails with invalid email', async ({ page }) => {
  await page.goto('/signup');
  await page.fill('input[name="email"]', 'invalid-email');
  await page.fill('input[name="password"]', 'TestPassword123!');
  await page.fill('input[name="confirmPassword"]', 'TestPassword123!');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/signup');
});

test('Registration fails with weak password', async ({ page }) => {
  await page.goto('/signup');
  await page.fill('input[name="email"]', 'weakpass@example.com');
  await page.fill('input[name="password"]', '123');
  await page.fill('input[name="confirmPassword"]', '123');
  await page.click('button[type="submit"]');
  await expect(page.locator('text=Something went wrong')).toBeVisible();
});

test('Registration fails with mismatched passwords', async ({ page }) => {
  await page.goto('/signup');
  await page.fill('input[name="email"]', 'mismatch@example.com');
  await page.fill('input[name="password"]', 'TestPassword123!');
  await page.fill('input[name="confirmPassword"]', 'DifferentPassword!');
  await page.click('button[type="submit"]');
  await expect(page.locator('text=Something went wrong')).toBeVisible();
});

test('Login fails with wrong password', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[name="email"]', existingUser.email);
  await page.fill('input[name="password"]', 'WrongPassword!');
  await page.click('button[type="submit"]');
  await expect(page.locator('text=Invalid credentials')).toBeVisible();
});

test('Registration fails with already used email', async ({ page }) => {
  await page.goto('/signup');
  await page.fill('input[name="email"]', existingUser.email);
  await page.fill('input[name="password"]', existingUser.password);
  await page.fill('input[name="confirmPassword"]', existingUser.password);
  await page.click('button[type="submit"]');
  await expect(page.locator('text=Email already registered')).toBeVisible();
});

test('Reset password fails with invalid token', async ({ page }) => {
  await page.goto('/reset-password?token=invalidtoken');
  await page.fill('input[name="password"]', 'NewPassword123!');
  await page.fill('input[name="confirmPassword"]', 'NewPassword123!');
  await page.click('button[type="submit"]');
  await expect(page.locator('text=Invalid or expired reset token')).toBeVisible();
}); 