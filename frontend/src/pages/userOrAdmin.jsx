import React from "react";
import {useNavigate} from 'react-router-dom'
import "../css/userOrAdmin.css";
function UserOrAdmin() {
    const navigate = useNavigate()
    function sendToStudent(){  
        navigate("/quizName")
    }
    function sendToAuthenticate(){
        navigate("/signup")
    }
  return (
    <div className="user-page">
      <div className="user-page-container">
        <h1>What do you want to do ?</h1>
        <div className="button-container">
          <button id="student" onClick={sendToStudent}>Attend Quiz</button>
          <button id="professor" onClick={sendToAuthenticate}>Create Quiz</button>
        </div>
      </div>
    </div>
  );
}

export default UserOrAdmin;
