import { createContext, useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [view, setView] = useState(false);
  const [qList, setqList] = useState([]);
  const [Quiz, setQuiz] = useState("");

  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");

  const [slist, setSlist] = useState([]);
  const [stats, setStats] = useState([0, 0, 0]);

  const [s, setS] = useState(false);
  const [qdata, setQdata] = useState([]);
  const [score, setScore] = useState(0);
  const [pg, setPg] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState("");
  const [submit, setSubmit] = useState(false);

  const [msg, setMsg] = useState(true);
  const [pwd1, setPwd1] = useState("");

  const [obj, setObj] = useState({ topic: "", qns: [] });
  const [qn, setQn] = useState({ qn: "", opt: [], ans: "" });
  const [cur, setCur] = useState("");
  return (
    <DataContext.Provider
      value={{
        obj,
        qn,
        cur,
        setObj,
        setQn,
        setCur,
        msg,
        pwd1,
        setMsg,
        setPwd1,
        data,
        submit,
        setData,
        setSubmit,
        s,
        qdata,
        score,
        pg,
        isLoading,
        setS,
        setQdata,
        setScore,
        setPg,
        setIsLoading,
        slist,
        stats,
        setSlist,
        setStats,
        show,
        name,
        pwd,
        setShow,
        setName,
        setPwd,
        view,
        qList,
        Quiz,
        setView,
        setqList,
        setQuiz,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
