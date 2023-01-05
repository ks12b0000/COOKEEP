import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/reducer/userSlice";
import styled from "@emotion/styled";
import Header from "../../components/layout/header/Header";
import UserHttp from "../../http/userHttp";

const userHttp = new UserHttp();

function Login() {
    //카카오 로그인 요청 주소
    const KakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_KEY}&redirect_uri=https://localhost:3000/callback/kakao&response_type=code
    `;

    //구글 로그인 요청 주소
    const googleURL = `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=${process.env.REACT_APP_GOOGLE_REST_KEY}&redirect_uri=https://localhost:3000/callback/google&response_type=code&scope=email`;

    //네이버 로그인 요청 주소
    const state = Math.floor(new Date().getTime() + Math.random() * 1000);
    const NaverURL = `https://nid.naver.com/oauth2.0/authorize?client_id=${process.env.REACT_APP_NAVER_REST_KEY}&response_type=code&redirect_uri=https://localhost:3000/callback/naver&state=${state}`;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    //로그인 시 필요한 유저 정보
    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState("");
    const [AutoLogin, setAutoLogin] = useState(false);

    //모달창 관리
    const [FindId, setFindId] = useState(false);
    const [FindPassword, setFindPassword] = useState(false);

    //아이디 찾기를 위한 이메일 값
    const [EmailForFindId, setEmailForFindId] = useState("");

    //비밀번호 찾기를 위한 아이디 및 이메일 값
    const [UserNameForFindPassword, setUserNameForFindPassword] = useState("");
    const [EmailForFindPassword, setEmailForFindPassword] = useState("");

    //메일 발송 후 문구
    const [MailText, setMailText] = useState("");

    // 일반 로그인 동작 수행 함수
    const onLogin = async (e) => {
        e.preventDefault();

        const body = {
            username: UserName,
            password: Password,
            autoLogin: AutoLogin
        };

        if (!(UserName && Password)) {
            alert("모든 값을 채워주세요.");
        } else {
            try {
                const res = await userHttp.postLogin(body);
                console.log(res);

                if (res.data.code === 1000) {
                    //리덕스 userReducer에 값을 넣어줌
                    dispatch(
                        loginUser({
                            userId: res.data.result.id,
                            isLoggedIn: true,
                            isSocialLogin: false
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

    // 아이디 찾기 동작 실행 함수
    const onFindId = async (e) => {
        e.preventDefault();

        const body = {
            email: EmailForFindId
        };

        try {
            const res = await userHttp.postFindId(body);
            setMailText(res.data.message + " 이메일로 아이디를 확인하세요");
            console.log(res);
        } catch (err) {
            console.log(err);
            setMailText(err.response.data.message);
        }

        console.log(EmailForFindId);
        setTimeout(() => {
            setEmailForFindId("");
            setMailText("");
        }, 5000);
    };

    // 비밀번호 찾기 동작 실행 함수
    const onFindPassword = async (e) => {
        e.preventDefault();

        const body = {
            username: UserNameForFindPassword,
            email: EmailForFindPassword
        };

        try {
            const res = await userHttp.postFindPassword(body);
            setMailText(res.data.message + " 이메일로 비밀번호를 확인하세요");
            console.log(res);
        } catch (err) {
            console.log(err);
            setMailText(err.response.data.message);
        }

        setTimeout(() => {
            setUserNameForFindPassword("");
            setEmailForFindPassword("");
            setMailText("");
        }, 5000);
    };

    return (
        <>
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
                        <NonLink onClick={() => setFindId(true)}>아이디 찾기</NonLink>|<NonLink onClick={() => setFindPassword(true)}>비밀번호 찾기</NonLink>|
                        <LinkStyled to={"/sign"}>회원가입</LinkStyled>
                    </LinkWrap>
                    <OtherLoginWrap>
                        <a href={NaverURL}>
                            <OtherLogin>
                                <img src="/image/naver.png" alt="naver-logo" />
                                <div>네이버로 시작하기</div>
                            </OtherLogin>
                        </a>
                        <a href={KakaoURL}>
                            <OtherLogin>
                                <img src="/image/kakao.png" alt="kakao-logo" />
                                <div>카카오로 시작하기</div>
                            </OtherLogin>
                        </a>
                        <a href={googleURL}>
                            <OtherLogin>
                                <img src="/image/google.png" alt="google-logo" />
                                <div>구글로 시작하기</div>
                            </OtherLogin>
                        </a>
                    </OtherLoginWrap>
                </LoginWrap>
                {/* 아이디 찾기 모달창 */}
                {FindId ? (
                    <>
                        <ModalBackground />
                        <ModalWrap height="350px">
                            <ModalTitle>아이디 찾기</ModalTitle>
                            <XButton onClick={() => setFindId(false)} top="11%" />
                            <ModalContentsWrap>
                                <ModalText>이메일 주소를 입력해 주세요</ModalText>
                                <ModalInput value={EmailForFindId} type="email" placeholder="email" onChange={(e) => setEmailForFindId(e.currentTarget.value)} mb="50px" />
                                <ModalMiniText top="54%">{MailText}</ModalMiniText>
                                <ModalButton onClick={(e) => onFindId(e)}>확 인</ModalButton>
                            </ModalContentsWrap>
                        </ModalWrap>
                    </>
                ) : (
                    <></>
                )}
                {/* 비밀번호 찾기 모달창 */}
                {FindPassword ? (
                    <>
                        <ModalBackground />
                        <ModalWrap height="430px">
                            <ModalTitle>비밀번호 찾기</ModalTitle>
                            <XButton onClick={() => setFindPassword(false)} top="9%" />
                            <ModalContentsWrap>
                                <ModalText>아이디를 입력해 주세요</ModalText>
                                <ModalInput value={UserNameForFindPassword} type="id" placeholder="id" onChange={(e) => setUserNameForFindPassword(e.currentTarget.value)} mb="30px" />
                                <ModalText>이메일 주소를 입력해 주세요</ModalText>
                                <ModalInput value={EmailForFindPassword} type="email" placeholder="email" onChange={(e) => setEmailForFindPassword(e.currentTarget.value)} mb="40px" />
                                <ModalMiniText top="65%">{MailText}</ModalMiniText>
                                <ModalButton onClick={(e) => onFindPassword(e)}>확 인</ModalButton>
                            </ModalContentsWrap>
                        </ModalWrap>
                    </>
                ) : (
                    <></>
                )}
            </LoginBackground>
        </>
    );
}

const LoginBackground = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #f2f2f2;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

const LoginWrap = styled.div`
    margin-top: 50px;
    width: 600px;
    height: 630px;
    background-color: white;
    border-radius: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
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

const NonLink = styled.div`
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
    cursor: pointer;
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

// 모달창 디자인

const ModalBackground = styled.div`
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: #252525;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0.3;
`;

const ModalWrap = styled.div`
    width: 450px;
    height: ${(props) => props.height};
    background-color: white;
    border-radius: 30px;
    position: absolute;
    top: 37%;
    left: 50%;
    transform: translate(-50%, -37%);
    z-index: 30;
`;

const XButton = styled.div`
    width: 17px;
    height: 17px;
    background-image: url(/image/xbutton.png);
    background-size: 17px;
    position: absolute;
    left: 84%;
    top: ${(props) => props.top};
    opacity: 0.5;
    cursor: pointer;
    z-index: 10;
`;

const ModalContentsWrap = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    left: 50%;
    top: 60%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 50px;
    box-sizing: border-box;
`;

const ModalTitle = styled.div`
    font-size: 18px;
    font-weight: 600;
    margin: 35px 50px;
    border-bottom: 2px solid #35c5f0;
    padding-bottom: 15px;
    color: #515151;
`;

const ModalText = styled.div`
    font-size: 16px;
    margin-bottom: 15px;
    margin-left: 10px;
    color: #515151;
    font-weight: 500;
`;

const ModalInput = styled.input`
    width: 100%;
    height: 45px;
    border: 1.5px solid #cecece;
    border-radius: 30px;
    margin-bottom: ${(props) => props.mb};
    outline: none;
    font-size: 16px;
    font-weight: 300;
    letter-spacing: 2px;
    padding-left: 20px;
    box-sizing: border-box;
    color: #545454;
    ::placeholder {
        font-size: 16px;
        font-weight: 300;
        letter-spacing: 2px;
        color: #aaaaaa;
    }
`;

const ModalMiniText = styled.div`
    position: absolute;
    top: ${(props) => props.top};
    margin-left: 10px;
    font-size: 13px;
    color: #35c5f0;
    font-weight: 300;
`;

const ModalButton = styled.button`
    background-color: white;
    border: none;
    width: 120px;
    height: 40px;
    color: #35c5f0;
    font-size: 14.5px;
    border: 2px solid #35c5f0;
    border-radius: 20px;
    font-weight: 500;
    transition: 0.2s;
    cursor: pointer;
    margin: 0 auto;

    :hover {
        background-color: #35c5f0;
        color: white;
    }
`;

export default Login;
