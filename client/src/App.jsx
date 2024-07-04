// import './App.css'
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { createContext, useEffect, useState } from "react";
import axios from "./axios";
import PostQuestion from "./Pages/PostQuestion/PostQuestion";
import Answer from "./Pages/AnswerPage/Answer"
import LayOut from "./Components/Layout/Layout";
import LeftSideLogin from "./Pages/LeftSideLogin/LeftSideLogin";
export const AppState = createContext();
function App() {
  const [user, setUser] = useState({});

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  async function checkUser() {
    try {
      const { data } = await axios.get("/users/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUser(data);
    } catch (error) {
      console.log(error.response);
      navigate("/login");
    }
  }

  useEffect(() => {
    checkUser();
  }, [navigate]);

  console.log(user.username);
  return (
    <AppState.Provider value={{ user, setUser }}>
      <LayOut>
        <Routes>
        <Route path="/login" element={<LeftSideLogin />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
        <Route path="/askquestions" element={<PostQuestion />} />
        <Route path='/:questionid' element={<Answer />} />
      </Routes>
      </LayOut>
    </AppState.Provider>
  );
}

export default App;
