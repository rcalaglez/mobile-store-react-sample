import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import { useInfiniteScroll } from "./useInfiniteScroll";

let capturedCallback = null;
let capturedOptions = null;
let observeMock;
let disconnectMock;

beforeEach(() => {
  observeMock = vi.fn();
  disconnectMock = vi.fn();
  capturedCallback = null;
  capturedOptions = null;

  globalThis.IntersectionObserver = class {
    constructor(callback, options) {
      capturedCallback = callback;
      capturedOptions = options;
    }
    observe = observeMock;
    disconnect = disconnectMock;
  };
});

afterEach(() => {
  vi.restoreAllMocks();
});

function TestComponent({ enabled, onLoadMore, rootMargin }) {
  const ref = useInfiniteScroll({ enabled, onLoadMore, rootMargin });
  return <div ref={ref} data-testid="sentinel" />;
}

describe("useInfiniteScroll", () => {
  it("returns a ref object", () => {
    const { result } = renderHook(() =>
      useInfiniteScroll({ enabled: false, onLoadMore: vi.fn() })
    );
    expect(result.current).toHaveProperty("current");
  });

  it("does not create observer when disabled", () => {
    render(
      <TestComponent enabled={false} onLoadMore={vi.fn()} />
    );
    expect(observeMock).not.toHaveBeenCalled();
  });

  it("creates observer and observes the sentinel element when enabled", () => {
    const onLoadMore = vi.fn();
    render(<TestComponent enabled={true} onLoadMore={onLoadMore} />);

    expect(observeMock).toHaveBeenCalledTimes(1);
    const observedElement = observeMock.mock.calls[0][0];
    expect(observedElement).toHaveAttribute("data-testid", "sentinel");
  });

  it("calls onLoadMore when the sentinel enters the viewport", () => {
    const onLoadMore = vi.fn();
    render(<TestComponent enabled={true} onLoadMore={onLoadMore} />);

    capturedCallback([{ isIntersecting: true }]);

    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  it("does not call onLoadMore when the sentinel is not intersecting", () => {
    const onLoadMore = vi.fn();
    render(<TestComponent enabled={true} onLoadMore={onLoadMore} />);

    capturedCallback([{ isIntersecting: false }]);

    expect(onLoadMore).not.toHaveBeenCalled();
  });

  it("passes rootMargin to the observer", () => {
    render(
      <TestComponent
        enabled={true}
        onLoadMore={vi.fn()}
        rootMargin="200px"
      />
    );

    expect(capturedOptions).toEqual({
      root: null,
      rootMargin: "200px",
      threshold: 0,
    });
  });

  it("uses default rootMargin of 160px when not specified", () => {
    render(<TestComponent enabled={true} onLoadMore={vi.fn()} />);

    expect(capturedOptions.rootMargin).toBe("160px");
  });

  it("disconnects observer on unmount", () => {
    const { unmount } = render(
      <TestComponent enabled={true} onLoadMore={vi.fn()} />
    );

    unmount();

    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });
});
