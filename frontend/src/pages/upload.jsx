import "../css/upload.css";
import { useState } from "react";
import Footer from '../components/footer'
import Navbar from "../components/navbar";
import axios from "axios";
function Upload(props) {
  const [obj, setObj] = useState({ topic: "", qns: [] });
  const [qn, setQn] = useState({ qn: "", opt: [], ans: "" });
  const [cur, setCur] = useState("");
  const handleSubmit = (e) => {
    const post = JSON.stringify(obj);
    axios
      .post("http://localhost:4000/upload", { post })
      // .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
      setObj({ topic: "", qns: [] })
    e.preventDefault();
  };
  return (
    <div className="upload-div">
      <Navbar setIsAuth={props.setIsAuth}/>
      <div className="upload-container">
        <form id="post-qns" onSubmit={handleSubmit} name="newQuiz">
          <h2>What will be the title of the Quiz</h2>
          <input
            className="option"
            type="text"
            placeholder="Enter the quiz Title"
            onChange={(e) => setObj({ ...obj, topic: (e.target.value).toUpperCase() })}
            value={obj.topic}
            name="title"
          />
          <div className="uploader">
            <h2>Enter the Quiz Data</h2>
            <input
              className="option"
              type="text"
              name="qns"
              value={qn.qn}
              placeholder="Enter the Question"
              onChange={(e) => {
                setQn({ ...qn, qn: e.target.value });
              }}
            />
            <div className="option-contain">
              <input
                type="text"
                name="opt"
                value={cur}
                placeholder="Enter the options"
                onChange={(e) => setCur(e.target.value)}
              />
              <button
                className="next"
                type="button"
                onClick={() => {
                  setQn({ ...qn, opt: [...qn.opt, cur] });
                  setCur("");
                }}
              >
                Next
              </button>
            </div>
            <input
              className="option"
              type="text"
              name="answer"
              value={qn.ans}
              placeholder="Enter the qns answer"
              onChange={(e) => setQn({ ...qn, ans: e.target.value })}
            />
            <button
              className="create-copy"
              type="button"
              onClick={() => {
                setObj({ ...obj, qns: [...obj.qns, qn] });
                setQn({ qn: "", opt: [], ans: "" });
              }}
            >
              Next
            </button>
          </div>
          <button type="submit" className="create-op">
            Create
          </button>
        </form>
      </div>
      <Footer/>
    </div>
  );
}

export default Upload;
