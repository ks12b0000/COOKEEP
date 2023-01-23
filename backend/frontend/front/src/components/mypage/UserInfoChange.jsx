import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import IdChange from "./IdChange";
import EmailChange from "./EmailChange";

const UserInfoChange = (props) => {
    //모달창 ui 변경을 위한 state
    const [IsIdChange, setIsIdChange] = useState(true);
    const [IsEmailChange, setIsEmailChange] = useState(false);
    const [IsPasswordChange, setIsPasswordChange] = useState(false);

    const onIdChange = () => {
        setIsIdChange(true);
        setIsEmailChange(false);
        setIsPasswordChange(false);
    };

    const onEmailChange = () => {
        setIsEmailChange(true);
        setIsIdChange(false);
        setIsPasswordChange(false);
    };

    const onPasswordChange = () => {
        setIsPasswordChange(true);
        setIsIdChange(false);
        setIsEmailChange(false);
    };

    return (
        <>
            <MocalBackGround></MocalBackGround>
            <ModalWrap>
                <XButton
                    onClick={() => {
                        props.setIsModal(false);
                    }}
                />
                <TagWrap IsIdChange={IsIdChange}>
                    <TagName onClick={() => onIdChange()} IsChangeOn={IsIdChange}>
                        아이디 변경
                    </TagName>
                    <TagName onClick={() => onEmailChange()} IsChangeOn={IsEmailChange}>
                        이메일 변경
                    </TagName>
                    <TagName onClick={() => onPasswordChange()} IsChangeOn={IsPasswordChange}>
                        비밀번호 변경
                    </TagName>
                </TagWrap>
                {IsIdChange ? <IdChange /> : <></>}

                {IsEmailChange ? <EmailChange /> : <></>}

                {IsPasswordChange ? (
                    <ContentsWrap margin="50px auto 0 auto">
                        <SubTitle>현재 비밀번호</SubTitle>
                        <InputWrap mb="20px">
                            <Input />
                            <InputButton>확인</InputButton>
                            {/* <MiniText>현재 비밀번호를 확인해주세요</MiniText> */}
                        </InputWrap>
                        <SubTitle>새 비밀번호</SubTitle>
                        <InputWrap mb="5px">
                            <Input />
                        </InputWrap>
                        <SubTitle>새 비밀번호 확인</SubTitle>
                        <InputWrap mb="20px">
                            <Input />
                            {/* <InputButton>중복확인</InputButton> */}
                            {/* <MiniText>새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.</MiniText> */}
                        </InputWrap>
                        <SubmitButton>비밀번호 변경하기</SubmitButton>
                    </ContentsWrap>
                ) : (
                    <></>
                )}
            </ModalWrap>
        </>
    );
};

const MocalBackGround = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #252525;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0.3;
`;

const ModalWrap = styled.div`
    width: 500px;
    height: 540px;
    background-color: #ffffff;
    border-radius: 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const TagWrap = styled.div`
    width: 81%;
    height: 60px;
    margin: 40px auto 0 auto;
    border-bottom: 2px solid #35c5f0;
    display: grid;
    grid-template-columns: 33% 33% 33%;
    justify-content: space-between;
`;

const TagName = styled.div`
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 18px;
    color: ${(props) => (props.IsChangeOn ? "#35c5f0" : "#919191")};
    cursor: pointer;
    background-color: ${(props) => (props.IsChangeOn ? "#f5f5f5" : "white")};
    box-sizing: border-box;
    padding: 10px;
    border-radius: 10px;
    font-weight: ${(props) => (props.IsIdChange ? "600" : "500")};
`;

const XButton = styled.div`
    width: 17px;
    height: 17px;
    background-image: url(/image/xbutton.png);
    background-size: 17px;
    position: absolute;
    left: 92%;
    top: 4%;
    opacity: 0.5;
    cursor: pointer;
    z-index: 10;
`;

export const ContentsWrap = styled.div`
    width: 81%;
    height: 63%;
    margin: ${(props) => props.margin};
`;

export const SubTitle = styled.div`
    font-size: 17px;
    margin-bottom: ${(props) => props.marginBottom};
    margin-left: 20px;
    color: #515151;
    font-weight: 500;
`;

export const InputWrap = styled.div`
    padding: 10px;
    height: 45px;
    position: relative;
    margin-bottom: ${(props) => props.mb};
`;

export const Input = styled.input`
    width: 100%;
    height: 45px;
    border: 1.5px solid #cecece;
    border-radius: 30px;
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

    :focus {
        border: 2px solid #949494;
    }
`;

export const InputButton = styled.div`
    height: 28px;
    width: 78px;
    background-color: #d8d8d8;
    border-radius: 20px;
    position: absolute;
    top: 50%;
    left: 75%;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translate(0, -50%);
    border: 2px solid #35c5f0;
    color: #35c5f0;
    background-color: white;
    font-weight: 700;
    transition: 0.2s;
    cursor: pointer;

    &:hover {
        color: white;
        background-color: #35c5f0;
    }
`;

export const MiniText = styled.div`
    font-size: 13px;
    color: #35c5f0;
    font-weight: 600;
    margin-top: 7px;
    margin-left: 10px;
`;

export const SubmitButton = styled.div`
    width: 140px;
    height: 40px;
    background-color: #35c5f0;
    border-radius: 10px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    margin-left: auto;
    margin-right: 10px;
    transition: 0.2s;
    cursor: pointer;

    &:hover {
        background-color: #19b1e0;
    }
`;

export default UserInfoChange;
