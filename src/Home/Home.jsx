import React, { useState, useEffect} from 'react';
import "./Home.css";
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import Error from '../ErrorPage/Error';

function Home() {
    const [Movies, setMovies] = useState([]);
    const [showModal, setshowModal] = useState(false);
    const [selectedID, setselectedID] = useState();
    const [isError, setisError]  = useState(false);
    const [error, setError] = useState("");
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
          setisError(true);
          setError(err);
          console.log("Error: ", err);
         }
       }
       getApi();
    },[]);
    console.log("All Movies here:", Movies);

    const toggleOpen = (e)=>{
        let id = e.target.value;
        setselectedID(id);
        setshowModal(true);
    }
    console.log("isError", isError);
  return (
    <div className='cards'>
      {isError === true ? <Error error = {error} />:
      Movies.length === 0 ? <Loader /> : 
         Movies.map((Movie, index)=>{
            return(
                <div className='card' key={index}>
                <div className='container'>
                    <img src= {`https://image.tmdb.org/t/p/original${Movie.backdrop_path}`} alt="" />
                </div>
                <div className='details'>
                    <div className='leftCol'>
                    <h3>{Movie.title}</h3>
                    <p>{(Movie.release_date).slice(0, 4)}</p>
                    <button className='btn' value={Movie.id} onClick={toggleOpen}>Learn More</button>
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
        {showModal ? <Modal thisID = {selectedID} setshowModal = {setshowModal}/> : null }
    </div>
  )
}

export default Home