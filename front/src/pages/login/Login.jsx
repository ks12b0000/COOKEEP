import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/reducer/userSlice";
import styled from "@emotion/styled";
import Header from "../../components/layout/header/Header";
import UserHttp from "../../http/userHttp";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const userHttp = new UserHttp();

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState("");
    const [AutoLogin, setAutoLogin] = useState(false);

    const onLogin = async (e) => {
        e.preventDefault();

        if (!(UserName && Password)) {
            alert("모든 값을 채워주세요.");
        } else {
            try {
                const {res} = await userHttp.postLogin({
                    username: UserName,
                    password: Password,
                    autoLogin: AutoLogin,
                })
                console.log(res);

                //로그인 성공 시 토큰을 쿠키에 담아줌
                if (res.data.code === 1000) {
                    cookies.set("accesstoken", res.headers.accesstoken, { path: "/" });
                    cookies.set("refreshtoken", res.headers.refreshtoken, { path: "/" });

                //리덕스 userReducer에 값을 넣어줌
                    dispatch(
                        loginUser({
                            userId: res.data.result.id,
                            isLoggedIn: true,
                        })
                    );

                    //홈 화면으로 이동
                    navigate("/");
                }
            } catch (err) {
                console.log(err);
            }
        }

        setUserName("");
        setPassword("");
        setAutoLogin(false);
    };

    return (
        <>
            <Header />
            <LoginBackground>
                <LoginWrap>
                    <LoginTitle>Welcome to our project !</LoginTitle>
                    <LoginInput value={UserName} type="id" placeholder="id" onChange={(e) => setUserName(e.currentTarget.value)} />
                    <LoginInput value={Password} type="password" placeholder="password" onChange={(e) => setPassword(e.currentTarget.value)} />
                    <CheckBoxWrap>
                        <input value={AutoLogin} type="checkbox" onChange={(e) => setAutoLogin(e.currentTarget.checked)} checked={AutoLogin} />
                        <div>자동 로그인</div>
                    </CheckBoxWrap>
                    <LoginButton onClick={(e) => onLogin(e)}>로그인</LoginButton>
                    <LinkWrap>
                        <LinkStyled to={"/"}>아이디 찾기</LinkStyled>|<LinkStyled to={"/"}>비밀번호 찾기</LinkStyled>|<LinkStyled to={"/sign"}>회원가입</LinkStyled>
                    </LinkWrap>
                    <OtherLoginWrap>
                        <OtherLogin>
                            <img src="/image/naver.png" alt="naver-logo" />
                            <div>네이버로 시작하기</div>
                        </OtherLogin>
                        <OtherLogin>
                            <img src="/image/kakao.png" alt="kakao-logo" />
                            <div>카카오로 시작하기</div>
                        </OtherLogin>
                        <OtherLogin>
                            <img src="/image/google.png" alt="google-logo" />
                            <div>구글로 시작하기</div>
                        </OtherLogin>
                    </OtherLoginWrap>
                </LoginWrap>
            </LoginBackground>
        </>
    );
}

const LoginBackground = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #f2f2f2;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
`;

const LoginWrap = styled.div`
    width: 600px;
    height: 630px;
    background-color: white;
    border-radius: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const LoginTitle = styled.div`
    color: #35c5f0;
    font-size: 35px;
    margin-bottom: 30px;
`;

const LoginInput = styled.input`
    width: 380px;
    height: 45px;
    border: none;
    border-bottom: 1.5px solid #cecece;
    margin-bottom: 20px;
    outline: none;
    font-size: 18px;
    font-weight: 300;
    letter-spacing: 2px;
    color: #545454;
    ::placeholder {
        font-size: 18px;
        font-weight: 300;
        letter-spacing: 2px;
        color: #aaaaaa;
    }
`;

const LoginButton = styled.button`
    width: 380px;
    height: 55px;
    background-color: #35c5f0;
    border: none;
    border-radius: 10px;
    color: white;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 3px;
    margin-top: 10px;
    cursor: pointer;
`;

const CheckBoxWrap = styled.div`
    display: flex;
    width: 375px;
    margin: 5px 0 30px 0;
    input {
        width: 19px;
        height: 19px;
        border: 1px solid #a2a2a2;
    }
    div {
        font-size: 16px;
        margin-left: 10px;
        color: #909090;
        font-weight: 400;
    }
`;

const LinkWrap = styled.div`
    display: flex;
    color: #525252;
    justify-content: space-between;
    width: 375px;
    font-weight: 300;
    margin-top: 25px;
`;

const LinkStyled = styled(Link)`
    color: #454545;
    font-size: 16px;
    font-weight: 300;
    cursor: pointer;
    transition: 0.2s;
    :hover {
        color: #35c5f0;
    }
`;

const OtherLoginWrap = styled.div`
    display: flex;
    width: 375px;
    justify-content: space-between;
    margin-top: 50px;
`;
const OtherLogin = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        cursor: pointer;
    }
    div {
        text-align: center;
        margin-top: 20px;
        color: #454545;
        font-weight: 400;
    }
`;

export default Login;
