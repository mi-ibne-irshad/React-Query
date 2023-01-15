import { useQuery } from "react-query";
import axios from "axios";


const fetchSuperHeroes = () => {
    return axios.get('http://localhost:4000/superheroes')
}
const fetchFriends = () => {
    return axios.get('http://localhost:4000/friends')
}



export const ParallelQueriesPage = () => {
    // here we are using alias 
    const { data: superheroes } =useQuery('super-heroes', fetchSuperHeroes)
    const { data: friends } =useQuery('friends', fetchFriends)
    return (
        <div>
            <h2>Parallel Queries</h2>
            {superheroes?.data.map((hero)=>{
                return(
                    <div>
                        {hero.Name}
                    </div>
                    
                )
            })}
            {friends?.data.map((friend)=>{
                return(
                    <div>
                        {friend.Name}
                    </div>
                    
                )
            })}
        </div>
    )
}