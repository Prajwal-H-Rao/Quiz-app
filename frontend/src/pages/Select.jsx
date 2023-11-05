import axios from "axios";
import React, { useContext, useEffect } from "react";
import "../css/Select.css";
import { useNavigate } from "react-router-dom";
import DataContext from "../API/Context";
function Select() {
  const navigate = useNavigate();
  const {data,name,submit,setData,setName,setSubmit}=useContext(DataContext);
  function handleSubmit(event) {
    setSubmit(true);
    event.preventDefault();
  }
  function handleChange(event) {
    setData(event.target.value);
  }
  function handleChangeName(event) {
    setName(event.target.value);
  }
  useEffect(() => {
    if(submit){
    const pos = JSON.stringify({
      heading: name,
      body: data,
    });
    axios
      .post("http://localhost:4000/quizName", { pos })
      // .then(res=>console.log(res))
      .catch((err) => console.log(err));
      navigate("/startPage")
    }
  }, [name,data,submit,navigate]);
  return (
    <div className="selector-form">
      <form id="name-taker" name="quizName" onSubmit={handleSubmit}>
        <h1>Enter the Quiz Name</h1>
        <input
          name="name"
          placeholder="Enter the quiz name"
          value={data}
          onChange={handleChange}
        ></input>
        <input
          name="atName"
          id="name"
          placeholder="Enter your name"
          value={name}
          onChange={handleChangeName}
        ></input>
        <button id="submit">Start</button>
      </form>
    </div>
  );
}

export default Select;
