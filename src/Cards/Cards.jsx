import React from 'react'
import "./Cards.css";

function Cards({Movie, index, setselectedID, setshowModal}) {
    const toggleOpen = (e)=>{
        let id = e.target.value;
        setselectedID(id);
        setshowModal(true);
    }
  return (
    <div className='card' key={index}>
        <div className='container'>
            <img src= {`https://image.tmdb.org/t/p/original${Movie.backdrop_path}`} alt="" />
        </div>
        <div className='details'>
            <div className='leftCol'>
                <h3>{Movie.title}</h3>
                <p>{(Movie.release_date).slice(0, 4)}</p>
                <p><strong>Voted By: </strong>{Movie.vote_count}</p>
                <button className='btn' value={Movie.id} onClick={toggleOpen}>Learn More</button>
            </div>
        <div className='rightCol'>
            <span>⭐{Movie.vote_average}</span>
            <div className='ageLimit'>{Movie.adult ? <span>18+</span> : <span>13+</span>}</div> 
        </div>
        </div>                
    </div>
  )
}

export default Cards