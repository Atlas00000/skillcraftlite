import { test, expect } from '@playwright/test';

const testUser = {
  email: `dashboarduser+${Date.now()}@example.com`,
  password: 'TestPassword123!',
};

test.beforeAll(async ({ request }) => {
  // Register the user via API or UI for dashboard tests
  await request.post('http://localhost:3000/api/auth/register', {
    data: {
      email: testUser.email,
      password: testUser.password,
      confirmPassword: testUser.password,
    },
  });
});

test('Dashboard loads after login', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[name="email"]', testUser.email);
  await page.fill('input[name="password"]', testUser.password);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/dashboard/);
  await expect(page.locator('text=Progress')).toBeVisible();
  await expect(page.locator('text=XP')).toBeVisible();
  await expect(page.locator('text=Recommendations')).toBeVisible();
});

test('User can logout from dashboard', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[name="email"]', testUser.email);
  await page.fill('input[name="password"]', testUser.password);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/dashboard/);
  await page.click('text=Logout');
  await expect(page).toHaveURL(/login/);
}); 