import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { useContext } from "react";
import CartProvider from "./CartProvider";
import CartContext from "./CartContext";

const STORAGE_KEY = "itx-cart-count";

function TestConsumer() {
  const { count, setCount } = useContext(CartContext);
  return (
    <div>
      <span data-testid="count">{count}</span>
      <button onClick={() => setCount((c) => c + 1)}>increment</button>
    </div>
  );
}

describe("CartProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("initializes count to 0 when localStorage is empty", () => {
    render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    );

    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });

  it("reads count from localStorage on mount", () => {
    localStorage.setItem(STORAGE_KEY, "5");

    render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    );

    expect(screen.getByTestId("count")).toHaveTextContent("5");
  });

  it("persists count to localStorage when it changes", () => {
    render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    );

    act(() => {
      screen.getByText("increment").click();
    });

    expect(localStorage.getItem(STORAGE_KEY)).toBe("1");
  });

  it("provides count and setCount via context", () => {
    render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    );

    expect(screen.getByTestId("count")).toHaveTextContent("0");

    act(() => {
      screen.getByText("increment").click();
    });

    expect(screen.getByTestId("count")).toHaveTextContent("1");
  });
});
