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
// Define styles for different product states
const SoldOutOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  z-index: 1;
`;

const CountdownOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(169, 169, 169, 0.2);
  z-index: 1;
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

  console.log(data);
  return (
    <ProductsContainer data-testid="products-container">
      {data?.pages.map((page, i) => (
        <ProductRow key={i}>
          {page.data.map((product) => {
            const correspondingSecKill = secKillData.find(
              (secKill) => secKill.product_id === product.id
            );

            const isSoldOut = correspondingSecKill?.amount === 0;
            const isCountdown =
              correspondingSecKill &&
              new Date(correspondingSecKill.start_time).getTime() > Date.now();

            return (
              <ProductWrapper
                key={product.id}
                data-testid="product-cards"
                style={{ position: "relative", overflow: "hidden" }}
              >
                {isSoldOut && (
                  <SoldOutOverlay>
                    <span>已完售</span>
                  </SoldOutOverlay>
                )}
                {isCountdown && <CountdownOverlay />}
                <FlashProductCard
                  product={product}
                  secKillInfo={correspondingSecKill}
                  isClickable={!isSoldOut && !isCountdown}
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
