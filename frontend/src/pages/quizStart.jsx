import React, { useContext, useEffect} from "react";
import "../css/quizStart.css"; 
import Results from './Results'
import axios from "axios";
import DataContext from "../API/Context";
// import { useNavigate } from "react-router-dom";
function QuizStart() {
  const {s,qdata,name,score,pg,isLoading,setS,setQdata,setName,setIsLoading,setScore,setPg}=useContext(DataContext)  
  useEffect(() => {
    axios
      .get("http://localhost:4000/startPage")
      .then((response) => {
        setQdata(response.data.Qqns);
        setName(response.data.name);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setIsLoading,setName,setQdata]);

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
