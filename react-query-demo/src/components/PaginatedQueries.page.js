import React, {useState} from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchColors = (pageNumber) => {
    return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`)
}

const PaginatedQueriesPage = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const {isLoading, isError, error, data, isFetching} = useQuery(['colors', pageNumber], ()=>fetchColors(pageNumber), {
        keepPreviousData: true, // if new data not fetched from api till now then it will remain the set previous data 
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
                {data?.data.map((color)=>{
                    return(
                        <div key={color.id}>
                            <h2>
                                {color.id} : {color.label}
                            </h2>
                        </div>
                    )
                })}
            </div>
            <div>
                <button onClick={()=> setPageNumber(page => page - 1)} disabled={pageNumber === 1}>Previous Page</button>
                <button onClick={()=> setPageNumber(page => page + 1)} disabled={pageNumber === 7}>Next Page</button>
            </div>
            {isFetching && 'Loading'}
        </>
    )
}

export default PaginatedQueriesPage;