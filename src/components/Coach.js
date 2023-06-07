import React, { useEffect, useState } from 'react'
import Seats from './Seats'
import '../CascadingStyleSheet/coach.css'
import Navigate from './Navigate';

const Coach = () => {
    // its for userInput like how much seats he required
    const[seats,setSeats] = useState();
    // here we have a vacant seats data
    const[data,setData] = useState(Array(80).fill(false));
    // here we have a vacant seats data row wise
    const[arr,setArr] = useState([7,7,7,7,7,7,7,7,7,7,7,3])
    // its use for when user put seats above 7 as input
    const[error,setError] = useState(false)
    // here we get detail like how much seats we have left
    const[leftSeats,setLeftSeats] = useState(80);

    
    function handleClick(){
        // its is use for hide error when user select below 7 seats after he got error
        setError(false)

        // for optimization for prevent needlessly running if user input seats is greater than available slot
        if(seats<=leftSeats){
        
        // here we check if any single row has reqired seats or not
        if(arr.some((item)=>{return item>=seats})){
        // here we get in which row seats are vacant continuosly which user want
        let vacantSlot = arr.find((item)=>{
            return seats<=item
        })
        // here get row number
        let row = arr.indexOf(vacantSlot);
        let cloneArray = [...arr];
        cloneArray[row] = cloneArray[row]-seats; 
        let coachSeatsData = [...data];
        let ends = 0;
        if(row===11){
        ends = (row*7)+ +seats;  
        }else{
        ends = 7*(row+1)-cloneArray[row];
    }
        for(let i = row*7; i<ends; i++){
            coachSeatsData[i] = true;
        }
        setData(coachSeatsData)
        setArr(cloneArray);
    }
    // when single rows has not required seats
    else{
        // i is increment when it finds value false means vacant seat
        let i = 0;
        // j is for indexing actually
        let j = 0;
        let coachSeatsData2 = [...data];
        let arr3 = [...arr];
        while(i<seats){
            if(coachSeatsData2[j]===false){
                coachSeatsData2[j] = true;
                let index = Math.floor(j/7)
                arr3[index] = arr3[index]-1;  
                i++;     
            }
        j++;
    }
    setArr(arr3);
    setData(coachSeatsData2)
    }
  }
  setSeats("");        
}

    useEffect(()=>{
        let total = arr.reduce((acc,item)=>acc+item)
        setLeftSeats(total);
    },[arr]);

        

  return (
    <>
    <Navigate/>
        {error===true?<h2 className='error' style={{color:"red"}}>You can only select 7 seats at once</h2>:null}
        <div className='userInput'>
            <span className='leftSeats'>{leftSeats} Seats Left</span>
                <input type='number' placeholder='Number of seats' value={seats} className='seatsNumber' onChange={(e)=>{e.target.value<=7?setSeats(e.target.value):setError(true)}}></input>
                <button className='btnBook' onClick={handleClick}>Book</button>
               
        </div>
        <div className='coach'>
        {
            data.map((item,index)=>{
                return <Seats seatNo = {index+1} book = {item}/>
            })
        }
        </div>
        <div className='bookedSeats'>
            <h2>Your Booked Seats</h2>
        <div className='bookTicket'>
            {data.map((item,index)=>{
                if(item===true){
                    return <div className='booked'>{index+1}</div>;
                }
            })}
            </div>
        </div>
    </>
  )
}

export default Coach