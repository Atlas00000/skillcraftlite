import { test, expect, devices } from '@playwright/test';

test('Tab/keyboard navigation works on login form', async ({ page }) => {
  await page.goto('/login');
  await page.keyboard.press('Tab'); // Focus email
  await expect(page.locator('input[name="email"]')).toBeFocused();
  await page.keyboard.press('Tab'); // Focus password
  await expect(page.locator('input[name="password"]')).toBeFocused();
  await page.keyboard.press('Tab'); // Focus submit
  await expect(page.locator('button[type="submit"]')).toBeFocused();
});

test.use({ ...devices['iPhone 12'] });
test('Main flows work on mobile viewport (iPhone 12)', async ({ page }) => {
  await page.goto('/login');
  await expect(page.locator('input[name="email"]')).toBeVisible();
  await expect(page.locator('input[name="password"]')).toBeVisible();
  await expect(page.locator('button[type="submit"]')).toBeVisible();
}); 