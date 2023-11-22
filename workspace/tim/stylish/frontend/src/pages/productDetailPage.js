import Header from '../components/header/Header';
import { Footer } from '../components/footer/Footer';
import ProductDetail from "../components/productDetail/ProductDetail"
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from 'react';
import { useInView } from "react-intersection-observer";
import GetProductSearch from '../hooks/fetchSearch';
import styled from 'styled-components';

const Test = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

`;

const ProductDetailPageLayout = ({endpoint}) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [ref, inView] = useInView();

    const {
        data: searchData,
        error: searchError,
        isLoading: searchLoading,
        fetchNextPage: fetchNextSearchPage,
        hasNextPage: hasSearchNextPage
    } = useInfiniteQuery({
        queryKey: ["productSearch", searchTerm],
        queryFn: ({ pageParam = 0 }) => GetProductSearch(searchTerm, pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) =>
            lastPage?.next_paging || undefined,
        enabled: !!endpoint,
        onLoadMore: (lastPage, allPages) => {
            console.log("onloading", lastPage);
        },
        staleTime: Infinity,
    });

    useEffect(() => {
        if (inView && hasSearchNextPage) {
            fetchNextSearchPage();
        }
    }, [inView, hasSearchNextPage]);

    const handleSearchChange = async (e) => {
        setSearchTerm(e);
    };
    return (
        <Test>
            <Header 
                refetch={fetchNextSearchPage}
                onSearchChange={handleSearchChange}
            />
            <ProductDetail />
            <div ref={ref}>
              <Footer />  
            </div>
            
        </Test>

    )

}

export default ProductDetailPageLayout;