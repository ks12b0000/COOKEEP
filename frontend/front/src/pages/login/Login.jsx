import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/reducer/userSlice";
import styled from "@emotion/styled";
import Header from "../../components/layout/header/Header";
import UserHttp from "../../http/userHttp";
import Footer from "../../components/layout/footer/Footer";

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

    const idRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    //로그인 시 필요한 유저 정보
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [AutoLogin, setAutoLogin] = useState(false);

    //모달창 관리
    const [IsModal, setIsModal] = useState(false);
    const [FindId, setFindId] = useState(false);
    const [FindPassword, setFindPassword] = useState(false);

    //아이디 찾기를 위한 이메일 값
    const [EmailForFindId, setEmailForFindId] = useState("");

    //비밀번호 찾기를 위한 아이디 및 이메일 값
    const [UsernameForFindPassword, setUsernameForFindPassword] = useState("");
    const [EmailForFindPassword, setEmailForFindPassword] = useState("");

    //에러 시 메세지 문구
    const [IdText, setIdText] = useState("");
    const [EmailText, setEmailText] = useState("");
    const [PasswordText, setPasswordText] = useState("");

    //비밀번호 보이기 여부 체크
    const [EyeVisible, setEyeVisible] = useState(false);

    //focus 색상 구분
    const [IsError, setIsError] = useState(false);


    // 일반 로그인 동작 수행 함수
    const onLogin = async (e) => {
        e.preventDefault();

        const body = {
            username: Username,
            password: Password,
            autoLogin: AutoLogin
        };

        if (!(Username && Password)) {
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
                            username: res.data.result.username,
                            isLoggedIn: true,
                            isSocialLogin: false
                        })
                    );

                    //홈 화면으로 이동
                    navigate("/");
                }
            } catch (err) {
                console.log(err);
                alert("로그인에 실패하셨습니다.");
            }
        }

        setUsername("");
        setPassword("");
        setAutoLogin(false);
    };

    //아이디 찾기 모달창 켜기
    const onIdModal = (e)=>{
        e.preventDefault();

        setIsModal(true);
        setFindId(true);
    }

    //비밀번호 찾기 모달창 켜기
    const onPasswordModal = (e)=>{
        e.preventDefault();

        setIsModal(true);
        setFindPassword(true);
    }

    // 아이디 모달창 X버튼
    const idXButton = (e)=>{
        e.preventDefault();

        setIsModal(false);
        setFindId(false);
    }

    // 비밀번호 모달창 X버튼
    const passwordXButton = (e)=>{
        e.preventDefault();
    
        setIsModal(false);
        setFindPassword(false);
    }

    // 아이디 찾기 동작 실행 함수
    const onFindId = async (e) => {
        e.preventDefault();

        const body = {
            email: EmailForFindId
        };

        if(EmailForFindId===''){
            setIsError(true);
            idRef.current.focus();
            setIdText("이메일을 입력하세요");
            setTimeout(() => {
                setIdText("");
                setIsError(false);
            }, 5000);
        }else{
            try {
                const res = await userHttp.postFindId(body);
                console.log(res);
            } catch (err) {
                console.log(err);
                setIdText(err.response.data.message);
            }
        }

        // console.log(EmailForFindId);
        // setTimeout(() => {
        //     setEmailForFindId("");
        //     setMailText("");
        // }, 5000);
    };

    // 비밀번호 찾기 동작 실행 함수
    const onFindPassword = async (e) => {
        e.preventDefault();

        const body = {
            username: UsernameForFindPassword,
            email: EmailForFindPassword
        };

        try {
            const res = await userHttp.postFindPassword(body);
            console.log(res);
            //새로운 모달창으로 넘어가야함
        } catch (err) {
            console.log(err);
            setPasswordText(err.response.data.message);
        }

        // setTimeout(() => {
        //     setUsernameForFindPassword("");
        //     setEmailForFindPassword("");
        //     setMailText("");
        // }, 5000);
    };

    //패스워드 표시 여부 토글
    const eyeToggle = (e) => {
        e.preventDefault();
        if(EyeVisible){
            setEyeVisible(false)
        }else{
            setEyeVisible(true)
        }
    }

    return (
        <>
            <LoginBackground>
                <Link to='/'><Logo /></Link>
                <LoginWrap IsModal={IsModal}>
                    <LoginTitle>Login</LoginTitle>
                    <InputWrap>
                        <LoginInput value={Username} type="id" placeholder="id" onChange={(e) => setUsername(e.currentTarget.value)} />
                    </InputWrap>
                    <InputWrap>
                        <LoginInput 
                            value={Password} 
                            type={EyeVisible ? "text" : "password"} 
                            placeholder="password" 
                            onChange={(e) => setPassword(e.currentTarget.value)} 
                        />
                        <EyeImg onClick={e=>eyeToggle(e)} EyeVisible={EyeVisible}/>
                    </InputWrap>
                    <LoginButton onClick={(e) => onLogin(e)}>로그인</LoginButton>
                    <CheckBoxWrap>
                        <Checkbox value={AutoLogin} type="checkbox" onChange={(e) => setAutoLogin(e.currentTarget.checked)} checked={AutoLogin} />
                        <AutoText>자동 로그인</AutoText>
                        <FindTextWrap>
                            <FindText onClick={(e) => onIdModal(e)}>아이디 찾기</FindText>
                            <FindLine/>
                            <FindText onClick={(e) => onPasswordModal(e)}>비밀번호 찾기</FindText>
                        </FindTextWrap>
                    </CheckBoxWrap>
                    <OtherTextWrap>
                        <Line />
                        <OtherText>간편 로그인</OtherText>
                        <Line />
                    </OtherTextWrap>
                    <OtherLoginWrap>
                        <a href={NaverURL}>
                            <OtherLogin>
                                <img src="/image/naver.png" alt="naver-logo" />
                                <div>네이버로 로그인</div>
                            </OtherLogin>
                        </a>
                        <a href={KakaoURL}>
                            <OtherLogin>
                                <img src="/image/kakao.png" alt="kakao-logo" />
                                <div>카카오로 로그인</div>
                            </OtherLogin>
                        </a>
                        <a href={googleURL}>
                            <OtherLogin>
                                <img src="/image/google.png" alt="google-logo" />
                                <div>구글로 로그인</div>
                            </OtherLogin>
                        </a>
                    </OtherLoginWrap>
                    <LoginAskWrap>
                        <LoginAskText>아직 COOKEEP 회원이 아니신가요?</LoginAskText>
                        <Link to='/sign'>
                            <LoginAskLink>회원가입</LoginAskLink>
                        </Link>
                    </LoginAskWrap>
                </LoginWrap>
                {/* 아이디 찾기 모달창 */}
                {FindId ? (
                    <>
                        <ModalWrap height="327px">
                            <ModalTitle>아이디 찾기</ModalTitle>
                            <XButton onClick={(e) => idXButton(e) } top="7%" />
                            <ModalText>이메일</ModalText>
                            <InputWrap>
                                <LoginInput 
                                    value={EmailForFindId} 
                                    type="email" 
                                    placeholder="email" 
                                    onChange={(e) => setEmailForFindId(e.currentTarget.value)} 
                                    ref={idRef}
                                    isError={IsError}
                                />
                                <ErrorMessage>{IdText}</ErrorMessage>
                            </InputWrap>
                            <LoginButton onClick={(e) => onFindId(e)}>확 인</LoginButton>
                        </ModalWrap>
                    </>
                ) : (
                    <></>
                )}
                {/* 비밀번호 찾기 모달창 */}
                {FindPassword ? (
                    <>
                        <ModalWrap height="430px">
                            <ModalTitle>비밀번호 찾기</ModalTitle>
                            <XButton onClick={(e) => passwordXButton(e)} top="5%" />
                            <ModalText>아이디를 입력해 주세요</ModalText>
                            <InputWrap>
                                <LoginInput 
                                    value={UsernameForFindPassword} 
                                    type="id" placeholder="id" 
                                    onChange={(e) => setUsernameForFindPassword(e.currentTarget.value)} 
                                    marginBottom="24px" 
                                    ref={emailRef}
                                    isError={IsError}
                                />
                                <ErrorMessage>{EmailText}</ErrorMessage>
                            </InputWrap>
                            <ModalText>이메일 주소를 입력해 주세요</ModalText>
                            <InputWrap>
                                <LoginInput 
                                    value={EmailForFindPassword} 
                                    type="email" placeholder="email" 
                                    onChange={(e) => setEmailForFindPassword(e.currentTarget.value)} 
                                    marginBottom="48px" 
                                    ref={passwordRef}
                                    isError={IsError}
                                />
                                <ErrorMessage>{EmailText}</ErrorMessage>
                            </InputWrap>
                            <ErrorMessage>{PasswordText}</ErrorMessage>
                            <LoginButton onClick={(e) => onFindPassword(e)}>확 인</LoginButton>
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
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: url(image/login-back.jpg);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    padding-bottom: 40px;
    box-sizing: border-box;
`;

const Logo = styled.div`
    margin-top: 50px;
    background: url(image/LOGO.png);
    width: 260px;
    height: 50px;
    background-size: 260px;
    background-repeat: no-repeat;
    margin-bottom: 30px;
    position: relative;
    top: 0;
    cursor: pointer;
    transition: 0.3s;

    &:hover{
        top: -3px;
    }
`;

const LoginWrap = styled.div`
    position: relative;
    width: 470px;
    height: 553px;
    background-color: white;
    border-radius: 15px;
    display: ${props=>props.IsModal?'none':'flex'};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`

const LoginTitle = styled.div`
    color: #FF4122;
    font-size: 24px;
    margin-bottom: 25px;
    font-weight: 700;
`;

const InputWrap = styled.div`
    width: 343px;
    height: 48px;
    position: relative;
    margin-bottom: 24px;
`

const LoginInput = styled.input`
    width: 343px;
    height: 48px;
    padding: 0 20px;
    box-sizing: border-box;
    border: 1px solid #CED4DA;
    outline: none;
    font-weight: 300;
    color: #000000;
    border-radius: 7px;
    font-size: 16px;

    ::placeholder {
        font-size: 16px;
        font-weight: 300;
        color: #CED4DA;
    }

    &:focus {
        border: ${({ isError }) => (isError ? '1px solid #FF4122' : '1px solid #FFA590')};
        background-color: ${({ isError }) => (isError ? '#FFEAE4' : 'white')};
    }
`;

const ErrorMessage = styled.div`
    color: #E52F2F;
    font-size: 12px;
    font-weight: 400;
    margin-left: 5px;
    margin-top: 3px;
    text-align: left;
`

const EyeImg = styled.div`
    width: 22px;
    height: 22px;
    background: ${props=>props.EyeVisible ? 'url(image/eye-open.png)':'url(image/eye.png)'};
    position: absolute;
    background-repeat: no-repeat;
    top: ${props=>props.EyeVisible ? '33%':'29.5%'};
    left: 88%;
    cursor: pointer;
`

const LoginButton = styled.button`
    width: 343px;
    height: 51px;
    background-color: #FF4122;
    border: none;
    border-radius: 7px;
    color: white;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 1px;
    cursor: pointer;
`;

const CheckBoxWrap = styled.div`
    margin-top: 10px;
    width: 343px;
    display: flex;  
    align-items: center;
`;

const Checkbox = styled.input`
  appearance: none;
  width: 12px;
  height: 12px;
  background: url(image/check-x.png);
  background-size: 11px;
  background-repeat: no-repeat;
  
  &:checked {
    appearance: none;
    width: 12px;
    height: 12px;
    background: url(image/check.png);
    background-size: 11px;
    background-repeat: no-repeat;
  }
`;

const AutoText = styled.div`
    font-size: 12px;
    margin-left: 6px;
    color: #5A5C5F;
    font-weight: 400;
    text-align: left;
`

const FindTextWrap = styled.div`
    display: grid;
    grid-template-columns: 47% 6% 47%;
    width: 150px;
    margin-left: auto;
    justify-content: space-between;
    align-items: center;
`

const FindText = styled.div`
    font-size: 12px;
    font-weight: 400;
    color: #838485;
    text-align: center;
    text-decoration: underline;
    cursor: pointer;
`

const FindLine = styled.div`
    height: 12px;
    width: 0.1px;
    background-color: #838485;
    position: relative;
    left: 20%;
`

const OtherTextWrap = styled.div`
    display: grid;
    width: 340px;
    height: 30px;
    grid-template-columns: 33% 27% 33%;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
`

const Line = styled.div`
    width: 100%;
    height: 0.1px;
    background-color: #9a9a9a;
`

const OtherText = styled.div`
    color: #9a9a9a;
    font-weight: 300;
    font-size: 14px;
    text-align: center;
`

const OtherLoginWrap = styled.div`
    display: flex;
    width: 300px;
    justify-content: space-between;
    margin-top: 20px;
`;

const OtherLogin = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 1px 3px;
        cursor: pointer;
    }
    div {
        text-align: center;
        margin-top: 10px;
        color: #5A5C5F;
        font-weight: 300;
        font-size: 12px;
    }
`;

const LoginAskWrap = styled.div`
    width: 320px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 25px;
`

const LoginAskText = styled.div`
    color: #9a9a9a;
    font-weight: 300;
    font-size: 12px;
`

const LoginAskLink = styled.div`
    color: #FF8164;
    text-decoration: underline;
    font-size: 12px;
    margin-left: 10px;
`

// 모달창 디자인

const ModalWrap = styled.div`
    position: relative;
    width: 470px;
    height: ${(props) => props.height};
    background-color: white;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

const XButton = styled.div`
    width: 17px;
    height: 17px;
    background-image: url(image/xbutton.png);
    background-size: 17px;
    position: absolute;
    left: 92%;
    top: ${(props) => props.top};
    opacity: 0.5;
    cursor: pointer;
    z-index: 10;
`;

const ModalTitle = styled.div`
    color: #FF4122;
    font-size: 24px;
    margin-bottom: 25px;
    font-weight: 700;
    margin-bottom: 32px;
`;

const ModalText = styled.div`
    width: 343px;
    font-size: 16px;
    margin-left: 2px;
    margin-bottom: 7px;
    color: #000000;
    font-weight: 600;
    text-align: left;
`;


export default Login;
