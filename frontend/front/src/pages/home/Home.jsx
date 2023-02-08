import { useEffect } from "react";
import Main from "../../components/layout/home/Main";
import AuthHttp from "../../http/authHttp";
import {color} from "../../constants/color";
import Header from "../../components/layout/header/Header";
import Popularity from "../../components/layout/home/popularity/Popularity";
import Ranking from "../../components/layout/home/ranking/Ranking";
import Footer from "../../components/layout/footer/Footer";
const authHttp = new AuthHttp();

function Home() {
    //메인페이지에 layout컴포넌트가없는이유는 메인페이지 부분만 header달라서 분기처리를 해주었습니다.


    return (
        <>
            <Header />
            <Main />
            <Footer/>
        </>
    );
}

export default Home;
