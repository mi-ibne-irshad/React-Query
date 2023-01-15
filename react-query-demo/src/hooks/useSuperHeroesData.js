// Hook is nothing but a function
import { useQuery, useMutation, useQueryClient } from 'react-query';
// import axios from 'axios';
import { request } from '../utils/axios-utils';

const fetchSuperHeroes = () => {
    // return axios.get('http://localhost:4000/superheroes');
    return request({url: '/superheroes'})
  };
const addSuperHero = (hero) => {
    // return axios.post('http://localhost:4000/superheroes', hero)
    return request({url: '/superheroes', method: 'post', data: hero })
}

export const useSuperHeroesData = (onSuccess, onError) => {
    return useQuery(
        'super-heroes', // this is unique key
        fetchSuperHeroes, // this is fetcher function
        {
          // cacheTime: 5000, // this is query cache time by default it sets 5 min
    
          // staleTime: 30000, // it's hold the record not to fetch the record by api again and again with in 30 second, this is due to if data is not updating continously default staletime is 0 second.
    
          // refetchOnMount: true, // query data refetch on every mount of page.
          // refetchOnMount: false,
          // refetchOnWindowFocus: true, // any time when we on the page it will refetch the data. bydefault its set true.
          // refetchInterval: 2000 // by default it's value is false Now it's refetch data at every 2 second.
          // refetchIntervalInBackground: true, // this will work continousy in background if window will not be in focused
        // enabled: false, // if enabled will be false data not be fetch on first time or we can say on first mount data not be fetched.
          onSuccess: onSuccess, 
          onError, // if the key and value are same then we can use only one word. like upper. or ya by default parameter bajh data ha.
        //   select: (data) => {
        //     const superHeroNames = data.data.map(hero => hero.Name)
        //     return superHeroNames;
        //   } // it will return the exect the same data that we want to use it's also we can use for the data filtering. 
        } // this is the behaviour it's optional
      );
}

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  // the second parameter is if mutation succeed & update the query & automatically update the record
  // return useMutation(addSuperHero, {onSuccess: ()=> {
  //   queryClient.invalidateQueries('super-heroes')
  // }})


  //another method it will not to work on the get request
  return useMutation(addSuperHero, {
    // onSuccess: (data)=> {
    // queryClient.setQueryData('super-heroes', (oldQueryData)=> {
    //   return{
    //     ...oldQueryData,
    //     data: [...oldQueryData.data, data.data]
    //   }
    // })
    // }
    onMutate: async (newHero) => {
      await queryClient.cancelQueries('super-heroes')
      const previousHeroData = queryClient.getQueryData('super-hero')
      queryClient.setQueryData('super-heroes', (oldQueryData)=> {
        return{
          ...oldQueryData,
          data: [...oldQueryData.data, {id: oldQueryData?.data?.length + 1, ...newHero}]
        }
      })
      return {
        previousHeroData
      }
    }, 
    onError: (_error, _hero, context) => {
      queryClient.setQueryData('super-heroes', context.previousHeroData)
    },
    onSettled: () => {
      queryClient.invalidateQueries('super-heroes')
    }
  })

}