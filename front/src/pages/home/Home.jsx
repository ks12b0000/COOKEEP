import { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/layout/header/Header";
import Main from "../../components/layout/main/Main";
import { useSelector } from "react-redux";

function Home() {

    const user = useSelector( state => state )

    useEffect(() => {

        console.log(user);

    },[])

    return (
        <>
            <Header />
            <Main />
        </>
    );
}

export default Home;
