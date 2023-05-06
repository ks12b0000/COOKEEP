import styled from '@emotion/styled';
import { useRef, useState } from 'react';
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
import { AccountWrap, ProfileRound, Button } from './MyAccount';

const authHttp = new AuthHttp();

const ChangeUserinfo = () => {
  const params = useParams();
  const { userId } = params;
  const previewRef = useRef();

  const navigate = useNavigate();

  const username = useSelector(
    state => state.persistedReducer.userReducer.username
  );

  const isSocialLogin = useSelector(
    state => state.persistedReducer.userReducer.isSocialLogin
  );

  // state 값
  const [UserInfo, setUserInfo] = useState([]);

  //비밀번호 변경 클릭 시 ui 변경
  const [isChangePassword, setIsChangePassword] = useState(false);

  //프로필 이미지 프리뷰
  const [Preview, setPreview] = useState('');

  // 서버에 보내는 프로필
  const [Profile, setProfile] = useState('');

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

  //프로필 미리보기 보여주는 함수
  const savePreview = () => {
    if (!previewRef.current || !previewRef.current.files) {
      return;
    }

    //Preview sate값 저장
    const file = previewRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };

    //서버 전송용 formdata Profile state값 저장
    const formData = new FormData();
    formData.append('image', previewRef.current.files[0]);
    setProfile(formData);
    // setProfile(previewRef.current.files[0]);
  };

  //프로필 사진 서버로 전송하는 함수
  const sendProfile = async () => {
    try {
      const res = await authHttp.postProfile(userId, Profile);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log('preview', Preview);
    console.log('profile', Profile);

    if (Preview) {
      sendProfile();
    }

    navigate(`/mypage/changeuserinfo/${userId}`);
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
                    <ProfileRound>
                      <img />
                    </ProfileRound>
                    <ProfileButton
                      placeholder='프로필 변경'
                      type='file'
                      accept='image/*'
                    />
                    <InputTitle>닉네임</InputTitle>
                    <InputWrap marginBottom>
                      <InfoInput />
                      <CheckButton>중복 확인</CheckButton>
                    </InputWrap>
                  </AccountWrap>
                ) : (
                  <AccountWrap>
                    <ProfileRound>
                      {Preview ? (
                        <ProfileImg src={Preview} alt='프로필 이미지' />
                      ) : (
                        ''
                      )}
                    </ProfileRound>
                    <ProfileButton htmlFor='profileImg'>
                      프로필 변경
                    </ProfileButton>
                    <ProfileInput
                      type='file'
                      accept='image/*'
                      id='profileImg'
                      onChange={savePreview}
                      ref={previewRef}
                    />
                    <InputTitle>닉네임</InputTitle>
                    <InputWrap marginBottom>
                      <InfoInput />
                      <CheckButton>중복 확인</CheckButton>
                    </InputWrap>
                    <InputTitle>아이디</InputTitle>
                    <InputWrap marginBottom>
                      <InfoInput />
                      <CheckButton>중복 확인</CheckButton>
                    </InputWrap>
                    <InputTitle>이메일</InputTitle>
                    <InputWrap marginBottom={isChangePassword}>
                      <InfoInput />
                      <CheckButton>중복 확인</CheckButton>
                    </InputWrap>
                    {isChangePassword ? (
                      <>
                        <InputTitle>기존 비밀번호</InputTitle>
                        <InputWrap marginBottom>
                          <InfoInput />
                          <CheckButton>중복 확인</CheckButton>
                        </InputWrap>

                        <InputTitle>새 비밀번호</InputTitle>
                        <InputWrap marginBottom>
                          <InfoInput />
                          <CheckButton>중복 확인</CheckButton>
                        </InputWrap>
                        <InputTitle>새 비밀번호 확인</InputTitle>
                        <InputWrap marginBottom>
                          <InfoInput />
                          <CheckButton>중복 확인</CheckButton>
                        </InputWrap>
                      </>
                    ) : (
                      <Button button onClick={() => setIsChangePassword(true)}>
                        비밀번호 변경
                      </Button>
                    )}
                  </AccountWrap>
                )}
                <SubmitButton onClick={e => onSubmit(e)}>저장</SubmitButton>
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

const ProfileButton = styled.label`
  width: 130px;
  height: 50px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  border: 1px solid #ff4122;
  color: #ff4122;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
  cursor: pointer;
  margin-bottom: 50px;
  box-sizing: border-box;

  &:hover {
    background-color: #ff4122;
    color: white;
  }

  @media screen and (max-width: 1700px) {
    height: 35px;
    margin-bottom: 20px;
    font-size: 14px;
  }
`;

const ProfileInput = styled.input`
  display: none;
`;

const ProfileImg = styled.img`
  height: 100%;
  width: auto;
`;

const InputTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 10px;
  width: 343px;
  text-align: left;

  @media screen and (max-width: 1700px) {
    width: 320px;
    font-size: 14px;
    margin-bottom: 7px;
    font-weight: 600;
  }
`;

const InputWrap = styled.div`
  display: flex;
  margin-bottom: ${props => (props.marginBottom ? '10px' : '30px')};
  width: 343px;
  justify-content: space-between;

  @media screen and (max-width: 1700px) {
    width: 320px;
    margin-bottom: ${props => (props.marginBottom ? '7px' : '20px')};
  }
`;

const InfoInput = styled.input`
  width: 220px;
  height: 50px;
  padding: 5px 15px;
  box-sizing: border-box;
  font-size: 16px;
  color: #000000;
  border: 1px solid #a9a9af;
  border-radius: 5px;

  ::placeholder {
    font-size: 16px;
    color: #000000;
  }

  @media screen and (max-width: 1700px) {
    width: 210px;
    height: 35px;
    font-size: 14px;

    ::placeholder {
      font-size: 14px;
    }
  }
`;

const CheckButton = styled.div`
  width: 100px;
  height: 50px;
  color: #dcdcdc;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #dcdcdc;
  border-radius: 5px;

  @media screen and (max-width: 1700px) {
    width: 95px;
    height: 35px;
    font-size: 14x;
  }
`;

const SubmitButton = styled.div`
  position: absolute;
  width: 120px;
  height: 50px;
  border-radius: 5px;
  background-color: #ff4122;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  top: 3%;
  left: 86%;
  color: white;
  font-weight: 600;
  font-size: 16px;

  @media screen and (max-width: 1700px) {
    width: 110px;
    height: 35px;
    font-size: 14px;
  }
`;

export default ChangeUserinfo;
