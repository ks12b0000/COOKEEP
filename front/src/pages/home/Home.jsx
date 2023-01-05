import { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/layout/header/Header";
import Main from "../../components/layout/home/Main";
import UserHttp from "../../http/userHttp";

const userHttp = new UserHttp();

function Home() {
    

    // // 로그인 여부 체크 (임시 위치)
    // useEffect(()=>{
    //     onCheck()
    // },[])
    //
    // const onCheck = async()=>{
    //     try {
    //         const res = await userHttp.getisLoggedIn();
    //         console.log(res);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    return (
        <>
            <Header />
            <Main />
        </>
    );
}

export default Home;
