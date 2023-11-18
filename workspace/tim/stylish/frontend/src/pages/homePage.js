
import Header from '../components/header/Header';
import { Footer } from '../components/footer/Footer';
import ProductCard from "../components/productCard/ProductCard";
import Slider from "../components/slider/Slider";
// import Main from './components/Main';
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from 'react';
import { useInView } from "react-intersection-observer";
import GetProductList from '../hooks/fetchProduct';
import GetProductSearch from '../hooks/fetchSearch';
import "../components/main.css";
const HomePageLayout = ({ endpoint }) => {
    const imgArray = [
        {
            id: 1,
            imgUrl: "./img/slideImg1.png"
        },
        {
            id: 2,
            imgUrl: "./img/slideImg2.png"
        },
        {
            id: 3,
            imgUrl: "./img/slideImg3.png"
        },
        {
            id: 4,
            imgUrl: "./img/slideImg4.png"
        },
        {
            id: 5,
            imgUrl: "./img/slideImg5.png"
        }
    ];
    const [searchTerm, setSearchTerm] = useState("");
    const [ref, inView] = useInView();
    // if (endpoint != "search") {
    const { data, error, isLoading, refetch, fetchNextPage, hasNextPage } =
        useInfiniteQuery({
            queryKey: ["productList", endpoint],
            queryFn: ({ pageParam = 0 }) => GetProductList(endpoint, pageParam),
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
        console.log("inView", inView);
        console.log("hasNextPage", hasNextPage);
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage]);


    // const {
    //     data: searchData,
    //     error: searchError,
    //     isLoading: searchLoading,
    //     refetch: searchReftch,
    // } = useQuery({
    //     queryKey: ["productSearch", searchTerm],
    //     queryFn: () => GetProductSearch(searchTerm),
    //     enabled: !!searchTerm,
    // });
    if(endpoint=="search"){

    }
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

    //當輸入時一個字重新渲染一次?
    const handleSearchChange = async (e) => {
        setSearchTerm(e);
    };
    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }
    // if (error) {
    //     return <div>Error: {error.message}</div>;
    // }
    console.log("test", searchData);
    return (
        <div>
            <Header
                refetch={fetchNextSearchPage}
                onSearchChange={handleSearchChange}
            />
            <div className="main">
                <Slider slides={imgArray}></Slider>
                <div className="product-grid">
                    {(endpoint=="search" ? searchData?.pages : data?.pages)?.map(
                        (page, pageIndex) => (
                            <div key={pageIndex} className='productCard'>
                                {console.log(page)}
                                {page.data.map((item) => (
                                    <ProductCard key={item.id} product={item} />
                                ))}
                            </div>
                        )
                    )}
                </div>

            </div>
            <div ref={ref}>
                <Footer />
            </div>
        </div>
    );
};



export default HomePageLayout;
