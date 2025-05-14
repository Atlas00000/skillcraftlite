import { test, expect } from '@playwright/test';

test('404 page is shown for unknown routes', async ({ page }) => {
  await page.goto('/this-route-does-not-exist');
  await expect(page.locator('text=404')).toBeVisible();
  await expect(page.locator('text=Page Not Found')).toBeVisible();
});

test('Server/API error is handled gracefully', async ({ page }) => {
  // Simulate API/server error by visiting a page that triggers an error (adjust as needed)
  await page.goto('/courses/error');
  await expect(page.locator('text=Something went wrong')).toBeVisible();
}); 