import { test, expect } from '@playwright/test';

const testUser = {
  email: `projectuser+${Date.now()}@example.com`,
  password: 'TestPassword123!',
};

const courseId = '1';
const projectTitle = 'My Capstone Project';
const projectDescription = 'This is my project submission for testing.';

// Register user before tests

test.beforeAll(async ({ request }) => {
  await request.post('http://localhost:3000/api/auth/register', {
    data: {
      email: testUser.email,
      password: testUser.password,
      confirmPassword: testUser.password,
    },
  });
});

test('User can submit a project', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[name="email"]', testUser.email);
  await page.fill('input[name="password"]', testUser.password);
  await page.click('button[type="submit"]');
  await page.goto(`/courses/${courseId}/project-submission`);
  await page.fill('input[name="title"]', projectTitle);
  await page.fill('textarea[name="description"]', projectDescription);
  await page.setInputFiles('input[type="file"]', 'README.md'); // Example file
  await page.click('button:text("Submit Project")');
  await expect(page.locator('text=Submission received')).toBeVisible();
});

test('Peer review/feedback is visible if implemented', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[name="email"]', testUser.email);
  await page.fill('input[name="password"]', testUser.password);
  await page.click('button[type="submit"]');
  await page.goto(`/courses/${courseId}/project-submission`);
  await expect(page.locator('text=Peer Feedback')).toBeVisible({ timeout: 5000 });
}); 