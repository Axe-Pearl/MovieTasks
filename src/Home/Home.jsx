import React, { useState, useContext, useEffect } from 'react';
import "./Home.css";
import Modal from '../Modal/Modal';
import Search from '../Search/Search';
import Filter from '../Filter/Filter';
import Cards from '../Cards/Cards';
import { Movie } from "../App";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Home() {
    const [Movies, ] = useContext(Movie);
    const [genres, setGenres] = useState([]);
    const [genreids, setGenreids] = useState([]);
    const [showModal, setshowModal] = useState(false);
    const [showFilters, setshowFilters] = useState(false);
    const [selectedID, setselectedID] = useState();
    const [query, setQuery] = useState("");
    const [vote, setVote] = useState(4500);
    
     useEffect(()=>{
      if(window.innerWidth > 900) setshowFilters(true);
      else setshowFilters(false);
    },[])
    const openFilters = ()=>{
       if(showFilters){
        let filters = document.querySelector(".filterContainer");
        filters.setAttribute("dragIn","");
        document.addEventListener("animationend",()=>{
          filters.removeAttribute("dragIn");
          setshowFilters(false);
        },
        {once:true})
       }
       else setshowFilters(true)
    }
  return (
    <div className = "homeContainer">

    {/* search section */}
    <div className='searchSection'>
      <FontAwesomeIcon className='menuButton' icon={faBars} onClick={openFilters} />
      <Search setQuery={setQuery}/>
    </div>

    {/* Filter and Cards (Main)*/}
    <div className='main'>
      {/* Filter Section */}
      <div className = "filterSection">
        {showFilters || window.innerWidth > 900 ?  <Filter genres={genres} setGenres = {setGenres} genreids = {genreids}  setGenreids = {setGenreids} vote = {vote} setVote = {setVote} /> : null}
      </div>
      {/* Cards Section */}
      <div className='cards'>
      {Movies.filter((Movie)=> Movie.title.toLowerCase().includes(query.toLowerCase()))
      .filter(Movie =>(Movie.genre_ids).some(val => genreids.includes(val) || genreids.length === 0))
      .filter(Movie => (Movie.vote_count) <= vote)
      .map((Movie, index)=> 
       <Cards Movie = {Movie} key = {index} index = {index} setselectedID = { setselectedID } setshowModal = { setshowModal } />)
      }
      </div>
      {/* Modal Viewer / Popup */}
      {showModal ? <Modal thisID = {selectedID} setshowModal = {setshowModal}/> : null }
    </div>
    </div>
  )
}

export default Home