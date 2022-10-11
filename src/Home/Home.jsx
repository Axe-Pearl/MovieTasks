import React, { useState, useContext } from 'react';
import "./Home.css";
import Modal from '../Modal/Modal';
import { Movie } from "../App";
import Search from '../Search/Search';

function Home() {
    const [Movies, ] = useContext(Movie);
    const [showModal, setshowModal] = useState(false);
    const [selectedID, setselectedID] = useState();
  
    const [query, setQuery] = useState("");

    
    console.log("All Movies here:", Movies);

    const toggleOpen = (e)=>{
        let id = e.target.value;
        setselectedID(id);
        setshowModal(true);
    }
    
  return (
    <div style = {{display:"flex", flexDirection:"column", justifyContent:"center"}}>
    <div className='filterSection'>
      <Search setQuery={setQuery}/>
    </div>
    <div className='cards'>
      {Movies.filter((Movie)=> Movie.title.toLowerCase().includes(query))
      .map((Movie, index)=>{
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
    </div>
  )
}

export default Home