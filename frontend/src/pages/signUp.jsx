import React, { useContext } from "react";
import "../css/signUp.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DataContext from "../API/Context";
function Sign() {
  const navigate = useNavigate();
  const {msg,pwd,pwd1,name,setMsg,setName,setPwd,setPwd1}=useContext(DataContext);
  function onChanges(event) {
    if (event.target.name === "name") setName(event.target.value);
    else if (event.target.name === "pWd") setPwd(event.target.value);
    else if (event.target.name === "pWd1") setPwd1(event.target.value);
  }
  function saveCredentials(event) {
    event.preventDefault();
    if (pwd === pwd1 && pwd && pwd1 && name) {
      setMsg(true);
      console.log(pwd)
      const post = JSON.stringify({ name: name, pwd: pwd });
      axios
        .post("http://localhost:4000/admin", { post })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
      navigate("/admin");
    } else {
      setMsg(false);
    }
  }
  function reRoute() {
    navigate("/admin");
  }
  return (
    <div className="Auth-signUp">
      <form className="Auth-container-signUp" onSubmit={saveCredentials}>
        <h2>Enter Your username</h2>
        <input
          type="text"
          id="username"
          name="name"
          onChange={onChanges}
          value={name}
          placeholder="User-Name"
        />
        <h2>Enter the password</h2>
        <input
          type="password"
          className="password"
          onChange={onChanges}
          value={pwd}
          name="pWd"
          placeholder="Password"
        />
        <h2>Re-enter the password</h2>
        <input
          type="password"
          className="password"
          onChange={onChanges}
          value={pwd1}
          name="pWd1"
          placeholder="Please Re-enter the password"
        />
        {!msg && (
          <p>
            Passwords do not match or name is not entered. Please try again.
          </p>
        )}
        <button type="submit" className="signup">
          SignUp
        </button>
        <h2 id="login">Already signed up?</h2>
        <button type="submit" id="login" className="signup" onClick={reRoute}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Sign;
