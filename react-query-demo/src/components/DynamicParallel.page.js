import { useQueries } from "react-query";
import axios from "axios";

const fetchSuperHero = (heroId) => {
    return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}


const DynamicParallelPage = ({heroIds}) => {
    //if we have the dynamic parallel queries then we use here 'useQueries' insted of useQuery: useQueries have the different syntext then the useQuery
    const queryResults = useQueries(
        heroIds.map(id => {
            return {
                queryKey: ['super-hero', id],
                queryFn: () => fetchSuperHero(id)
            }
        })
    )
    console.log('This is queryResults: ', queryResults);
    console.log('This is isLoading: ', queryResults.isLoading);
   
    const datas = queryResults.map((data)=>{
        return data.isError
    })
    console.log('This is isError: ', datas);
    return(
        <div>DynamicParallelPage</div>
    )
}

export default DynamicParallelPage;