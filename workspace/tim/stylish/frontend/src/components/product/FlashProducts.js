import styled from "styled-components";
import { useEffect, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../../hooks/api";
import FlashProductCard from "../productCard/flashProductCard";

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
  justify-content: space-evenly;
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

function FlashProducts({ endpoint, secKillData }) {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("search");
  const { ref, inView } = useInView();

  const queryKey = useMemo(
    () => ["allProducts", keyword, endpoint],
    [keyword, endpoint]
  );

  console.log(endpoint);
  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: ({ pageParam }) => fetchProducts(endpoint, keyword, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.next_paging,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, queryKey]);

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

  const sortedData = data?.pages.slice().sort((a, b) => {
    const aStartTime = secKillData.find(
      (secKill) => secKill.product_id === a.id
    )?.start_time;
    const bStartTime = secKillData.find(
      (secKill) => secKill.product_id === b.id
    )?.start_time;

    if (aStartTime && bStartTime) {
      return new Date(aStartTime) - new Date(bStartTime);
    }

    return 0;
  });

  console.log(data?.pages);
  return (
    <ProductsContainer data-testid="products-container">
      {data?.pages.map((page, i) => (
        <ProductRow key={i}>
          {page.data.map((product) => {
            const correspondingSecKill = secKillData.find(
              (secKill) => secKill.product_id === product.id
            );

            return (
              <ProductWrapper key={product.id} data-testid="product-cards">
                <FlashProductCard
                  product={product}
                  secKillInfo={correspondingSecKill}
                />
              </ProductWrapper>
            );
          })}
        </ProductRow>
      ))}
      <span ref={ref} />
    </ProductsContainer>
  );
}

export default FlashProducts;
