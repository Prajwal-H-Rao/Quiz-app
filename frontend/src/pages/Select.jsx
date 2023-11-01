import axios from "axios";
import React, { useEffect } from "react";
import "../css/Select.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Select() {
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [name, setName] = useState("");
  const [submit, setSubmit] = useState(false);
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
