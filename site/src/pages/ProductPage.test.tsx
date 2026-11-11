import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "../cart/CartProvider";
import { ProductPage } from "./ProductPage";

function renderProduct(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <CartProvider>
        <Routes>
          <Route path="/shop/:slug" element={<ProductPage />} />
        </Routes>
      </CartProvider>
    </MemoryRouter>,
  );
}

describe("ProductPage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("requires a size before adding to the bag", async () => {
    const user = userEvent.setup();
    renderProduct("/shop/the-poplin-shirt");

    expect(
      screen.getByRole("heading", { level: 1, name: "The Poplin Shirt" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Add to bag" }));
    expect(
      screen.getByText("Choose a size before adding to the bag."),
    ).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem("fairholt.bag.v1") ?? "[]")).toEqual(
      [],
    );
  });

  it("adds the chosen size and announces the result", async () => {
    const user = userEvent.setup();
    renderProduct("/shop/the-poplin-shirt");

    await user.click(screen.getByRole("radio", { name: "7–8Y" }));
    await user.click(screen.getByRole("button", { name: "Add to bag" }));

    expect(
      screen.getByText(/Added The Poplin Shirt, size 7–8Y/),
    ).toBeInTheDocument();
    expect(localStorage.getItem("fairholt.bag.v1")).toContain("7–8Y");
  });

  it("renders the not-found state for an unknown slug", () => {
    renderProduct("/shop/not-a-real-piece");
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "This page has left the register.",
      }),
    ).toBeInTheDocument();
  });
});
