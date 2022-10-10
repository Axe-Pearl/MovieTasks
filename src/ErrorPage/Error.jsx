import React from 'react'
import "./Error.css";

function Error() {
  return (
    <div className='ErrorContainer'>
        <img src="../Images/Error.jpg" alt="error" />
        <h2>⚠️Failed to Connect with API </h2>
    </div>
  )
}

export default Error