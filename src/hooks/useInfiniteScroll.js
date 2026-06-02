import { useEffect, useRef } from "react";

export function useInfiniteScroll({ enabled, onLoadMore, rootMargin = "160px" }) {
  const targetRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onLoadMore();
        }
      },
      {
        root: null,
        rootMargin,
        threshold: 0,
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [enabled, onLoadMore, rootMargin]);

  return targetRef;
}