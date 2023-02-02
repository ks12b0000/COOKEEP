import "./App.css";

import { Routes, Route } from "react-router";
import { useSelector } from "react-redux";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import MyPage from "./pages/myPage/MyPage";
import SignUp from "./pages/signUp/SignUp";
import Japanese from "./pages/category/japanese/Japanese";
import CategoryRouter from "./router/category1/CategoryRouter";
import PrivateRoute from "./until/PrivateRoute";
import KaKaoLogin from "./pages/login/KakaoLogin";
import GoogleLogin from "./pages/login/GoogleLogin";
import NaverLogin from "./pages/login/NaverLogin";
import Layout from "./components/layout/Layout";
import Detail from "./components/categoryLayout/detail/Detail";
import Chinese from "./pages/category/ chinese/ Chinese";
import Western from "./pages/category/ western/ Western";
import Diet from "./pages/category/ diet/Diet";
import Etc from "./pages/category/etc/Etc";
import Vegan from "./pages/category/vegan/Vegan";
import Edit from "./components/categoryLayout/edit/Edit";

function App() {
    const user = useSelector((state) => state);

    return (
        <>
            {/*라우터관리*/}
            <Routes>
                    <Route element={<PrivateRoute />}>
                        <Route path="/myPage/:userId" element={<MyPage />}></Route>

                    </Route>
                    {/*카테고리*/}
                    <Route path="/category1/*" element={<CategoryRouter/>}></Route>
                    <Route path="/category2" element={<Western />}></Route>
                    <Route path="/category3" element={<Chinese />}></Route>
                    <Route path="/category4" element={<Japanese />}></Route>
                    <Route path="/category5" element={<Diet />}></Route>
                    <Route path="/category6" element={<Vegan />}></Route>
                    <Route path="/category7" element={<Etc />}></Route>


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
