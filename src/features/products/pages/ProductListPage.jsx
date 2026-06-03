import { useCallback, useMemo, useState } from "react";
import { useProducts } from "@/features/products/hooks/useProducts";
import { useDebounce } from "@/hooks/useDebounce";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { filterProducts } from "@/features/products/utils/filterProducts";
import SearchBar from "@/features/products/components/SearchBar";
import ProductGrid from "@/features/products/components/ProductGrid";
import Spinner from "@/components/feedback/Spinner";
import ErrorState from "@/components/feedback/ErrorState";
import PageShell from "@/components/ui/PageShell";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";

const PRODUCTS_PER_PAGE = 12;
const MIN_LOADING_TIME = 450;

export default function ProductListPage() {
  const { data = [], isLoading, isError } = useProducts();

  const [term, setTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const debouncedTerm = useDebounce(term, 300);

  const filteredProducts = useMemo(() => {
    return filterProducts(data, debouncedTerm);
  }, [data, debouncedTerm]);

  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const hasMoreProducts = visibleCount < filteredProducts.length;

  const loadMore = useCallback(() => {
    if (isLoadingMore || !hasMoreProducts) return;

    setIsLoadingMore(true);

    window.setTimeout(() => {
      setVisibleCount((current) =>
        Math.min(current + PRODUCTS_PER_PAGE, filteredProducts.length)
      );

      setIsLoadingMore(false);
    }, MIN_LOADING_TIME);
  }, [filteredProducts.length, hasMoreProducts, isLoadingMore]);

  const loadMoreRef = useInfiniteScroll({
    enabled: hasMoreProducts && !isLoadingMore,
    onLoadMore: loadMore,
    rootMargin: "160px",
  });

  function handleSearchChange(nextTerm) {
    setTerm(nextTerm);
    setVisibleCount(PRODUCTS_PER_PAGE);
    setIsLoadingMore(false);
  }

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorState />;

  return (
    <PageShell>
      <SearchBar value={term} onChange={handleSearchChange} />

      <ProductGrid products={visibleProducts} />

      {hasMoreProducts && (
        <div
          ref={loadMoreRef}
          className="flex min-h-24 items-center justify-center py-8"
        >
          {isLoadingMore && <LoadMoreSpinner />}
        </div>
      )}

      <ScrollToTopButton />
    </PageShell>
  );
}

function LoadMoreSpinner() {
  return (
    <div
      className="inline-flex items-center gap-3 rounded-3xl bg-white px-6 py-4 text-sm font-medium text-neutral-500 shadow-md shadow-neutral-200/70"
      role="status"
      aria-live="polite"
    >
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-200 border-t-orange-600" />
      <span>Cargando más productos</span>
    </div>
  );
}