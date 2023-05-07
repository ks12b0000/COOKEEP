import styled from '@emotion/styled';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import AuthHttp from '../../http/authHttp';
import Layout from '../../components/layout/Layout';
import MypageNav from '../../components/mypage/myPageNav';
import {
  Wrap,
  Text,
  BoxWrap,
  PageWrap,
  RedIconWrap,
  RedIcon,
  IconText,
} from './MyPosts';

const authHttp = new AuthHttp();

const MyAccount = () => {
  const params = useParams();
  const { userId } = params;

  const navigate = useNavigate();

  const username = useSelector(
    state => state.persistedReducer.userReducer.username
  );

  const isSocialLogin = useSelector(
    state => state.persistedReducer.userReducer.isSocialLogin
  );

  const [UserInfo, setUserInfo] = useState([]);

  useEffect(() => {
    onMypage();
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

  return (
    <Layout>
      <Wrap>
        <Text>마이페이지</Text>
        {username === UserInfo.username ? (
          <>
            <BoxWrap>
              <MypageNav
                userNickName={UserInfo.nickname}
                userName={UserInfo.username}
                userEmail={UserInfo.email}
                categoryName='account'
                userId={userId}
              />
              <PageWrap>
                <RedIconWrap>
                  <RedIcon>
                    <img src='/image/mypage-account-r.png' alt='icon' />
                  </RedIcon>
                  <IconText>설정</IconText>
                </RedIconWrap>
                {isSocialLogin ? (
                  <AccountWrap>
                    <ProfileRound marginBottom>
                      <img />
                    </ProfileRound>
                    <UserInfoBox>
                      <UserInfoWrap>
                        <InfoTitle>닉네임</InfoTitle>
                        <InfoText>today123</InfoText>
                      </UserInfoWrap>
                      <UserInfoWrap marginBottom>
                        <InfoTitle>이메일</InfoTitle>
                        <InfoText>today123</InfoText>
                      </UserInfoWrap>
                    </UserInfoBox>
                    <Button button>프로필 수정</Button>
                    <Button>회원 탈퇴</Button>
                  </AccountWrap>
                ) : (
                  <AccountWrap>
                    <ProfileRound>
                      <img />
                    </ProfileRound>
                    <UserInfoBox>
                      <UserInfoWrap>
                        <InfoTitle>닉네임</InfoTitle>
                        <InfoText>today123</InfoText>
                      </UserInfoWrap>
                      <UserInfoWrap>
                        <InfoTitle>아이디</InfoTitle>
                        <InfoText>today123</InfoText>
                      </UserInfoWrap>
                      <UserInfoWrap marginBottom>
                        <InfoTitle>이메일</InfoTitle>
                        <InfoText>today123</InfoText>
                      </UserInfoWrap>
                    </UserInfoBox>
                    <Button
                      button
                      onClick={() =>
                        navigate(`/mypage/changeuserinfo/${userId}`)
                      }
                    >
                      프로필 수정
                    </Button>
                    <Button>회원 탈퇴</Button>
                  </AccountWrap>
                )}
              </PageWrap>
            </BoxWrap>
          </>
        ) : (
          navigate('/notfound')
        )}
      </Wrap>
    </Layout>
  );
};

export const AccountWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ProfileRound = styled.div`
  width: 100px;
  height: 100px;
  background-color: #d9d9d9;
  border-radius: 50px;
  margin-bottom: ${props => (props.marginBottom ? '36px' : '20px')};
  overflow: hidden;

  @media screen and (max-width: 1700px) {
    width: 80px;
    height: 80px;
    margin-bottom: ${props => (props.marginBottom ? '30px' : '15px')};
  }
`;

export const UserInfoBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserInfoWrap = styled.div`
  display: flex;
  margin-bottom: ${props => (props.marginBottom ? '36px' : '10px')};
`;

export const InfoTitle = styled.div`
  font-family: 700;
  color: #ff4122;
  font-size: 18px;
  margin-right: 16px;

  @media screen and (max-width: 1700px) {
    font-size: 16px;
  }
`;

export const InfoText = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: #000000;

  @media screen and (max-width: 1700px) {
    font-size: 16px;
  }
`;

export const Button = styled.div`
  width: 343px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.button ? '#FF4122' : '')};
  color: ${props => (props.button ? 'white' : '#E52F2F')};
  font-size: 13px;
  text-decoration: ${props => (props.button ? '' : 'underline')};
  border-radius: 5px;
  cursor: pointer;

  @media screen and (max-width: 1700px) {
    width: 320px;
  }
`;

export default MyAccount;
