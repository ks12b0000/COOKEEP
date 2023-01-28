import { ContentsWrap, SubTitle, InputWrap, Input, InputButton, SubmitButton, MiniText } from "./UserInfoChange";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useState, useRef } from "react";
import AuthHttp from "../../http/authHttp";
import UserHttp from "../../http/userHttp";

const authHttp = new AuthHttp();
const userHttp = new UserHttp();

const IdChange = () => {
    const userId = useSelector((state) => state.persistedReducer.userReducer.userId);
    const navigate = useNavigate();

    //input UseRef 설정
    const currentPasswordInput = useRef();
    const idInput = useRef();

    //input값을 위한 state
    const [CurrentPassword, setCurrentPassword] = useState("");
    const [Username, setUsername] = useState("");

    //miniText 표시를 위한 state
    const [CurrentPasswordText, setCurrentPasswordText] = useState("");
    const [IdText, setIdText] = useState("");

    //onFunc 실행전에 체크해야할 것들(현재 비밀번호 체크여부, 아이디 중복확인 체크여부)
    const [CheckCurrentPassword, setCheckCurrentPassword] = useState(false);
    const [CheckUsername, setCheckUsername] = useState(false);

    // 현재 비밀번호 확인 함수
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

    //아이디 중복체크 실행 함수
    const onCheckUsername = async (e) => {
        e.preventDefault();

        try {
            const res = await userHttp.getCheckUsername(Username);
            console.log(res);
            setIdText(res.data.message);

            if (!res.data.result.isDuplicate) {
                setCheckUsername(true);
            }
        } catch (err) {
            console.log(err);
            setIdText(err.response.data.message);
        }

        setTimeout(() => {
            setIdText("");
        }, 5000);
    };

    //아이디 변경 실행 함수
    const onChangeUsername = async (e) => {
        e.preventDefault();

        const body = {
            updateUsername: Username
        };

        if (!CheckCurrentPassword) {
            currentPasswordInput.current.focus();
            setCurrentPasswordText("비밀번호를 확인해주세요");

            setTimeout(() => {
                setCurrentPasswordText("");
            }, 5000);
        } else if (!CheckUsername) {
            idInput.current.focus();
            setIdText("아이디 중복확인을 실행해주세요");

            setTimeout(() => {
                setIdText("");
            }, 5000);
        } else {
            try {
                const res = await authHttp.putUpdateUsername(userId, body);
                console.log(res);
                alert("아이디 변경이 완료되었습니다. 다시 로그인 해주세요");

                navigate("/login");
            } catch (err) {
                console.log(err);
                alert(err.response.data.message);
            }
        }
    };

    return (
        <ContentsWrap margin="70px auto 0 auto">
            <SubTitle marginBottom="12px">현재 비밀번호</SubTitle>
            <InputWrap mb="30px">
                <Input type="password" value={CurrentPassword} onChange={(e) => setCurrentPassword(e.currentTarget.value)} ref={currentPasswordInput} />
                <InputButton onClick={(e) => onCheckPassword(e)}>확인</InputButton>
                <MiniText>{CurrentPasswordText}</MiniText>
            </InputWrap>
            <SubTitle marginBottom="12px">새 아이디</SubTitle>
            <InputWrap mb="30px">
                <Input type="id" value={Username} onChange={(e) => setUsername(e.currentTarget.value)} ref={idInput} />
                <InputButton onClick={(e) => onCheckUsername(e)}>중복확인</InputButton>
                <MiniText>{IdText}</MiniText>
            </InputWrap>
            <SubmitButton onClick={(e) => onChangeUsername(e)}>아이디 변경하기</SubmitButton>
        </ContentsWrap>
    );
};

export default IdChange;
