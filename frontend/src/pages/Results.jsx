import React from 'react'
import '../css/results.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Results(props) {
  const navigate = useNavigate();
  function handleSub(){
    const pos = JSON.stringify({ topic:props.topic,name: props.name, score: props.score });
    axios
      .post("http://localhost:4000/store", {pos})
      .then((res) => {
        navigate("/")})
      .catch((err) => console.log(err));
  }
  return (
    <div className='result-container'>
      <div className='result-sub-container'>
        <h1>{props.name} you scored {props.score} in quiz on {props.topic}</h1>
        <button className='submit' onClick={handleSub}>Done</button>
      </div>
    </div>
  )
}

export default Results