import { test, expect } from '@playwright/test';

const testUser = {
  email: `profileuser+${Date.now()}@example.com`,
  password: 'TestPassword123!',
};

const newProfile = {
  name: 'Test User',
  avatarUrl: 'https://example.com/avatar.png',
};

test.beforeAll(async ({ request }) => {
  await request.post('http://localhost:3000/api/auth/register', {
    data: {
      email: testUser.email,
      password: testUser.password,
      confirmPassword: testUser.password,
    },
  });
});

test('User can update profile info', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[name="email"]', testUser.email);
  await page.fill('input[name="password"]', testUser.password);
  await page.click('button[type="submit"]');
  await page.goto('/profile/settings');
  await page.fill('input[name="name"]', newProfile.name);
  await page.fill('input[name="avatar"]', newProfile.avatarUrl);
  await page.click('button:text("Save")');
  await expect(page.locator('text=Profile updated successfully')).toBeVisible();
});

test('User can change password', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[name="email"]', testUser.email);
  await page.fill('input[name="password"]', testUser.password);
  await page.click('button[type="submit"]');
  await page.goto('/profile/settings');
  await page.fill('input[name="currentPassword"]', testUser.password);
  await page.fill('input[name="newPassword"]', 'NewPassword123!');
  await page.fill('input[name="confirmNewPassword"]', 'NewPassword123!');
  await page.click('button:text("Change Password")');
  await expect(page.locator('text=Password changed successfully')).toBeVisible();
});

test('User can view public profile', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[name="email"]', testUser.email);
  await page.fill('input[name="password"]', testUser.password);
  await page.click('button[type="submit"]');
  await page.goto('/profile/public');
  await expect(page.locator(`text=${testUser.email}`)).toBeVisible();
  await expect(page.locator('img[alt="Avatar"]')).toBeVisible();
}); 