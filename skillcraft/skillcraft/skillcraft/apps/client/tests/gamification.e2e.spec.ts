import { test, expect } from '@playwright/test';

const testUser = {
  email: `gamifyuser+${Date.now()}@example.com`,
  password: 'TestPassword123!',
};

const courseId = '1';

test.beforeAll(async ({ request }) => {
  await request.post('http://localhost:3000/api/auth/register', {
    data: {
      email: testUser.email,
      password: testUser.password,
      confirmPassword: testUser.password,
    },
  });
});

test('XP increases after completing a lesson', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[name="email"]', testUser.email);
  await page.fill('input[name="password"]', testUser.password);
  await page.click('button[type="submit"]');
  await page.goto(`/courses/${courseId}`);
  await page.click('text=Lesson 1');
  const xpBefore = await page.locator('text=XP').textContent();
  await page.click('button:text("Complete Lesson")');
  await page.goto('/dashboard');
  const xpAfter = await page.locator('text=XP').textContent();
  expect(Number(xpAfter?.replace(/\D/g, ''))).toBeGreaterThan(Number(xpBefore?.replace(/\D/g, '')));
});

test('Badge is awarded after milestone', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[name="email"]', testUser.email);
  await page.fill('input[name="password"]', testUser.password);
  await page.click('button[type="submit"]');
  await page.goto('/dashboard');
  await expect(page.locator('text=Badge unlocked')).toBeVisible();
});

test('Daily streak is tracked', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[name="email"]', testUser.email);
  await page.fill('input[name="password"]', testUser.password);
  await page.click('button[type="submit"]');
  await page.goto('/dashboard');
  await expect(page.locator('text=Streak')).toBeVisible();
}); 