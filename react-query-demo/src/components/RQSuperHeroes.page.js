import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {useSuperHeroesData, useAddSuperHeroData } from '../hooks/useSuperHeroesData';


const RQSuperHeroesPage = () => {
    // const[refetchInterval,setRefetchInterval] = useState(3000);
    const [Name, setName] = useState('')
    const [F_Name, setFatherName] = useState('')
    const onSuccess=(data)=>{
        // if(data.data.length===4){
        // return setRefetchInterval(false)
        // }
        // else{
        //     return refetchInterval;
        //     }
        console.log("perform side-effect after data fetching",data)
    }
    const onError=(error)=>{
        console.log("perform side-effect after encountering error",error)
        // if(error){
        //     return setRefetchInterval(false)
        // }
    }

  const { isLoading, data, isError, error, isFetching, refetch } = useSuperHeroesData(onSuccess, onError)
  const { mutate: addHero, isLoading: loading, isError: ifError, error: err } = useAddSuperHeroData();
  const handleAddHeroClick = () => {
    console.log({Name, F_Name});
    const hero = {Name, F_Name};
    addHero(hero);
  }
  console.log({ isLoading, isFetching });

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }
  

  return (
    <>
      <h2>RQ Super Heroes</h2>
      <div>
        <input
          type='text'
          value={Name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='text'
          value={F_Name}
          onChange={(e) => setFatherName(e.target.value)}
        />
      </div>
      <button onClick={handleAddHeroClick}>Add Hero</button>
      {data?.data.map((hero, index) => {
        return <div key={hero.id}><Link to={`/rq-super-heroes/${hero.id}`}>{hero.Name}</Link></div>;
      })}
        {/* {
            data.map((heroName) => {
                return <div key={heroName}>{heroName}</div>
            })
        } */}
      <button onClick={refetch}>Fetch Heroes</button>
    </>
  );
};

export default RQSuperHeroesPage;
