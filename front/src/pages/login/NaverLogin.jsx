import { useEffect } from "react";
import UserHttp from "../../http/userHttp";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/reducer/userSlice";
import { useNavigate } from "react-router";

const NaverLogin = () => {
    const code = new URL(window.location.href).searchParams.get("code");
    const state = new URL(window.location.href).searchParams.get("state");
    const userHttp = new UserHttp();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(code, state);
        onNaverLogin();
    }, []);

    const onNaverLogin = async () => {
        try {
            const res = await userHttp.getNaverLogin(code, state);
            console.log(res);

            if (res.data.code === 1000) {
                //리덕스 userReducer에 값을 넣어줌
                dispatch(
                    loginUser({
                        userId: res.data.result.id,
                        isLoggedIn: true
                    })
                );

                //홈 화면으로 이동
                navigate("/");
            }
        } catch (err) {
            console.log(err);
            alert("로그인에 실패하셨습니다.");
            navigate("/login");
        }
    };

    return (
        <PageWrap>
            <PageTitle>로그인이 진행 중 입니다</PageTitle>
            <PageText>페이지를 새로고침하지 마세요</PageText>
        </PageWrap>
    );
};

const PageWrap = styled.div`
    width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
`;

const PageTitle = styled.div`
    font-size: 43px;
    margin-bottom: 30px;
    color: #3c3c3c;
`;

const PageText = styled.div`
    font-size: 21px;
    color: #909090;
    margin-bottom: 60px;
`;

export default NaverLogin;
