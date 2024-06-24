import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home.jsx";
import Login from "./Pages/Login/Login.jsx";
import { useEffect, useState, createContext, useCallback } from "react";
import axios from "./axiosConfig.js";
import AskQuestion from "./Pages/Question/AskQuestion.jsx";
import Answer from "./Pages/Answer/Answer.jsx";
import LandingPage from "./Pages/LandingPage/LandingPage.jsx";

export const AppState = createContext();

function App() {
    const [user, setUser] = useState({});
    const [toggle, setToggle] = useState(true);
    const navigate = useNavigate();

    async function handleToggle(e) {
        e.preventDefault();
        setToggle(!toggle);
    }

    function Logout() {
        localStorage.removeItem("token");
        navigate("/");
    }

    const token = localStorage.getItem("token");
    const currentPath = window.location.pathname;

    const checkUser = useCallback(async () => {
        if (currentPath === "/") {
            return;
        }
        try {
            const { data } = await axios.get("/users/check", {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            setUser(data);
        } catch (error) {
            console.log(error?.response);
            navigate("/login");
        }
    }, [token, currentPath, navigate]);

    useEffect(() => {
        checkUser();
    }, [checkUser]);

    return (
        <AppState.Provider value={{ user, setUser, handleToggle, Logout }}>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/answers/:questionid" element={<Answer />} />
                <Route path="/askquestion" element={<AskQuestion />} />
                <Route path="/questions/:questionid" element={<Answer />} />
            </Routes>
        </AppState.Provider>
    );
}

export default App;
