import React,{useRef} from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { Slider } from '@mui/material';
import marks from './marks';
import categories from './categories';
import "./Filter.css";


function Filter({genres, setGenres, genreids, setGenreids, setVote}) {
   const checkRef = useRef(null);
   const handleGenres = (e)=>{
      const isChecked = e.target.checked;
      const thisGenre = e.target.value;
      const thisID = e.target.id;
      const gid = parseInt(thisID);
      if(isChecked && thisGenre!== "All") {
         categories.find(x => x.id === thisID).isChecked = true;
         setGenres([...genres, thisGenre]);
         setGenreids([...genreids, gid]);
      }
      else{
         categories.find(x => x.id === thisID).isChecked = false;
         setGenres(genres.filter((genre) => genre!== thisGenre));
         setGenreids(genreids.filter((genreid)=> genreid !== gid));
      }
  }
  const clearAll = ()=>{
      setGenres([]);
      setGenreids([]);
      categories.forEach(category => category.isChecked = false);
  }
  return (
    <div className='filterContainer'>
      <div className='selectedGenres'>
         {genres.map((genre, index) =>{
            return(
               <div className='selectedGenre' key = {index}>
                  {genre}
               </div>
            )
         })}
      </div>

      <div className='genresSelect'>
      <FormGroup><br/><br/>
      <div className='genreHead'>
         <h3>Genres</h3>
         <Button variant="contained" color="success" onClick = {clearAll}>Clear All</Button>
      </div>
      <FormControlLabel  control={<Checkbox key = "0" id = "0" value = "All" onChange = {handleGenres}  disabled = {genreids.length === 0} checked = {genreids.length === 0} />} label="All" />
      {categories.map((category) => { 
        const  {id, value, label, isChecked} = category;
       return(
         <FormControlLabel  key = {id} className ="checkBox" control={<Checkbox type="checkbox" ref = {checkRef} key ={category.key} id = {id} value = {value} onChange = {handleGenres}  checked = {isChecked} />} label = {label} />   
       )})}
      </FormGroup>
    </div>
    <div className='votes'><br/>
      <h4>Number of Votes</h4>
    <Box sx={{ width: 300 }}>
      <Slider
      defaultValue={4500}
      valueLabelDisplay="auto"
      step={10}
      marks={marks}
      min={0}
      max={4500}
      onChange = {(e)=> setVote(e.target.value)}
      sx={{
         width:"250px",
         color:"gray"
      }}
      />
      </Box>
    </div>
    </div>
  )
}

export default Filter