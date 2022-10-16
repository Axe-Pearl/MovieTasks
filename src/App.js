import './App.css';
import { createContext, useEffect, useState } from 'react';
import Home from './Home/Home';
import Loader from './Loader/Loader';
import Error from './ErrorPage/Error';

export const Movie = createContext();
export const thisMovie = createContext();

function App() {
  const [Movies, setMovies] = useState([]);
  const [isError, setisError]  = useState(false);
  
  useEffect(()=>{
    const url = "https://movie-task.vercel.app/api/popular?page=1";
    const getApi = async ()=>{
      try{
        const response = await fetch(url);
        const apiData = await response.json();
        const moviesData = apiData.data.results;
        console.log("apiData: ", apiData);
        setMovies(moviesData);
      }
      catch(err){
       setisError(true);
       console.log("Error: ", err);
      }
    }
    getApi();
 },[]);
  return (
    <div className="App">
    <Movie.Provider value={[Movies, setMovies]}>
      {isError === true ? <Error />:
        Movies.length === 0 ? <Loader /> : 
        <Home />
      }
    </Movie.Provider>
    </div>
  );
}

export default App;
