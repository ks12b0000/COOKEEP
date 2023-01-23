import styled from "@emotion/styled";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/reducer/userSlice";
import AuthHttp from "../../http/authHttp";
import UserInfoChange from "../../components/mypage/UserInfoChange";

const authHttp = new AuthHttp();

const MyPage = () => {
    const params = useParams();
    const { userId } = params;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isSocialLogin = useSelector((state) => state.persistedReducer.userReducer.isSocialLogin);

    const [UserInfo, setUserInfo] = useState([]);
    const [IsModal, setIsModal] = useState(false);

    useEffect(() => {
        onMypage();
        console.log(userId);
    }, []);

    const onMypage = async () => {
        try {
            const res = await authHttp.getMypage(userId);
            setUserInfo(res.data.result);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    const onDeleteUser = async (e) => {
        e.preventDefault();

        if (window.confirm("정말 계정을 삭제하겠습니까?")) {
            try {
                const res = await authHttp.deleteUser(userId);
                setUserInfo(res.data.result);
                console.log(res);
            } catch (err) {
                console.log(err);
            }

            alert("계정이 삭제되었습니다");
            dispatch(logoutUser());
            navigate("/login");
        } else {
            return;
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
                        {isSocialLogin ? <></> : <UserInfoButton onClick={() => setIsModal(true)}>내정보 변경</UserInfoButton>}
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
                    <UserDeleteButton onClick={(e) => onDeleteUser(e)}>회원 탈퇴</UserDeleteButton>
                    {IsModal ? <UserInfoChange setIsModal={setIsModal} /> : <></>}
                </MypageWrap>
            ) : (
                <></>
            )}
        </>
    );
};

const MypageWrap = styled.div`
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f2f2f2;
    position: relative;
`;

const UserInfoBlock = styled.div`
    width: 900px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
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
    width: 150px;
    height: 45px;
    border-radius: 30px;
    background-color: #35c5f0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 60%;
    left: 78%;
    color: white;
    font-size: 17px;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
        background-color: #19b1e0;
    }
`;

const UserLogBlock = styled.div`
    width: 900px;
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
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
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

const UserDeleteButton = styled.div`
    width: 180px;
    height: 45px;
    border-radius: 10px;
    background-color: #bdbdbd;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 82%;
    left: 66%;
    color: white;
    font-size: 17px;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
        background-color: #8f8f8f;
    }
`;

export default MyPage;
