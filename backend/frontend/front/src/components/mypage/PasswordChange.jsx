import { ContentsWrap, SubTitle, InputWrap, Input, InputButton, SubmitButton, MiniText } from "./UserInfoChange";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useState, useRef } from "react";
import AuthHttp from "../../http/authHttp";
import UserHttp from "../../http/userHttp";

const authHttp = new AuthHttp();
const userHttp = new UserHttp();

const PasswordChange = () => {
    const userId = useSelector((state) => state.persistedReducer.userReducer.userId);
    const navigate = useNavigate();

    //input UseRef 설정
    const currentPasswordInput = useRef();
    const PasswordInput = useRef();

    //input값을 위한 state
    const [CurrentPassword, setCurrentPassword] = useState("");
    const [Password, setPassword] = useState("");
    const [Password2, setPassword2] = useState("");

    //miniText 표시를 위한 state
    const [CurrentPasswordText, setCurrentPasswordText] = useState("");
    const [PasswordText, setPasswordText] = useState("");

    //현재 비밀번호 체크여부
    const [CheckCurrentPassword, setCheckCurrentPassword] = useState(false);

    //onFunc 실행전에 체크해야할 것들(현재 비밀번호 체크여부)
    const onCheckPassword = async (e) => {
        e.preventDefault();

        const body = {
            password: CurrentPassword
        };

        try {
            const res = await authHttp.postCheckPassword(userId, body);
            console.log(res);
            setCurrentPasswordText(res.data.message);
            if (res.data.code === 1000) {
                setCheckCurrentPassword(true);
            }
        } catch (err) {
            console.log(err);
            setCurrentPasswordText(err.response.data.message);
        }

        setTimeout(() => {
            setCurrentPasswordText("");
        }, 5000);
    };

    //비밀번호 변경 실행 함수
    const onChangeEmail = async (e) => {
        e.preventDefault();

        const body = {
            updatePassword: Password
        };

        if (!CheckCurrentPassword) {
            currentPasswordInput.current.focus();
            setCurrentPasswordText("비밀번호를 확인해주세요");

            setTimeout(() => {
                setCurrentPasswordText("");
            }, 5000);
        } else if (Password !== Password2) {
            PasswordInput.current.focus();
            setPasswordText("비밀번호와 비밀번호 확인 값이 일치하지 않습니다");

            setTimeout(() => {
                setPasswordText("");
            }, 5000);
        } else {
            try {
                const res = await authHttp.putUpdatePassword(userId, body);
                console.log(res);
                alert("비밀번호 변경이 완료되었습니다. 다시 로그인 해주세요");

                navigate("/login");
            } catch (err) {
                console.log(err);
                alert(err.response.data.message);
            }
        }
    };

    return (
        <ContentsWrap margin="50px auto 0 auto">
            <SubTitle>현재 비밀번호</SubTitle>
            <InputWrap mb="20px">
                <Input type="password" value={CurrentPassword} onChange={(e) => setCurrentPassword(e.currentTarget.value)} ref={currentPasswordInput} />
                <InputButton onClick={(e) => onCheckPassword(e)}>확인</InputButton>
                <MiniText>{CurrentPasswordText}</MiniText>
            </InputWrap>
            <SubTitle>새 비밀번호</SubTitle>
            <InputWrap mb="5px">
                <Input type="password" value={Password} onChange={(e) => setPassword(e.currentTarget.value)} />
            </InputWrap>
            <SubTitle>새 비밀번호 확인</SubTitle>
            <InputWrap mb="20px">
                <Input type="password" value={Password2} onChange={(e) => setPassword2(e.currentTarget.value)} ref={PasswordInput} />
                <MiniText>{PasswordText}</MiniText>
            </InputWrap>
            <SubmitButton onClick={(e) => onChangeEmail(e)}>비밀번호 변경하기</SubmitButton>
        </ContentsWrap>
    );
};

export default PasswordChange;
