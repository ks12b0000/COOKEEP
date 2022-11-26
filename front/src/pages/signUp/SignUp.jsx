import Header from "../../components/layout/header/Header";
import styled from "@emotion/styled";

const SignBackground = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #f2f2f2;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
`;

const SignWrap = styled.div`
    width: 600px;
    height: 670px;
    background-color: white;
    border-radius: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const SignTitle = styled.div`
    color: #35c5f0;
    font-size: 35px;
    margin-bottom: 30px;
`;

const SignName = styled.div`
    text-align: left;
    font-size: 16px;
    width: 380px;
    margin-top: 15px;
    font-weight: 400;
`;

const SignInput = styled.input`
    width: 380px;
    height: 45px;
    border: none;
    border-bottom: 1.5px solid #cecece;
    outline: none;
    font-size: 18px;
    font-weight: 300;
    color: #545454;
    margin-bottom: 15px;

    ::placeholder {
        font-size: 18px;
        font-weight: 300;
        color: #aaaaaa;
    }
`;

const IdWrap = styled.div`
    width: 380px;
    height: 45px;
    position: relative;
    margin-bottom: 15px;
`;

const IdButton = styled.button`
    position: absolute;
    left: 77%;
    top: -5%;
    background-color: white;
    border: none;
    width: 90px;
    height: 40px;
    color: #35c5f0;
    font-size: 14.5px;
    border: 2px solid #35c5f0;
    border-radius: 20px;
    font-weight: 500;
    transition: 0.2s;
    cursor: pointer;

    :hover {
        background-color: #35c5f0;
        color: white;
    }
`;

const SignButton = styled.button`
    width: 380px;
    height: 55px;
    background-color: #35c5f0;
    border: none;
    border-radius: 10px;
    color: white;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 3px;
    margin-top: 30px;
    cursor: pointer;
`;

function SignUp() {
    return (
        <>
            <Header />
            <SignBackground>
                <SignWrap>
                    <SignTitle>회원가입</SignTitle>
                    <SignName>아이디</SignName>
                    <IdWrap>
                        <SignInput type="id" placeholder="아이디를 입력하세요" />
                        <IdButton>중복확인</IdButton>
                    </IdWrap>
                    <SignName>이메일</SignName>
                    <SignInput type="email" placeholder="이메일을 입력하세요" />
                    <SignName>비밀번호</SignName>
                    <SignInput type="password" placeholder="비밀번호를 입력하세요" />
                    <SignName>비밀번호 확인</SignName>
                    <SignInput type="password" placeholder="비밀번호 확인을 입력하세요" />
                    <SignButton>가입하기</SignButton>
                </SignWrap>
            </SignBackground>
        </>
    );
}
export default SignUp;
