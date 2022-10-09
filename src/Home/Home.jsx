import React, { useState, useEffect} from 'react';
import "./Home.css";

function Home() {
    const [Movies, setMovies] = useState([]);
    const url = "https://movie-task.vercel.app/api/popular?page=1";
    useEffect(()=>{
       const getApi = async ()=>{
         try{
           const response = await fetch(url);
           const apiData = await response.json();
           const moviesData = apiData.data.results;
           console.log("apiData: ", apiData);
           setMovies(moviesData);
         }
         catch(err){
           console.log("Error: ", err);
         }
       }
       getApi();
    },[]);
    console.log("All Movies here:", Movies);
  return (
    <div className='cards'>
        { Movies.map((Movie)=>{
            return(
                <div className='card'>
                <div className='container'>
                    <img src= {`https://image.tmdb.org/t/p/original${Movie.backdrop_path}`} alt="" />
                </div>
                <div className='details'>
                    <div className='leftCol'>
                    <h3>{Movie.title}</h3>
                    <p>{(Movie.release_date).slice(0, 4)}</p>
                    <button className='btn'>Learn More</button>
                    </div>
                    <div className='rightCol'>
                       <span>⭐{Movie.vote_average}</span>
                       <div className='ageLimit'>{Movie.adult ? <span>18+</span> : <span>13+</span>}</div> 
                    </div>
                </div>
            </div>
            )
        })
       
        }
    </div>
  )
}

export default Home