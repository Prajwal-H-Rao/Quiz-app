import React, { useContext, useEffect } from "react";
import "../css/admin.css";
import axios from "axios";
import DataContext from "../API/Context";
function QuizInfo(props) {
  const {slist,stats,setSlist,setStats} = useContext(DataContext);
  function handleDelete() {
    const ans = prompt("Do ypu really want to delete the quiz? yes:no").toLowerCase();
    if (ans === "yes") {
      axios
        .delete(`http://localhost:4000/quizInfo/${props.quiz}`)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    }
  }
  useEffect(() => {
    const pos = JSON.stringify({ name: props.quiz });
    axios
      .post("http://localhost:4000/quizInfo", { pos })
      .then((res) => {
        setSlist(res.data.list);
        setStats(res.data.stats);
      })
      .catch((err) => console.log(err));
  }, [props, setSlist, setStats]);
  return (
    <div className="quiz-container-expanded">
      <button onClick={props.hide} id="close">
        X
      </button>
      <div className="stats">
        <h1 className="bst">Best: {stats.max}</h1>
        <h1 className="wst">Worst: {stats.min}</h1>
        <h1 className="avg">Average: {stats.avg}</h1>
      </div>
      <div className="topper-sub-container">
        <h1 className="topic">Topic: {props.quiz}</h1>
        <h1 className="top">Top performers:</h1>
        <ol className="toppers">
          {slist.map((item, key) => {
            if (key < 10) {
              return <li key={key}>{item.name}</li>;
            }
            return null;
          })}
        </ol>
      </div>
      <button onClick={handleDelete} id="delete">
        Delete
      </button>
    </div>
  );
}

export default QuizInfo;
