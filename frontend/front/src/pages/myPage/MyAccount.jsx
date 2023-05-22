import styled from '@emotion/styled';
import { useCallback, useState } from 'react';
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
import Alert from '../../components/atomic/modal/Alert';

const authHttp = new AuthHttp();

const MyAccount = () => {
  const params = useParams();
  let { userId } = params;
  userId = parseInt(userId);
  const userId2 = useSelector(
    state => state.persistedReducer.userReducer.userId
  );

  const navigate = useNavigate();

  const isSocialLogin = useSelector(
    state => state.persistedReducer.userReducer.isSocialLogin
  );

  const [UserInfo, setUserInfo] = useState([]);
  const [IsModal, setIsModal] = useState(false);

  useEffect(() => {
    onMypage();

    if (userId !== userId2) {
      navigate('/notfound');
    }
  }, []);

  const onMypage = useCallback(async () => {
    try {
      const res = await authHttp.getMypage(userId);
      setUserInfo(res.data.result);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }, []);

  //회원탈퇴 기능
  const onDeleteUser = async () => {
    try {
      const res = await authHttp.deleteUser(userId);
      console.log(res);
      alert('회원 탈퇴가 완료되었습니다. 메인 화면으로 이동합니다.');
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  //모달창 끄기
  const offModal = () => {
    setIsModal(false);
  };

  const Props = {
    body: {
      text: '정말 탈퇴하시겠습니까?',
      icon: (
        <img src={`${process.env.PUBLIC_URL}/image/modal-icon.png`} alt='' />
      ),
      subText: <>탈퇴하면 회원 정보가 삭제되어 다시 복구가 어렵습니다.</>,
    },

    buttons: {
      btn: [
        {
          text: '취소',
          onClick: offModal,
        },
        {
          text: '탈퇴',
          onClick: onDeleteUser,
        },
      ],
    },
  };

  return (
    <Layout>
      <Wrap>
        <Text>마이페이지</Text>
        <BoxWrap>
          <MypageNav
            userNickName={UserInfo.nickname}
            userName={UserInfo.username}
            userEmail={UserInfo.email}
            categoryName='account'
            userId={userId}
            userImage={UserInfo.user_image}
          />
          <PageWrap>
            <RedIconWrap>
              <RedIcon>
                <img src='/image/mypage-account-r.png' alt='icon' />
              </RedIcon>
              <IconText>설정</IconText>
            </RedIconWrap>
            <AccountWrap>
              <ProfileRound>
                <Img src={UserInfo.user_image} />
              </ProfileRound>
              {isSocialLogin ? (
                <UserInfoBox>
                  <UserInfoWrap>
                    <InfoTitle>닉네임</InfoTitle>
                    <InfoText>{UserInfo.nickname}</InfoText>
                  </UserInfoWrap>
                  <UserInfoWrap marginBottom>
                    <InfoTitle>이메일</InfoTitle>
                    <InfoText>{UserInfo.email}</InfoText>
                  </UserInfoWrap>
                </UserInfoBox>
              ) : (
                <UserInfoBox>
                  <UserInfoWrap>
                    <InfoTitle>닉네임</InfoTitle>
                    <InfoText>{UserInfo.nickname}</InfoText>
                  </UserInfoWrap>
                  <UserInfoWrap>
                    <InfoTitle>아이디</InfoTitle>
                    <InfoText>{UserInfo.username}</InfoText>
                  </UserInfoWrap>
                  <UserInfoWrap marginBottom>
                    <InfoTitle>이메일</InfoTitle>
                    <InfoText>{UserInfo.email}</InfoText>
                  </UserInfoWrap>
                </UserInfoBox>
              )}
              <Button
                button
                onClick={() => navigate(`/mypage/changeuserinfo/${userId}`)}
              >
                프로필 수정
              </Button>
              <Button onClick={() => setIsModal(true)}>회원 탈퇴</Button>
            </AccountWrap>
          </PageWrap>
          {IsModal && <Alert {...Props} />}
        </BoxWrap>
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
  position: absolute;
  top: ${props => (props.top ? '10px' : '15px')};
  left: 0;
`;

export const ProfileRound = styled.div`
  width: 100px;
  height: 100px;
  background-color: #d9d9d9;
  border-radius: 50px;
  margin-bottom: ${props => (props.marginBottom ? '36px' : '20px')};
  overflow: hidden;
  position: relative;

  @media screen and (max-width: 1700px) {
    width: 80px;
    height: 80px;
    margin-bottom: ${props => (props.marginBottom ? '30px' : '15px')};
  }
`;

const Img = styled.img`
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media screen and (max-width: 1700px) {
    height: 80px;
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
