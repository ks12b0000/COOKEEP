import "./App.css";
import { useEffect } from "react";
<<<<<<< HEAD
import { Routes, Route } from "react-router";
import { useSelector } from "react-redux";
=======
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

>>>>>>> c895c0ef131ad3c7e020e886707b505ecbb5cbed
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import MyPage from "./pages/myPage/MyPage";
import SignUp from "./pages/signUp/SignUp";
import Category1 from "./pages/category1/Category1";
import Category2 from "./pages/category2/Category2";
import Detail from "./components/category1/detail/Detail";
import Writing from "./components/category1/writing/Writing";
import CategoryRouter from "./router/category1/CategoryRouter";
<<<<<<< HEAD
import PrivateRoute from "./until/PrivateRoute";

function App() {
    const user = useSelector((state) => state);

    useEffect(() => {}, []);

=======
import KaKaoLogin from "./pages/login/KakaoLogin";
import UserHttp from "./http/userHttp";

function App() {
    const user = useSelector((state) => state);
    
>>>>>>> c895c0ef131ad3c7e020e886707b505ecbb5cbed
    return (
        <>
            {/*라우터관리*/}
            <Routes>
<<<<<<< HEAD
                <Route element={<PrivateRoute />}>
                    <Route path="/myPage" element={<MyPage />}></Route>
                    <Route path="/category2" element={<Category2 />}></Route>
                </Route>
                <Route path="/category1/*" element={<CategoryRouter />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/sign" element={<SignUp />}></Route>
                <Route path="/" element={<Home />}></Route>
                {/*    네비바  */}

=======
                <Route path="/login" element={<Login />}></Route>
                <Route path="/callback/kakao" element={<KaKaoLogin />}></Route>
                <Route path="/myPage" element={<MyPage />}></Route>
                <Route path="/sign" element={<SignUp />}></Route>
                <Route path="/" element={<Home />}></Route>
                {/*    네비바  */}
                <Route path="/category1/*" element={<CategoryRouter />}></Route>
                <Route path="/category2" element={<Category2 />}></Route>
>>>>>>> c895c0ef131ad3c7e020e886707b505ecbb5cbed
                {/*    상세페이지*/}
            </Routes>
        </>
    );
}

export default App;
