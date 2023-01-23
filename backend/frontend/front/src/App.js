import "./App.css";

import { Routes, Route } from "react-router";
import { useSelector } from "react-redux";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import MyPage from "./pages/myPage/MyPage";
import SignUp from "./pages/signUp/SignUp";
import Category2 from "./pages/category2/Category2";
import CategoryRouter from "./router/category1/CategoryRouter";
import PrivateRoute from "./until/PrivateRoute";
import KaKaoLogin from "./pages/login/KakaoLogin";
import GoogleLogin from "./pages/login/GoogleLogin";
import NaverLogin from "./pages/login/NaverLogin";
import Layout from "./components/layout/Layout";

function App() {
    const user = useSelector((state) => state);

    return (
        <>
            {/*라우터관리*/}
            <Routes>
                <Route element={<Layout />}>
                    <Route element={<PrivateRoute />}>
                        <Route path="/myPage/:userId" element={<MyPage />}></Route>
                        <Route path="/category2" element={<Category2 />}></Route>
                    </Route>
                    <Route path="/category1/*" element={<CategoryRouter />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/callback/kakao" element={<KaKaoLogin />}></Route>
                    <Route path="/callback/google" element={<GoogleLogin />}></Route>
                    <Route path="/callback/naver" element={<NaverLogin />}></Route>
                    <Route path="/sign" element={<SignUp />}></Route>
                    <Route path="/" element={<Home />}></Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;
