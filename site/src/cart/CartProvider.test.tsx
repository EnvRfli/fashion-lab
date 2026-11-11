import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CartProvider } from "./CartProvider";
import { useCart } from "./useCart";

function Harness() {
  const { count, subtotal, addItem, updateQuantity, removeItem } = useCart();
  return (
    <div>
      <p data-testid="count">{count}</p>
      <p data-testid="subtotal">{subtotal}</p>
      <button
        type="button"
        onClick={() => addItem("the-poplin-shirt", "7–8Y", 1)}
      >
        Add shirt
      </button>
      <button
        type="button"
        onClick={() => updateQuantity("the-poplin-shirt", "7–8Y", 3)}
      >
        Set three
      </button>
      <button
        type="button"
        onClick={() => removeItem("the-poplin-shirt", "7–8Y")}
      >
        Remove shirt
      </button>
    </div>
  );
}

describe("CartProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("adds, merges, updates, and removes lines with correct totals", async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <Harness />
      </CartProvider>,
    );

    expect(screen.getByTestId("count")).toHaveTextContent("0");
    expect(screen.getByTestId("subtotal")).toHaveTextContent("0");

    await user.click(screen.getByRole("button", { name: "Add shirt" }));
    await user.click(screen.getByRole("button", { name: "Add shirt" }));
    expect(screen.getByTestId("count")).toHaveTextContent("2");
    expect(screen.getByTestId("subtotal")).toHaveTextContent("52");

    await user.click(screen.getByRole("button", { name: "Set three" }));
    expect(screen.getByTestId("count")).toHaveTextContent("3");
    expect(screen.getByTestId("subtotal")).toHaveTextContent("78");

    await user.click(screen.getByRole("button", { name: "Remove shirt" }));
    expect(screen.getByTestId("count")).toHaveTextContent("0");
    expect(screen.getByTestId("subtotal")).toHaveTextContent("0");
  });

  it("writes the bag to local storage", async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <Harness />
      </CartProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Add shirt" }));
    expect(localStorage.getItem("fairholt.bag.v1")).toContain(
      "the-poplin-shirt",
    );
  });
});
