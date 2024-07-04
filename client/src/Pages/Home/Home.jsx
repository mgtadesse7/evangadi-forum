import { useContext, useEffect, useState } from "react";
import { AppState } from "../../App";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import classes from "./home.module.css";
import profPic from "../../assets/images/icons8-user-profile-48.png"

function Home() {
  const navigate = useNavigate();
  const { user } = useContext(AppState);
  const token = localStorage.getItem("token");
  const [values, setValues] = useState([]);

  useEffect(() => {
    axios
      .get("questions/all-questions", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setValues(res.data);
        console.log(res.data);
      })

      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [setValues]);
  console.log(user.username);

  function Detail(questionid) {
    navigate(`/${questionid}`);
  }

  function AskQ() {
    navigate("/askquestions");
  }

  return (
    <section className={classes.home_section}>
      <div className={classes.home_container}>
        <button className={classes.ask_question_button} onClick={() => AskQ()}>
          Ask Question
        </button>
        <h2 className={classes.welcome_message} >Welcome, {user.username}</h2>
      </div>
      <div className={classes.question_section}>
        <h2>Questions</h2>
        <hr />
        <div>
          {values.map((value, i) => {
            return (
            <div key={i}>
              <div onClick={() => Detail(value.questionid)}>
                <div className={classes.icon_username_container}>
                  <div className={classes.icon_container}>
                    <img src={profPic} alt="" />
                  </div>
                  <span className={classes.question_username}>{value?.username}</span>
                </div>
                <span className={classes.question_title}>{value?.title}</span>
              </div>
        </div>
          );
        })}
      </div>
      </div>
    </section>
  );
}

export default Home;

// import {useContext, useEffect,useState} from 'react'
// import { AppState }from '../../App';
// import axios from '../../axiosConfig';
// // import classes from"./css/App.module.css"
// function Home() {
//  const { user } =  useContext(AppState)
//    const token = localStorage.getItem('token');
//    const [values,setValues]=useState([])
//    useEffect(()=>{
// axios.get("/questions/all-questions/",{
//   headers: {
//     Authorization: 'Bearer ' + token,
// }}
// )
// .then((res)=>{
//   setValues(res.data)
//   console.log(res.data);

// })

// .catch(
//   (err)=>{
//       console.log(err)
//       setIsLoading(false)
//   })
//    },[])

//   return (
//     <div>

//     <div>
//     <h1>Home</h1>
//       <br />
//       <br/>
//       <br/>
//       <br/>
//       <h2>wellcom :{user.username}</h2>
//     </div>
//     <div>
// {values.map((value,i)=>{
//   <div>
//     { value.username}
//     {value.title}
//   </div>
// }

// )}

//     </div>
//       </div>
//   )
// }
// export default Home
