import { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/layout/header/Header";
import Main from "../../components/layout/main/Main";
import AuthHttp from "../../http/authHttp";

const authHttp = new AuthHttp();

function Home() {
    // 로그인 여부 체크 (임시 위치)
    useEffect(() => {
        onCheck();
    }, []);

    const onCheck = async () => {
        try {
            const res = await authHttp.getIsLoggedIn();
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Main />
        </>
    );
}

export default Home;
