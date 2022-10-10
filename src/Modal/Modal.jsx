import { React, useEffect, useState } from 'react';
import  ReactDOM  from 'react-dom';
import Loader from '../Loader/Loader';
import Error from '../ErrorPage/Error';
import "./Modal.css";

function Modal({thisID, setshowModal}) {
  const [selectedMovie, setSelectedMovie] = useState({});
  const [isError, setisError] = useState(false);

  useEffect(()=>{
     const url = `https://movie-task.vercel.app/api/movie?movieId=${thisID}`;
     const getmovieApi = async()=>{
        try{
            const response = await fetch(url);
            const apiData = await response.json();
            console.log("apiData from Modal Component: ", apiData);
            setSelectedMovie(apiData.data);
        }
        catch(err){
            console.log("Error: ", err);
            setisError(true);
        }
     }
     getmovieApi();
  },[thisID])
  const size = Object.keys(selectedMovie).length;
  console.log("Selected Movie: ", selectedMovie);
  
  // we will render the modal.jsx in the portal div
  return ReactDOM.createPortal(
    <div className='ModalViewer'>
      {size === 0 && !isError ?  <Loader /> :<>
      <div className='modalContainer'>
      {isError ? <Error /> : <>
      <div className='imgContainer'>
        <img src={`https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`} alt="" /> 
      </div>
      <div className='movieDetails'>

        {/* title and tagline */}
        <div className='movieBasics'>
        <h2>{selectedMovie.title}</h2>
        {selectedMovie.tagline.length !==0 ? <span className='tagline'> "{selectedMovie.tagline}"</span> : ""}
        </div>

         {/* description / overview */}
        <div Classname="overview"><br/><h3>Overview</h3>
        <p>{selectedMovie.overview}</p>
        </div>
        
        {/* more details */}
        <div className='moredetails'><br/>
        <span><strong>Rating:</strong> {selectedMovie.vote_average} stars</span><br/>
        <span><strong>Voted by:</strong> {selectedMovie.vote_count}</span><br/>
        <span><strong>Release Date:</strong> {selectedMovie.release_date}</span><br/>
        <span><strong>Status:</strong> {selectedMovie.status}</span><br/>
        <span><strong>Budget :</strong> ${selectedMovie.budget}</span><br/>
        <span><strong>Box Office Collection:</strong> ${selectedMovie.revenue}</span><br/>

        </div>

        {/* age Restriction */}
        <div><strong>Age Restriction: </strong>{selectedMovie.adult ? <span className='ageLimit'>18+</span> : <span className='ageLimit'>13+</span>}</div>
      </div>
      </> }

      {/* close popup */}
      <div className='btn-container'>
      <button className='closeBox' onClick={() => setshowModal(false)}>X</button>
      </div>

      </div>
      </>
      }
    </div>,
    document.getElementById("portal")
  );
}

export default Modal