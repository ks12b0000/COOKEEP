import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import MyPage from "./pages/myPage/MyPage";
import SignUp from "./pages/signUp/SignUp";
import Category1 from "./pages/category1/Category1";
import Category2 from "./pages/category2/Category2";
import Detail from "./pages/detail/Detail";

function App() {
    return (
        <>
            {/*라우터관리*/}
            <Routes>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/myPage" element={<MyPage />}></Route>
                <Route path="/sign" element={<SignUp />}></Route>
                <Route path="/" element={<Home />}></Route>
                {/*    네비바  */}
                <Route path="/category1" element={<Category1 />}></Route>
                <Route path="/category2" element={<Category2 />}></Route>
                {/*    상세페이지*/}
                <Route path="/category1/:id" element={<Detail />}></Route>
            </Routes>
        </>
    );
}

export default App;
