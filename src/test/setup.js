import "@testing-library/jest-dom/vitest";

class MockIntersectionObserver {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
    this.elements = new Set();
  }
  observe(element) {
    this.elements.add(element);
  }
  unobserve(element) {
    this.elements.delete(element);
  }
  disconnect() {
    this.elements.clear();
  }
}

globalThis.IntersectionObserver = MockIntersectionObserver;
