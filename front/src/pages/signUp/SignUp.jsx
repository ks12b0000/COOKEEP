import { useState } from "react";
import styled from "@emotion/styled";
import UserHttp from "../../http/userHttp";
import Header from "../../components/layout/header/Header";
import { useNavigate } from "react-router";

const userHttp = new UserHttp();

function SignUp() {
    const navigate = useNavigate();

    const [UserName, setUserName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [CheckPassword, setCheckPassword] = useState("");
    const [CheckUserName, setCheckUserName] = useState(false);
    const [CheckEmail, setCheckEmail] = useState(false);

    //회원가입 실행 함수
    const onSignUp = async(e) => {
        e.preventDefault();

        const body = {
            username: UserName,
            email: Email,
            password: Password
        }

        if (!(UserName && Email && Password && CheckPassword)) {
            return alert("모든 값을 입력해주세요");
        } else if (Password != CheckPassword) {
            return alert("비밀번호와 비밀번호 확인 값이 일치하지 않습니다");
        } else if(!CheckUserName){
            return alert("닉네임 중복검사를 진행해 주세요")
        } else if(!CheckEmail){
            return alert("이메일 중복검사를 진행해 주세요")
        } else {
            try {
                const res = await userHttp.postSignUp(body);
                console.log(res);

                navigate('/login');
            } catch(err) {
                console.log(err);
                // alert(err.response.data.message);
            };
        }
    };

    //아이디 중복체크 실행 함수
    const onCheckUserName = async(e)=>{
        e.preventDefault();

        try {
            const res = await userHttp.getCheckUsername(UserName)
            console.log(res);

            if(!res.data.result.isDuplicate){
                setCheckUserName(true)
                alert(res.data.message)
            }
        } catch(err){
            console.log(err);
            alert(err.response.data.message)
        }

    }

    //이메일 중복체크 실행 함수
    const onCheckEmail = async(e)=>{
        e.preventDefault();

        try {
            const res = await userHttp.getCheckEmail(Email)
            console.log(res);

            if(!res.data.result.isDuplicate){
                setCheckEmail(true)
                alert(res.data.message)
            }
        } catch(err){
            console.log(err);
            alert(err.response.data.message)
        }

    }

    return (
        <>
            <SignBackground>
                <SignWrap>
                    <SignTitle>회원가입</SignTitle>
                    {/* 아이디 입력 */}
                    <SignName>아이디</SignName>
                    <IdWrap>
                        <SignInput
                            value={UserName}
                            type="id"
                            placeholder="아이디를 입력하세요"
                            onChange={(e) => {
                                setUserName(e.currentTarget.value);
                            }}
                        />
                        <IdButton onClick={(e)=>onCheckUserName(e)}>중복확인</IdButton>
                    </IdWrap>
                    {/* 이메일 입력 */}
                    <SignName>이메일</SignName>
                    <IdWrap>
                        <SignInput
                            value={Email}
                            type="email"
                            placeholder="이메일을 입력하세요"
                            onChange={(e) => {
                                setEmail(e.currentTarget.value);
                            }}
                        />
                        <IdButton onClick={(e)=>onCheckEmail(e)}>중복확인</IdButton>
                    </IdWrap>
                    {/* 비밀번호 입력 */}
                    <SignName>비밀번호</SignName>
                    <SignInput
                        value={Password}
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        onChange={(e) => {
                            setPassword(e.currentTarget.value);
                        }}
                    />
                    {/* 비밀번호확인 입력 */}
                    <SignName>비밀번호 확인</SignName>
                    <SignInput
                        value={CheckPassword}
                        type="password"
                        placeholder="비밀번호 확인을 입력하세요"
                        onChange={(e) => {
                            setCheckPassword(e.currentTarget.value);
                        }}
                    />
                    <SignButton onClick={(e) => onSignUp(e)}>가입하기</SignButton>
                </SignWrap>
            </SignBackground>
        </>
    );
}

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
    margin-top: 50px;
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

export default SignUp;