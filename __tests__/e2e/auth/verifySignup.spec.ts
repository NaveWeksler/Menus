import { test, expect } from '@playwright/test';
import exp from 'constants';

test('verifySignup page', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/verifySignup');


  // create a locator
  const getStarted = page.locator('p.text-light');
  const input = page.locator("input");

  await input.nth(0).type("123456789");
  await expect(input.nth(0)).toHaveValue("1");
  await expect(input.nth(1)).toHaveValue("2");
  await expect(input.nth(2)).toHaveValue("3");
  await expect(input.nth(3)).toHaveValue("4");
  await expect(input.nth(4)).toHaveValue("5");
  await expect(input.nth(5)).toHaveValue("6");


  // Expect an attribute "to be strictly equal" to the value.
  await expect(getStarted).toContainText("An email");
  await expect(page).toHaveURL('http://localhost:3000/auth/verifySignup');
  // Click the get started link.
  //await getStarted.click();

  // Expects the URL to contain intro.
  //await expect(page).toHaveURL(/.*intro/);
});
