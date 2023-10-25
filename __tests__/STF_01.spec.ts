import { expect, test } from "@playwright/test";
import {
	addCurrentProductToCart,
	clickOnRandomProductElement,
	getCurrentProductPrice,
	openCart,
	selectRandomAvailableVariant,
} from "./utils";

test("STF_01", async ({ page }) => {
	await page.goto("/");

	const product = await clickOnRandomProductElement({ page });
	await selectRandomAvailableVariant({ page });

	const price = await getCurrentProductPrice({ page });

	await expect(page.getByTestId("CartNavItem")).toContainText("0 items");
	await addCurrentProductToCart({ page });
	await expect(page.getByTestId("CartNavItem")).toContainText("1 item");
	await addCurrentProductToCart({ page });
	await expect(page.getByTestId("CartNavItem")).toContainText("2 items");

	await openCart({ page });

	const totalPrice = (price * 2).toFixed(2);
	await expect(page.getByTestId("CartProductList").getByRole("listitem")).toHaveCount(1);
	await expect(page.getByTestId("CartProductList").getByRole("listitem")).toContainText(product.name);
	await expect(page.getByTestId("CartProductList").getByRole("listitem")).toContainText(`Qty: 2`);
	await expect(page.getByTestId("CartProductList").getByRole("listitem")).toContainText(totalPrice);
});