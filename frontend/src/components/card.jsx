import React from "react";
import '../css/card.css'
function Card(prop) {
  function displayQuiz(){
    prop.setView(true)
    prop.setQuiz(prop.qName)
  }
  return (
    <div className="card">
      <div className="card-container" >
        <h3 className="Qn">Quiz-No: {prop.num+1}</h3>
        <h3 className="tP">Topic: {prop.qName}</h3>
        <button id="expander" onClick={displayQuiz}>Info...</button>
      </div>
    </div>
  );
}

export default Card;
