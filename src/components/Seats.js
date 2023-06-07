import React from 'react'
import '../CascadingStyleSheet/seats.css'

const Seats = ({seatNo,book}) => {
  return (
        <div className='Seat' style={book===true?{backgroundColor:"#2ecc71",color:"white"}:null}>{seatNo}</div> 
  )
}

export default Seats