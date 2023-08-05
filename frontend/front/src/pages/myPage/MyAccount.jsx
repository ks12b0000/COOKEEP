import styled from '@emotion/styled';
import { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import AuthHttp from '../../http/authHttp';
import Layout from '../../components/layout/Layout';
import MypageNav from '../../components/mypage/myPageNav';
import {
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

  //유저 정보
  const [UserInfo, setUserInfo] = useState([]);

  //모달창 관리 state
  const [IsModal, setIsModal] = useState(false);

  //모바일 화면 체크
  const [IsMobile, setIsMobile] = useState(false);

  useEffect(() => {
    onMypage();

    if (userId !== userId2) {
      navigate('/notfound');
    }
  }, []);

  //모바일 화면 체크
  useEffect(() => {
    checkIsMobile(); // 초기 로드 시 한 번 실행
    window.addEventListener('resize', checkIsMobile); // 윈도우 크기 변경 시 실행

    return () => {
      window.removeEventListener('resize', checkIsMobile); // 컴포넌트가 unmount 될 때 이벤트 리스너 제거
    };
  }, []);

  //유저 정보 불러오기 함수
  const onMypage = useCallback(async () => {
    try {
      const res = await authHttp.getMypage(userId);
      setUserInfo(res.data.result);
    } catch (err) {
      console.log(err);
    }
  }, []);

  //모바일 화면 체크 함수
  const checkIsMobile = () => {
    const isMobileDevice = window.matchMedia('(max-width: 760px)').matches;
    setIsMobile(isMobileDevice);
  };

  //회원탈퇴 기능
  const onDeleteUser = async () => {
    try {
      const res = await authHttp.deleteUser(userId);
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
              {IsMobile ? (
                ''
              ) : (
                <Button onClick={() => setIsModal(true)}>회원 탈퇴</Button>
              )}
            </AccountWrap>
          </PageWrap>
          {IsModal && <Alert {...Props} />}
        </BoxWrap>
      </Wrap>
    </Layout>
  );
};

const Wrap = styled.div`
  width: 1440px;
  margin: 0 auto;
  height: 78vh;
  margin-bottom: 10vh;

  @media screen and (max-width: 1700px) {
    width: 1300px;
  }

  @media screen and (max-width: 1020px) {
    width: 760px;
    height: 75vh;
  }

  @media screen and (max-width: 760px) {
    width: 100%;
    margin-bottom: 0;
    height: auto
  }
`

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

  @media screen and (max-width: 760px) {
    position: relative;
    height: ${props => (props.footerBottom ? 'auto' : '670px')};
    top: ${props => (props.footerBottom ? '20px' : '-40px')};
    margin-bottom: ${props => (props.footerBottom ? '70px' : '30px')};
  }
`;

export const ProfileRound = styled.div`
  width: 100px;
  height: 100px;
  background-color: #d9d9d9;
  border-radius: 50px;
  margin-bottom: ${props => (props.marginBottom ? '36px' : '20px')};
  overflow: hidden;
  position: relative;
`;

const Img = styled.img`
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const UserInfoBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserInfoWrap = styled.div`
  display: flex;
  margin-bottom: ${props => (props.marginBottom ? '36px' : '10px')};

  @media screen and (max-width: 760px) {
    margin-bottom: ${props => (props.marginBottom ? '36px' : '16px')};
  }
`;

export const InfoTitle = styled.div`
  font-family: 700;
  color: #ff4122;
  font-size: 18px;
  margin-right: 16px;
`;

export const InfoText = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: #000000;

  @media screen and (max-width: 1700px) {
    font-size: 16px;
  }

  @media screen and (max-width: 760px) {
    font-size: 18px;
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
  font-size: 16px;
  text-decoration: ${props => (props.button ? '' : 'underline')};
  border-radius: 5px;
  cursor: pointer;

  @media screen and (max-width: 1700px) {
    width: 320px;
  }

  @media screen and (max-width: 760px) {
    width: 343px;
    height: 48px;
    font-size: 16px;
  }
`;

export default MyAccount;
