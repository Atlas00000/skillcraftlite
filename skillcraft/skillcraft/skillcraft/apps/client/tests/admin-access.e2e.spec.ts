import { test, expect } from '@playwright/test';

const adminUser = {
  email: 'admin@example.com',
  password: 'AdminPassword123!',
};

const normalUser = {
  email: `normaluser+${Date.now()}@example.com`,
  password: 'TestPassword123!',
};

test.beforeAll(async ({ request }) => {
  // Register a normal user for access control test
  await request.post('http://localhost:3000/api/auth/register', {
    data: {
      email: normalUser.email,
      password: normalUser.password,
      confirmPassword: normalUser.password,
    },
  });
});

test('Admin can access admin dashboard', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[name="email"]', adminUser.email);
  await page.fill('input[name="password"]', adminUser.password);
  await page.click('button[type="submit"]');
  await page.goto('/admin');
  await expect(page.locator('text=Admin Dashboard')).toBeVisible();
});

test('Non-admin is denied access to admin dashboard', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[name="email"]', normalUser.email);
  await page.fill('input[name="password"]', normalUser.password);
  await page.click('button[type="submit"]');
  await page.goto('/admin');
  await expect(page.locator('text=Access denied')).toBeVisible();
}); 