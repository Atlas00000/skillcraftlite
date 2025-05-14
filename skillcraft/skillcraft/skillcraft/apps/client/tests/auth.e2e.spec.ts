import { test, expect } from '@playwright/test';

const testUser = {
  email: `testuser+${Date.now()}@example.com`,
  password: 'TestPassword123!',
};

// Registration flow
test('User can register', async ({ page }) => {
  await page.goto('/signup');
  await page.fill('input[name="email"]', testUser.email);
  await page.fill('input[name="password"]', testUser.password);
  await page.fill('input[name="confirmPassword"]', testUser.password);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/dashboard|login|verify|onboarding/);
});

test('User can login', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[name="email"]', testUser.email);
  await page.fill('input[name="password"]', testUser.password);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/dashboard|onboarding/);
  await expect(page.locator('text=Logout')).toBeVisible();
});

test('User can logout', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[name="email"]', testUser.email);
  await page.fill('input[name="password"]', testUser.password);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/dashboard|onboarding/);
  await page.click('text=Logout');
  await expect(page).toHaveURL(/login/);
});

test('Forgot password flow shows success', async ({ page }) => {
  await page.goto('/forgot-password');
  await page.fill('input[name="email"]', testUser.email);
  await page.click('button[type="submit"]');
  await expect(page.locator('text=Check your email')).toBeVisible();
});

// Note: Reset password flow usually requires a token from email. This test is a placeholder.
test('Reset password page loads', async ({ page }) => {
  await page.goto('/reset-password?token=dummytoken');
  await expect(page.locator('input[name="password"]')).toBeVisible();
  await expect(page.locator('input[name="confirmPassword"]')).toBeVisible();
}); 