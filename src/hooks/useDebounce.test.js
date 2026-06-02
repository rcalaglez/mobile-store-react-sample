import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "./useDebounce";

afterEach(() => {
  vi.useRealTimers();
});

describe("useDebounce", () => {
  it("returns the initial value immediately", () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useDebounce("hello", 300));
    expect(result.current).toBe("hello");
  });

  it("debounces value updates", () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "a", delay: 300 } }
    );

    rerender({ value: "b", delay: 300 });
    expect(result.current).toBe("a");

    act(() => vi.advanceTimersByTime(300));
    expect(result.current).toBe("b");
  });

  it("only applies the last value when typing rapidly", () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: "" } }
    );

    rerender({ value: "s" });
    rerender({ value: "sa" });
    rerender({ value: "sam" });
    rerender({ value: "sams" });

    act(() => vi.advanceTimersByTime(300));
    expect(result.current).toBe("sams");
  });

  it("respects custom delay", () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: "a" } }
    );

    rerender({ value: "b" });

    act(() => vi.advanceTimersByTime(499));
    expect(result.current).toBe("a");

    act(() => vi.advanceTimersByTime(1));
    expect(result.current).toBe("b");
  });

  it("uses 300ms as default delay", () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value),
      { initialProps: { value: "x" } }
    );

    rerender({ value: "y" });

    act(() => vi.advanceTimersByTime(299));
    expect(result.current).toBe("x");

    act(() => vi.advanceTimersByTime(1));
    expect(result.current).toBe("y");
  });
});
