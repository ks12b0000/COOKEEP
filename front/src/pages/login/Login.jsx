import styled from "@emotion/styled";
import { Link } from "react-router-dom";

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
    height: 50px;
    border: none;
    border-bottom: 1.5px solid #adadad;
    margin-bottom: 20px;

    ::placeholder {
        font-size: 20px;
        font-weight: 300;
        letter-spacing: 2px;
        color: #a2a2a2;
    }
`;

const LoginButton = styled.button`
    width: 375px;
    height: 55px;
    background-color: #35c5f0;
    border: none;
    border-radius: 10px;
    color: white;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 3px;
    margin-top: 10px;
`;

const CheckBoxWrap = styled.div`
    display: flex;
    width: 375px;
    margin: 20px 0 30px 0;
    justify-content: right;

    input {
        width: 19px;
        height: 19px;
        border: 1px solid #a2a2a2;
    }

    div {
        font-size: 16px;
        margin-left: 10px;
        color: #a2a2a2;
    }
`;

const LinkWrap = styled.div`
    display: flex;
    color: #525252;
    justify-content: space-between;
    width: 375px;
    font-weight: 300;
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
    }

    div {
        text-align: center;
        margin-top: 20px;
        color: #454545;
        font-weight: 400;
    }
`;

function Login() {
    return (
        <LoginBackground>
            <LoginWrap>
                <LoginTitle>Welcome to our project !</LoginTitle>
                <LoginInput type="email" placeholder="email" />
                <LoginInput type="password" placeholder="password" />
                <LoginButton>로그인</LoginButton>
                <CheckBoxWrap>
                    <input type="checkbox" />
                    <div>자동 로그인</div>
                </CheckBoxWrap>
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
    );
}
export default Login;
