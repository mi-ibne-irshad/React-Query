import React, { Fragment } from "react";
import { useInfiniteQuery } from "react-query";
import axios from "axios";

// first time pageParam value seted is 1. then it's incriments by getNextPageParam that set a function & that function receive 2 arguments _lastPage & Pages
const fetchColors = ({pageParam = 1}) => {
    return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`)
}

const InfiniteQueriesPage = () => {
    //useInfiniteQuery is use for page & infinite Load More
    const {isLoading, isError, error, data, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage} = useInfiniteQuery(['colors'], fetchColors, {
        getNextPageParam: (_lastPage, pages) => {
            if(pages.length < 7){
                return pages.length + 1
            } else {
                return undefined
            }
        }
    })

    if(isLoading){
        return(
            <h2>
                Loading...
            </h2>
        )
    }
    if(isError) {
        return(
            <h2>{error.message}</h2>
        )
    }
    return(
        <>
            <div>
                {data?.pages.map((group, index)=>{
                    return(
                        <Fragment key={index}>
                            {
                                group.data.map(color => (
                                    <h2 key={color.id}>{color.id} : {color.label}</h2>
                                ))
                            }
                        </Fragment>
                    )
                })}
            </div>
            <div>
                <button onClick={fetchNextPage} disabled={!hasNextPage}>Load More...</button>
            </div>
            <div>{isFetching && !isFetchingNextPage ? 'Fetching...': null}</div>
        </>
    )
}

export default InfiniteQueriesPage;