import { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/layout/header/Header";
import Main from "../../components/layout/main/Main";

function Home() {


    return (
        <>
            <Header />
            <Main />
        </>
    );
}

export default Home;
