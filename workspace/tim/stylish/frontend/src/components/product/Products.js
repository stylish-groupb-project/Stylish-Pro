import styled from 'styled-components';
import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../../hooks/api";
import ProductCard from "../productCard/ProductCard";

const ProductsContainer = styled.div`
//   max-width: 81.25rem;
//   margin: auto;
//   margin-bottom: 3rem;
  margin: 0 1rem 3rem 1rem;
// width: 100%
  @media (min-width: 1024px) {
    margin-bottom: 6rem;
  }
`;

const ProductRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1rem;
`;

const ErrorMessage = styled.p`
  padding: 12rem 0;
  text-align: center;

  @media (min-width: 1024px) {
    padding: 4.75rem 0;
  }
  color: #828282;
  font-size: 0.75rem;
  font-weight: normal;
`;

const ProductWrapper = styled.div`
//   margin-left: 2.5rem;
    margin-right: 0.5rem;
`;

function Products({ endpoint }) {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("search");
  const { ref, inView } = useInView();

  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["allProducts", keyword],
    queryFn: ({ pageParam }) => fetchProducts(endpoint, keyword, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.next_paging,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

//   if (status === "pending") {
//     return <ProductsSkeleton />;
//   }

  if (status === "error") {
    return <ErrorMessage>500 Internal Server Error</ErrorMessage>;
  }

  if (data?.pages[0].data.length === 0) {
    return (
      <ErrorMessage data-testid="nodatatext">
        目前沒有相關資料，請更換其他關鍵字
      </ErrorMessage>
    );
  }

  return (
    <ProductsContainer data-testid="products-container">
      {data?.pages.map((page, i) => (
        <ProductRow key={i}>
          {page.data.map((product) => (
            <ProductWrapper key={product.id} data-testid="product-cards">
              <ProductCard product={product} />
            </ProductWrapper>
          ))}
        </ProductRow>
      ))}
      {/* {isFetchingNextPage && <ProductsSkeleton />} */}
      <span ref={ref} />
    </ProductsContainer>
  );
}

export default Products;
