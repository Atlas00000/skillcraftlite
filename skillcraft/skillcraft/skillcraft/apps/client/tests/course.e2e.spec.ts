import { test, expect } from '@playwright/test';

const testUser = {
  email: `courseuser+${Date.now()}@example.com`,
  password: 'TestPassword123!',
};

const courseId = '1';

test.beforeAll(async ({ request }) => {
  // Register the user via API or UI for course tests
  await request.post('http://localhost:3000/api/auth/register', {
    data: {
      email: testUser.email,
      password: testUser.password,
      confirmPassword: testUser.password,
    },
  });
});

test('User can enroll in a course', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[name="email"]', testUser.email);
  await page.fill('input[name="password"]', testUser.password);
  await page.click('button[type="submit"]');
  await page.goto(`/courses/${courseId}`);
  await page.click('button:text("Enroll")');
  await expect(page.locator('text=Enrolled')).toBeVisible();
});

test('User can access course content', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[name="email"]', testUser.email);
  await page.fill('input[name="password"]', testUser.password);
  await page.click('button[type="submit"]');
  await page.goto(`/courses/${courseId}`);
  await expect(page.locator('text=Lesson 1')).toBeVisible();
  await page.click('text=Lesson 1');
  await expect(page.locator('video')).toBeVisible();
  await expect(page.locator('text=Notebook')).toBeVisible();
});

test('Progress is saved after lesson completion', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[name="email"]', testUser.email);
  await page.fill('input[name="password"]', testUser.password);
  await page.click('button[type="submit"]');
  await page.goto(`/courses/${courseId}`);
  await page.click('text=Lesson 1');
  await page.click('button:text("Complete Lesson")');
  await expect(page.locator('text=Progress saved')).toBeVisible();
}); 