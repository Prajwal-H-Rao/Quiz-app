import React, { useEffect, useState } from "react";
import "../css/quizStart.css"; 
import Results from './Results'
import axios from "axios";
// import { useNavigate } from "react-router-dom";
function QuizStart() {
  // const navigate = useNavigate()
  const [s, setS] = useState(false);
  const [qdata, setData] = useState([]);
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
  const [pg, setPg] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:4000/startPage")
      .then((response) => {
        setData(response.data.Qqns);
        setName(response.data.name);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function scores(ev) {
    if (ev.target.innerHTML === qdata.questions[pg].ans) {
      setScore(score + 1);
    }
  }
  function changeScore(event) {
    if (pg + 1 < qdata.questions.length) {
      scores(event);
      setPg(pg + 1);
    } else if (pg + 1 === qdata.questions.length) {
      setIsLoading(true);
      setS(true);
      scores(event);
    }
  }
  if (s) {
    return <Results name={name} score={score} topic={qdata.topic}/>
  }
  else if (isLoading) {
    return <h1>Loading.....</h1>;
  }
  return (
    <div className="quizStart">
      <div className="quiz-container">
        <h1>{qdata.questions[pg].qn}</h1>
        <div className="option-container">
          <div className="opt opt1" onClick={changeScore}>
            {qdata.questions[pg].opt[0]}
          </div>
          <div className="opt opt2" onClick={changeScore}>
            {qdata.questions[pg].opt[1]}
          </div>
          <div className="opt opt3" onClick={changeScore}>
            {qdata.questions[pg].opt[2]}
          </div>
          <div className="opt opt4" onClick={changeScore}>
            {qdata.questions[pg].opt[3]}
          </div>
        </div>
      </div>
    </div>
  );
}
export default QuizStart;
