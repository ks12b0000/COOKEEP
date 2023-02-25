import "./App.css";

import { Routes, Route } from "react-router";
import { useSelector } from "react-redux";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import MyPage from "./pages/myPage/MyPage";
import SignUp from "./pages/signUp/SignUp";
import Japanese from "./pages/category/japanese/Japanese";
import PrivateRoute from "./until/PrivateRoute";
import KaKaoLogin from "./pages/login/KakaoLogin";
import GoogleLogin from "./pages/login/GoogleLogin";
import NaverLogin from "./pages/login/NaverLogin";
import Detail from "./components/categoryLayout/detail/Detail";
import Chinese from "./pages/category/ chinese/ Chinese";
import Western from "./pages/category/ western/ Western";
import Diet from "./pages/category/ diet/Diet";
import Etc from "./pages/category/etc/Etc";
import Vegan from "./pages/category/vegan/Vegan";
import Edit from "./components/categoryLayout/edit/Edit";
import Korean from "./pages/category/korean/Korean";
import Writing from "./components/categoryLayout/writing/Writing";
import MyPosts from "./pages/myPage/MyPosts";
import MyLikes from "./pages/myPage/MyLikes";

function App() {
    const user = useSelector((state) => state);

    return (
        <>
            {/*라우터관리*/}
            <Routes>
                    <Route element={<PrivateRoute />}>
                        <Route path="/mypage/:userId" element={<MyPage />}></Route>
                        <Route path="/myposts/:userId" element={<MyPosts />}></Route>
                        <Route path="/mylikes/:userId" element={<MyLikes />}></Route>

                    </Route>
                    {/*카테고리*/}
                    <Route path=":category/writing" element={<Writing />}></Route>
                    <Route path="/korea/*" element={<Korean/>}></Route>
                    <Route path="/western" element={<Western />}></Route>
                    <Route path="/chinese" element={<Chinese />}></Route>
                    <Route path="/japanese" element={<Japanese />}></Route>
                    <Route path="/diet" element={<Diet />}></Route>
                    <Route path="/vegan" element={<Vegan />}></Route>
                    <Route path="/etc" element={<Etc />}></Route>


                    <Route path="/category/:id" element={<Detail />} />
                    <Route path="/:id/edit" element={<Edit />} />

                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/callback/kakao" element={<KaKaoLogin />}></Route>
                    <Route path="/callback/google" element={<GoogleLogin />}></Route>
                    <Route path="/callback/naver" element={<NaverLogin />}></Route>
                    <Route path="/sign" element={<SignUp />}></Route>
                    <Route path="/" element={<Home />}></Route>
            </Routes>
        </>
    );
}

export default App;
