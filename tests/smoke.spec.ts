import { expect, test } from "@playwright/test";

const HOME_PATH = "/en/";

test.describe("portfolio interactions", () => {
  test("mobile navigation supports keyboard and escape", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(HOME_PATH);

    const menuButton = page.getByRole("button", { name: /open navigation menu/i });
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    const dialog = page.getByRole("dialog", { name: /open navigation menu/i });
    await expect(dialog).toBeVisible();

    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: /home/i })).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("language switcher routes to selected locale", async ({ page }) => {
    await page.goto(HOME_PATH);

    const languageTrigger = page.getByRole("button", { name: /language/i });
    await languageTrigger.click();

    await page.getByRole("option", { name: /spanish/i }).click();
    await expect(page).toHaveURL(/\/es\//);
  });

  test("skills tabs switch content on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 414, height: 896 });
    await page.goto(HOME_PATH);

    const tabs = page.getByRole("tablist");
    await tabs.scrollIntoViewIfNeeded();

    const securityTab = page.getByRole("tab", { name: /Security/i });
    await securityTab.click();
    await expect(securityTab).toHaveAttribute("data-state", "active");
    await expect(page.getByText(/Firewall Management/i)).toBeVisible();
  });

  test("contact actions show toast after copying", async ({ page }) => {
    await page.goto(HOME_PATH);
    await page.getByRole("button", { name: /copy email/i }).click();
    await expect(page.getByText(/Email copied to clipboard/i)).toBeVisible();
  });
});
