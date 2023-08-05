import styled from '@emotion/styled';
import Layout from '../../components/layout/Layout';
import { useNavigate, useParams } from 'react-router';
import AuthHttp from '../../http/authHttp';
import UserHttp from '../../http/userHttp';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { logoutUser } from '../../redux/reducer/userSlice';
import Alert from '../../components/atomic/modal/Alert';
import LoadingPopup from '../../components/categoryLayout/writing/popup/LoadingPopup';
import CompletePopup from '../../components/categoryLayout/writing/popup/CompletePopup';

const userHttp = new UserHttp();
const authHttp = new AuthHttp();

const MyPageMobile = () => {
  const params = useParams();
  const dispatch = useDispatch();

  let { userId } = params;
  userId = parseInt(userId);
  const userId2 = useSelector(
    state => state.persistedReducer.userReducer.userId
  );
  const isSocialLogin = useSelector(
    state => state.persistedReducer.userReducer.isSocialLogin
  );

  const navigate = useNavigate();

  // state 값
  const [UserInfo, setUserInfo] = useState([]);
  const [IsModal, setIsModal] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [IsUpdateCompleted, setIsUpdateCompleted] = useState(false);

  //유저 정보 컴포넌트 로드시 불러옴
  useEffect(() => {
    onMypage();

    if (userId !== userId2) {
      navigate('/notfound');
    }
  }, []);

  //IsLoading state 값이 바뀌며 실행됨
  useEffect(() => {
    if (IsLoading) {
      const timeout = setTimeout(() => {
        setIsLoading(false);
        setIsUpdateCompleted(true);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [IsLoading]);

  //유저정보 불러오기
  const onMypage = async () => {
    try {
      const res = await authHttp.getMypage(userId);
      setUserInfo(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  //로그아웃 기능 실행 함수
  const logout = async () => {
    try {
      const res = await userHttp.getLogout();
    } catch (err) {
      console.log(err);
    }

    dispatch(logoutUser());

    alert('로그아웃이 완료되었습니다.');
    navigate('/');
  };

  //모달창 닫기
  const offModal = () => {
    setIsModal(false);
  };

  //회원탈퇴
  const onDeleteUser = async () => {
    try {
      const res = await authHttp.deleteUser(userId);
      setIsLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  const Props = {
    body: {
      text: '정말 탈퇴하시겠습니까?',
      icon: (
        <img src={`${process.env.PUBLIC_URL}/image/modal-icon.png`} alt='' />
      ),
      subText: <>탈퇴하면 회원 정보가 삭제되며 다시 복구가 어렵습니다.</>,
    },

    buttons: {
      btn: [
        {
          text: '탈퇴',
          onClick: onDeleteUser,
        },
        {
          text: '취소',
          onClick: offModal,
        },
      ],
    },
  };

  return (
    <>
      <Layout>
        <Wrap>
          <MyPageText>마이페이지</MyPageText>
          <UserWrap>
            <UserImgRound>
              <UserImg src={UserInfo.user_image} />
            </UserImgRound>
            {isSocialLogin ? (
              <UserTextBox>
                <UserText>
                  <span>닉네임</span>
                  {UserInfo.nickname}
                </UserText>
                <UserText>
                  <span>이메일</span>
                  {UserInfo.email}
                </UserText>
              </UserTextBox>
            ) : (
              <UserTextBox>
                <UserText>
                  <span>닉네임</span>
                  {UserInfo.nickname}
                </UserText>
                <UserText>
                  <span>아이디</span>
                  {UserInfo.username}
                </UserText>
                <UserText>
                  <span>이메일</span>
                  {UserInfo.email}
                </UserText>
              </UserTextBox>
            )}
          </UserWrap>
          <ContentsBox
            onClick={() => navigate(`/mypage/alarms/${UserInfo.userId}`)}
          >
            <Icon src='/image/mypage-m-alarm.png' />
            <IconText>댓글 알림</IconText>
            <Arrow src='/image/alarm-arrow.png' />
          </ContentsBox>
          <ContentsBox
            onClick={() => navigate(`/mypage/posts/${UserInfo.userId}`)}
          >
            <Icon src='/image/mypage-m-post.png' />
            <IconText>내가 작성한 글</IconText>
            <Arrow src='/image/alarm-arrow.png' />
          </ContentsBox>
          <ContentsBox
            onClick={() => navigate(`/mypage/likes/${UserInfo.userId}`)}
          >
            <Icon src='/image/mypage-m-like.png' />
            <IconText>내가 좋아요한 글</IconText>
            <Arrow src='/image/alarm-arrow.png' />
          </ContentsBox>
          <ContentsBox
            onClick={() => navigate(`/mypage/comments/${UserInfo.userId}`)}
          >
            <Icon src='/image/mypage-m-comment.png' />
            <IconText>내가 댓글 단 글</IconText>
            <Arrow src='/image/alarm-arrow.png' />
          </ContentsBox>
          <ContentsBox
            onClick={() => navigate(`/mypage/account/${UserInfo.userId}`)}
          >
            <Icon src='/image/mypage-m-account.png' />
            <IconText>설정</IconText>
            <Arrow src='/image/alarm-arrow.png' />
          </ContentsBox>
          <ContentsBox onClick={() => logout()}>
            <IconText gray>로그아웃</IconText>
          </ContentsBox>
          <ContentsBox bottom>
            <IconText gray onClick={() => setIsModal(true)}>
              회원탈퇴
            </IconText>
          </ContentsBox>
        </Wrap>
      </Layout>
      {IsModal && <Alert {...Props} />}
      {IsLoading && <LoadingPopup />}
      {IsUpdateCompleted && <CompletePopup category={''} sentence={'탈퇴가 완료되었습니다.'} />}
    </>
  );
};

const Wrap = styled.div`
  padding: 92px 0px 32px 0px;
  box-sizing: border-box;
  width: 100vw;
`;

const MyPageText = styled.div`
  font-size: 18px;
  font-weight: 800;
  color: #ed3419;
  padding-left: 16px;
`;

const UserWrap = styled.div`
  margin: 26px 0;
  display: flex;
  padding-left: 16px;
`;

const UserImgRound = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: #d9d9d9;
  border: 1px solid #ff4122;
  margin-right: 24px;
  position: relative;
  overflow: hidden;
`;

const UserImg = styled.img`
  height: 80px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const UserTextBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const UserText = styled.div`
  font-size: 14px;
  font-weight: 400;
  margin: 5px;

  span {
    font-weight: 700;
    margin-right: 8px;
  }
`;

const ContentsBox = styled.div`
  width: 100%;
  display: flex;
  border-bottom: ${props =>
    props.bottom ? ' 0.1px solid rgba(0, 0, 0, 0.1)' : ''};
  border-top: 0.1px solid rgba(0, 0, 0, 0.1);
  height: 76px;
  padding: 0 20px;
  box-sizing: border-box;
  align-items: center;
  cursor: pointer;
`;

const Icon = styled.img`
  height: 22px;
  margin-right: 12px;
`;

const IconText = styled.div`
  color: ${props => (props.gray ? '#828282' : '#3e4145')};
  font-size: 17px;
  font-weight: ${props => (props.gray ? '500' : '600')};
`;

const Arrow = styled.img`
  margin-left: auto;
`;

export default MyPageMobile;
