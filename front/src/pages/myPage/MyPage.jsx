import styled from "@emotion/styled";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import UserHttp from "../../http/userHttp";

const userHttp = new UserHttp();

function MyPage() {
    const params = useParams();
    const { userId } = params;

    const [UserInfo, setUserInfo] = useState([]);

    useEffect(() => {
        onMypage();
        console.log(UserInfo);
    }, []);

    const onMypage = async () => {
        try {
            const res = await userHttp.getMypage(userId);
            setUserInfo(res.data.result);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            {UserInfo ? (
                <MypageWrap>
                    <UserInfoBlock>
                        <UserInfoTitle>
                            <span>{UserInfo.username}</span> 님 안녕하세요
                        </UserInfoTitle>
                        <UserInfoEmail>{UserInfo.email}</UserInfoEmail>
                        <UserInfoButton>내정보 변경</UserInfoButton>
                    </UserInfoBlock>
                    <UserLogBlock>
                        <UserLogTitle>나의 활동</UserLogTitle>
                        <UserLogContentsBlock>
                            <UserLogContentsBox>
                                <UserLogText>내가 작성한 게시글 2개</UserLogText>
                            </UserLogContentsBox>
                            <UserLogContentsBox>
                                <UserLogText>내가 쓴 댓글 5개</UserLogText>
                            </UserLogContentsBox>
                        </UserLogContentsBlock>
                    </UserLogBlock>
                </MypageWrap>
            ) : (
                <></>
            )}
        </>
    );
}

const MypageWrap = styled.div`
    width: 900px;
    height: 100vh;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const UserInfoBlock = styled.div`
    width: 100%;
    background-color: #fcfcfc;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 12px;
    height: 200px;
    border-radius: 30px;
    padding: 40px 60px;
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 50px;
`;

const UserInfoTitle = styled.div`
    font-size: 25px;
    color: #5b5b5b;

    span {
        font-size: 25px;
        color: #35c5f0;
        font-weight: 600;
    }
`;

const UserInfoEmail = styled.div`
    font-size: 18px;
    color: #8c8c8c;
    margin-top: 10px;
`;

const UserInfoButton = styled.div`
    width: 180px;
    height: 45px;
    border-radius: 30px;
    background-color: #35c5f0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 60%;
    left: 75%;
    color: white;
    font-size: 17px;
    cursor: pointer;
`;

const UserLogBlock = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const UserLogTitle = styled.div`
    color: #2d2d2d;
    font-size: 20px;
    padding: 10px;
    margin-bottom: 10px;
`;

const UserLogContentsBlock = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 48% 48%;
    justify-content: space-between;
`;

const UserLogContentsBox = styled.div`
    width: 100%;
    background-color: #fcfcfc;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 12px;
    height: 150px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    padding-left: 60px;
    box-sizing: border-box;
`;

const UserLogText = styled.div`
    font-size: 17px;
    color: #404040;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        color: #35c5f0;
    }
`;

export default MyPage;
