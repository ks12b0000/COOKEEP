import styled from "@emotion/styled";
import { useEffect } from "react";
import { useState } from "react";
import UserHttp from "../../http/userHttp";

const UserInfoChange = (props) => {
    const [IsIdChange, setIsIdChange] = useState(false);

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
                    <TagName1 onClick={() => setIsIdChange(false)} IsIdChange={IsIdChange}>
                        아이디 변경
                    </TagName1>
                    <TagName2 onClick={() => setIsIdChange(true)} IsIdChange={IsIdChange}>
                        비밀번호 변경
                    </TagName2>
                </TagWrap>
                {IsIdChange ? (
                    <ContentsWrap>
                        <SubTitle>현재 비밀번호</SubTitle>
                        <InputWrap mb="30px">
                            <Input />
                            <InputButton>확인</InputButton>
                            {/* <MiniText>현재 비밀번호를 확인해주세요</MiniText> */}
                        </InputWrap>
                        <SubTitle>새 비밀번호</SubTitle>
                        <InputWrap mb="5px">
                            <Input />
                        </InputWrap>
                        <SubTitle>새 비밀번호 확인</SubTitle>
                        <InputWrap mb="30px">
                            <Input />
                            <InputButton>중복확인</InputButton>
                            {/* <MiniText>새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.</MiniText> */}
                        </InputWrap>
                        <SubmitButton>아이디 변경하기</SubmitButton>
                    </ContentsWrap>
                ) : (
                    <ContentsWrap>
                        <SubTitle marginBottom="12px">현재 비밀번호</SubTitle>
                        <InputWrap mb="40px">
                            <Input />
                            <InputButton>확인</InputButton>
                            {/* <MiniText>현재 비밀번호를 확인해주세요</MiniText> */}
                        </InputWrap>
                        <SubTitle marginBottom="12px">새 아이디</SubTitle>
                        <InputWrap mb="40px">
                            <Input />
                            <InputButton>중복확인</InputButton>
                            {/* <MiniText>아이디 중복확인을 해주세요</MiniText> */}
                        </InputWrap>
                        <SubmitButton>아이디 변경하기</SubmitButton>
                    </ContentsWrap>
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
    margin: ${(props) => (props.IsIdChange ? "40px auto 40px auto" : "40px auto 70px auto")};
    border-bottom: 2px solid #35c5f0;
    display: grid;
    grid-template-columns: 50% 50%;
    justify-content: space-between;
`;

const TagName1 = styled.div`
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 18px;
    color: ${(props) => (props.IsIdChange ? "#919191" : "#35c5f0")};
    cursor: pointer;
    background-color: ${(props) => (props.IsIdChange ? "white" : "#f6f6f6")};
    box-sizing: border-box;
    padding: 10px;
    border-radius: 10px;
    font-weight: ${(props) => (props.IsIdChange ? "500" : "600")};
`;

const TagName2 = styled.div`
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 18px;
    color: ${(props) => (props.IsIdChange ? "#35c5f0" : "#919191")};
    cursor: pointer;
    background-color: ${(props) => (props.IsIdChange ? "#f6f6f6" : "white")};
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

const ContentsWrap = styled.div`
    width: 81%;
    height: 63%;
    margin: 30px auto 0 auto;
`;

const SubTitle = styled.div`
    font-size: 17px;
    margin-bottom: ${(props) => props.marginBottom};
    margin-left: 20px;
    color: #515151;
    font-weight: 500;
`;

const InputWrap = styled.div`
    padding: 10px;
    height: 45px;
    position: relative;
    margin-bottom: ${(props) => props.mb};
`;

const Input = styled.input`
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
`;

const InputButton = styled.div`
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

const MiniText = styled.div`
    font-size: 13px;
    color: #35c5f0;
    font-weight: 600;
    margin-top: 7px;
    margin-left: 10px;
`;

const SubmitButton = styled.div`
    width: 130px;
    height: 40px;
    background-color: #35c5f0;
    border-radius: 10px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    margin-left: auto;
    transition: 0.2s;
    cursor: pointer;

    &:hover {
        background-color: #19b1e0;
    }
`;

export default UserInfoChange;
