import Navbar from '../components/navbar'
import Footer from '../components/footer'
import Card from '../components/card'
import QuizInfo from '../pages/quizInfo'
import '../css/admin.css'
import axios from 'axios'
import {useEffect, useState } from 'react'
function Admin(props) {
  const [view,setView]=useState(false)
  const [qList,setqList]=useState([])
  const [Quiz,setQuiz]=useState("")
  
  function hideQuiz(){
    setView(false)
  }
  
  useEffect(()=>{
    sessionStorage.setItem("log",true)
    axios.get("http://localhost:4000/admin").then(res=>setqList(res.data.list)).catch(err=>console.log(err))
  },[])

  return (
    <div className='Admin-Page' id='hat'>
    <Navbar setIsAuth={props.setIsAuth}/>
    <div className='quiz-container-admin'>
        <div className='quiz-sub-container-admin'>
        {qList.map((item,i)=>{
          return <Card setView={setView} view={view} setQuiz={setQuiz} key={i} num={i} qName={item.topic}/>
        })
        }
        {view && <QuizInfo view={view} quiz={Quiz} hide={hideQuiz}/>}
        </div>
    </div>
    <Footer/>
    </div>
  )
}

export default Admin