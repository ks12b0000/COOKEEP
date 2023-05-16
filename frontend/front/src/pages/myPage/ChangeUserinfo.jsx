import styled from '@emotion/styled';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import AuthHttp from '../../http/authHttp';
import UserHttp from '../../http/userHttp';
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
const userHttp = new UserHttp();

const ChangeUserinfo = () => {
  const params = useParams();
  let { userId } = params;
  userId = parseInt(userId);
  const userId2 = useSelector(
    state => state.persistedReducer.userReducer.userId
  );

  //ref 값
  const previewRef = useRef();
  const nicknameRef = useRef();
  const idRef = useRef();
  const emailRef = useRef();
  const currentPasswordRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

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

  // 인풋 값
  const [Nickname, setNickname] = useState('');
  const [Id, setId] = useState('');
  const [Email, setEmail] = useState('');
  const [CurrentPassword, setCurrentPassword] = useState('');
  const [Password1, setPassword1] = useState('');
  const [Password2, setPassword2] = useState('');

  // 중복확인 값
  const [CheckNickname, setCheckNickname] = useState(false);
  const [CheckId, setCheckId] = useState(false);
  const [CheckEmail, setCheckEmail] = useState(false);

  // 인풋 아래 에러문구
  const [NicknameText, setNicknameText] = useState('');
  const [IdText, setIdText] = useState('');
  const [EmailText, setEmailText] = useState('');
  const [CurrentPasswordText, setCurrentPasswordText] = useState('');
  const [PasswordText, setPasswordText] = useState('');

  //focus 색상 구분
  const [IsError, setIsError] = useState(false);

  //눈 state
  const [EyeVisible1, setEyeVisible1] = useState(false);
  const [EyeVisible2, setEyeVisible2] = useState(false);
  const [EyeVisible3, setEyeVisible3] = useState(false);

  //onSubmit함수를 위한 isDone 값
  const [IsPreviewDone, setIsPreviewDone] = useState(false);
  const [IsNicknameDone, setIsNicknameDone] = useState(false);
  const [IsIdDone, setIsIdDone] = useState(false);
  const [IsEmailDone, setIsEmailDone] = useState(false);
  const [IsPasswordDone, setIsPasswordDone] = useState(false);

  //현재 비밀번호 일치 여부
  const [IsPasswordRight, setIsPasswordRight] = useState(false);

  useEffect(() => {
    onMypage();

    if (userId !== userId2) {
      navigate('/notfound');
    }
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

  const onSubmit = async e => {
    e.preventDefault();

    if (Profile) {
      if (!IsPreviewDone) {
        sendProfile();
        setIsPreviewDone(true);
      }
    }

    if (Nickname) {
      if (!IsNicknameDone) {
        if (!CheckNickname) {
          setIsError(true);
          nicknameRef.current.focus();
          setNicknameText('닉네임 중복검사를 진행해 주세요');
          setTimeout(() => {
            setNicknameText('');
            setIsError(false);
          }, 5000);
          return;
        }
        if (Nickname.length < 3) {
          setIsError(true);
          nicknameRef.current.focus();
          setNicknameText('닉네임 중복검사를 진행해 주세요');
          setTimeout(() => {
            setNicknameText('');
            setIsError(false);
          }, 5000);
          return;
        } else {
          onChangeNickname();
          setIsNicknameDone(true);
        }
      }
    }

    if (Id) {
      if (!IsIdDone) {
        if (!CheckId) {
          setIsError(true);
          idRef.current.focus();
          setIdText('아이디 중복검사를 진행해 주세요');
          setTimeout(() => {
            setIdText('');
            setIsError(false);
          }, 5000);
          return;
        } else {
          onChangeId();
          setIsIdDone(true);
        }
      }
    }

    if (Email) {
      if (!IsEmailDone) {
        if (!CheckEmail) {
          setIsError(true);
          emailRef.current.focus();
          setEmailText('이메일 중복검사를 진행해 주세요');
          setTimeout(() => {
            setEmailText('');
            setIsError(false);
          }, 5000);
          return;
        } else {
          onChangeEmail();
          setIsEmailDone(true);
        }
      }
    }

    if (Password1) {
      const body = {
        password: CurrentPassword,
      };

      try {
        const res = await authHttp.postCheckPassword(userId, body);
        console.log(res);
        if (res.data.code === 1000) {
          onChangePassword();
        }
      } catch (err) {
        console.log(err);
        setIsError(true);
        currentPasswordRef.current.focus();
        setCurrentPasswordText(err.response.data.message);
        setTimeout(() => {
          setCurrentPasswordText('');
          setIsError(false);
        }, 5000);
        return;
      }

      if (Password1 !== Password2) {
        setIsError(true);
        passwordRef.current.focus();
        setPasswordText('비밀번호와 비밀번호 확인 값이 일치하지 않습니다');

        setTimeout(() => {
          setIsError(false);
          setPasswordText('');
        }, 5000);
        return;
      } else {
        onChangePassword();
      }
    }

    navigate(`/mypage/account/${userId}`);
  };

  // 닉네임 업데이트 및 중복확인

  const onChangeNickname = async () => {
    const body = {
      nickname: Nickname,
    };

    try {
      const res = await authHttp.putUpdateNickname(userId, body);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const onCheckNickname = async e => {
    e.preventDefault();

    if (Nickname === '') {
      setIsError(true);
      nicknameRef.current.focus();
      setNicknameText('닉네임을 입력해주세요');
      setTimeout(() => {
        setNicknameText('');
        setIsError(false);
      }, 5000);
    } else {
      try {
        const res = await userHttp.getCheckNickname(Id);
        console.log(res);

        if (!res.data.result.isDuplicate) {
          setCheckNickname(true);
          alert(res.data.message);
        }
      } catch (err) {
        console.log(err);
        alert(err.response.data.message);
      }
    }
  };

  // 아이디 업데이트 및 중복확인
  const onChangeId = async () => {
    const body = {
      updateUsername: Id,
    };

    try {
      const res = await authHttp.putUpdateUsername(userId, body);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const onCheckId = async e => {
    e.preventDefault();
    const idRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{5,}$/;

    if (Id === '') {
      setIsError(true);
      idRef.current.focus();
      setIdText('아이디를 입력해 주세요');
      setTimeout(() => {
        setIdText('');
        setIsError(false);
      }, 5000);
    } else if (idRegex.test(Id) === false) {
      setIsError(true);
      idRef.current.focus();
      setIdText('영문, 숫자 조합 5자리 이상으로 입력해주세요');
      setTimeout(() => {
        setIdText('');
        setIsError(false);
      }, 5000);
    } else {
      try {
        const res = await userHttp.getCheckUsername(Id);
        console.log(res);

        if (!res.data.result.isDuplicate) {
          setCheckId(true);
          alert(res.data.message);
        }
      } catch (err) {
        console.log(err);
        alert(err.response.data.message);
      }
    }
  };

  //이메일 업데이트 및 중복확인
  const onChangeEmail = async () => {
    const body = {
      updateEmail: Email,
    };

    try {
      const res = await authHttp.putUpdateEmail(userId, body);
      console.log(res);
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    }
  };

  const onCheckEmail = async e => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (Email === '') {
      console.log();
      setIsError(true);
      emailRef.current.focus();
      setEmailText('이메일을 입력해 주세요');
      setTimeout(() => {
        setEmailText('');
        setIsError(false);
      }, 5000);
    } else if (emailRegex.test(Email) === false) {
      setIsError(true);
      emailRef.current.focus();
      setEmailText('이메일 형식으로 입력해주세요');
      setTimeout(() => {
        setEmailText('');
        setIsError(false);
      }, 5000);
    } else {
      try {
        const res = await userHttp.getCheckEmail(Email);
        console.log(res);

        if (!res.data.result.isDuplicate) {
          setCheckEmail(true);
          alert(res.data.message);
        }
      } catch (err) {
        console.log(err);
        alert(err.response.data.message);
      }
    }
  };

  //비밀번호 변경 실행함수
  const onChangePassword = async () => {
    const body = {
      updatePassword: Password1,
    };

    if (Password1 === Password2) {
      try {
        const res = await authHttp.putUpdatePassword(userId, body);
        console.log(res);
      } catch (err) {
        setIsError(true);
        passwordRef.current.focus();
        setPasswordText('err.response.data.message');

        setTimeout(() => {
          setIsError(false);
          setPasswordText('');
        }, 5000);
      }
    }
  };

  // 눈 토글
  const eyeToggle = (e, Num) => {
    e.preventDefault();

    if (Num === 1) {
      setEyeVisible1(prev => !prev);
    } else if (Num === 2) {
      setEyeVisible2(prev => !prev);
    } else if (Num === 3) {
      setEyeVisible3(prev => !prev);
    }
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
            <AccountWrap top>
              <ProfileRound>
                {Preview ? (
                  <ProfileImg src={Preview} alt='프로필 이미지' />
                ) : (
                  ''
                )}
              </ProfileRound>
              <ProfileButton htmlFor='profileImg'>프로필 변경</ProfileButton>
              <ProfileInput
                type='file'
                accept='image/*'
                id='profileImg'
                onChange={savePreview}
                ref={previewRef}
              />

              {isSocialLogin ? (
                <>
                  <InputTitle>닉네임</InputTitle>
                  <IdWrap>
                    {CheckNickname === true ? (
                      <IdInput value={Nickname} disabled />
                    ) : (
                      <IdInput
                        value={Nickname}
                        type='text'
                        ref={nicknameRef}
                        placeholder='닉네임 입력하세요'
                        onChange={e => {
                          setNickname(e.currentTarget.value);
                        }}
                        isError={IsError}
                      />
                    )}
                    <IdButton
                      onClick={e => onCheckNickname(e)}
                      isFilled={Nickname !== ''}
                    >
                      중복확인
                    </IdButton>
                    {NicknameText && (
                      <SignError>
                        <ErrorMark />
                        {NicknameText}
                      </SignError>
                    )}
                  </IdWrap>
                </>
              ) : (
                <>
                  <InputTitle>닉네임</InputTitle>
                  <IdWrap>
                    {CheckNickname === true ? (
                      <IdInput value={Nickname} disabled />
                    ) : (
                      <IdInput
                        value={Nickname}
                        type='text'
                        ref={nicknameRef}
                        placeholder={UserInfo.nickname}
                        onChange={e => {
                          setNickname(e.currentTarget.value);
                        }}
                        isError={IsError}
                      />
                    )}
                    <IdButton
                      onClick={e => onCheckNickname(e)}
                      isFilled={Nickname !== ''}
                    >
                      중복확인
                    </IdButton>
                    {NicknameText && (
                      <SignError>
                        <ErrorMark />
                        {NicknameText}
                      </SignError>
                    )}
                  </IdWrap>

                  <InputTitle>아이디</InputTitle>
                  <IdWrap>
                    {CheckId === true ? (
                      <IdInput value={Id} disabled />
                    ) : (
                      <IdInput
                        value={Id}
                        type='text'
                        ref={idRef}
                        placeholder={UserInfo.username}
                        onChange={e => {
                          setId(e.currentTarget.value);
                        }}
                        isError={IsError}
                      />
                    )}
                    <IdButton onClick={e => onCheckId(e)} isFilled={Id !== ''}>
                      중복확인
                    </IdButton>
                    {IdText && (
                      <SignError>
                        <ErrorMark />
                        {IdText}
                      </SignError>
                    )}
                  </IdWrap>

                  <InputTitle>이메일</InputTitle>
                  <IdWrap>
                    {CheckEmail === true ? (
                      <IdInput value={Email} disabled />
                    ) : (
                      <IdInput
                        value={Email}
                        type='email'
                        ref={emailRef}
                        placeholder='이메일을 입력하세요'
                        onChange={e => {
                          setEmail(e.currentTarget.value);
                        }}
                        isError={IsError}
                      />
                    )}
                    <IdButton
                      onClick={e => onCheckEmail(e)}
                      isFilled={Email !== ''}
                    >
                      중복확인
                    </IdButton>
                    {EmailText && (
                      <SignError>
                        <ErrorMark />
                        {EmailText}
                      </SignError>
                    )}
                  </IdWrap>

                  {isChangePassword ? (
                    <>
                      <InputTitle>기존 비밀번호</InputTitle>
                      <SignInputWrap>
                        <SignInput
                          value={CurrentPassword}
                          type={EyeVisible1 ? 'text' : 'password'}
                          ref={currentPasswordRef}
                          placeholder='비밀번호를 입력하세요'
                          onChange={e => {
                            setCurrentPassword(e.currentTarget.value);
                          }}
                          isError={IsError}
                          autocomplete='off'
                        />
                        {EyeVisible1 ? (
                          <EyeImg
                            onClick={e => eyeToggle(e, 1)}
                            EyeVisible={EyeVisible1}
                            src='/image/eye-open.png'
                            alt='eye open'
                          />
                        ) : (
                          <EyeImg
                            onClick={e => eyeToggle(e, 1)}
                            EyeVisible={EyeVisible1}
                            src='/image/eye.png'
                            alt='eye close'
                          />
                        )}
                        {CurrentPasswordText && (
                          <SignError>
                            <ErrorMark />
                            {CurrentPasswordText}
                          </SignError>
                        )}
                      </SignInputWrap>

                      <InputTitle>새 비밀번호</InputTitle>
                      <SignInputWrap>
                        <SignInput
                          value={Password1}
                          type={EyeVisible2 ? 'text' : 'password'}
                          ref={passwordRef}
                          placeholder='비밀번호를 입력하세요'
                          onChange={e => {
                            setPassword1(e.currentTarget.value);
                          }}
                          isError={IsError}
                          autocomplete='off'
                        />
                        {EyeVisible2 ? (
                          <EyeImg
                            onClick={e => eyeToggle(e, 2)}
                            EyeVisible={EyeVisible2}
                            src='/image/eye-open.png'
                            alt='eye open'
                          />
                        ) : (
                          <EyeImg
                            onClick={e => eyeToggle(e, 2)}
                            EyeVisible={EyeVisible2}
                            src='/image/eye.png'
                            alt='eye close'
                          />
                        )}
                        {PasswordText && (
                          <SignError>
                            <ErrorMark />
                            {PasswordText}
                          </SignError>
                        )}
                      </SignInputWrap>

                      <InputTitle>새 비밀번호 확인</InputTitle>
                      <SignInputWrap>
                        <SignInput
                          value={Password2}
                          type={EyeVisible3 ? 'text' : 'password'}
                          placeholder='비밀번호를 입력하세요'
                          onChange={e => {
                            setPassword2(e.currentTarget.value);
                          }}
                          isError={IsError}
                          autocomplete='off'
                        />
                        {EyeVisible3 ? (
                          <EyeImg
                            onClick={e => eyeToggle(e, 3)}
                            EyeVisible={EyeVisible3}
                            src='/image/eye-open.png'
                            alt='eye open'
                          />
                        ) : (
                          <EyeImg
                            onClick={e => eyeToggle(e, 3)}
                            EyeVisible={EyeVisible3}
                            src='/image/eye.png'
                            alt='eye close'
                          />
                        )}
                      </SignInputWrap>
                    </>
                  ) : (
                    <Button button onClick={() => setIsChangePassword(true)}>
                      비밀번호 변경
                    </Button>
                  )}
                </>
              )}
            </AccountWrap>
            <SubmitButton onClick={e => onSubmit(e)}>저장</SubmitButton>
          </PageWrap>
        </BoxWrap>
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
    margin-bottom: 10px;
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
    margin-bottom: 5px;
    font-weight: 600;
  }
`;

const IdWrap = styled.div`
  width: 343px;
  height: 48px;
  position: relative;
  display: grid;
  grid-template-columns: 62% 36%;
  margin-bottom: 25px;
  justify-content: space-between;

  @media screen and (max-width: 1700px) {
    width: 320px;
    height: 35px;
    margin-bottom: 20px;
  }
`;

const IdInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 20px;
  box-sizing: border-box;
  border: 1px solid #ced4da;
  outline: none;
  font-weight: 300;
  color: #000000;
  border-radius: 7px;
  font-size: 16px;

  ::placeholder {
    font-size: 16px;
    font-weight: 300;
    color: #ced4da;
  }

  &:focus {
    border: ${({ isError }) =>
      isError ? '1px solid #FF4122' : '1px solid#FFA590'};
    background-color: ${({ isError }) => (isError ? '#FFEAE4' : 'white')};
    box-shadow: none;
  }

  @media screen and (max-width: 1700px) {
    height: 35px;

    ::placeholder {
      font-size: 14px;
    }
  }
`;

const IdButton = styled.button`
  background-color: white;
  border: none;
  box-sizing: border-box;
  width: 100%;
  height: 48px;
  color: ${props => (props.isFilled ? '#FF4122' : '#dcdcdc')};
  font-size: 16px;
  border: ${props =>
    props.isFilled ? '1px solid #FF4122' : '1px solid #dcdcdc'};
  border-radius: 7px;
  font-weight: 400;
  transition: 0.2s;
  cursor: ${props => (props.isFilled ? 'pointer' : 'default')};

  :hover {
    background-color: ${props => (props.isFilled ? '#FF4122' : 'white')};
    color: ${props => (props.isFilled ? 'white' : '#dcdcdc')};
  }

  @media screen and (max-width: 1700px) {
    height: 35px;
  }
`;

const SignInputWrap = styled.form`
  width: 343px;
  height: 48px;
  position: relative;
  margin-bottom: 25px;

  @media screen and (max-width: 1700px) {
    width: 320px;
    height: 35px;
    margin-bottom: 20px;
  }
`;

const SignInput = styled.input`
  width: 343px;
  height: 48px;
  padding: 0 20px;
  box-sizing: border-box;
  border: 1px solid #ced4da;
  outline: none;
  font-weight: 300;
  color: #000000;
  border-radius: 7px;
  font-size: 16px;

  ::placeholder {
    font-size: 16px;
    font-weight: 300;
    color: #ced4da;
  }

  &:focus {
    border: ${({ isError }) =>
      isError ? '1px solid #FF4122' : '1px solid #FFA590'};
    background-color: ${({ isError }) => (isError ? '#FFEAE4' : 'white')};
    box-shadow: none;
  }

  @media screen and (max-width: 1700px) {
    width: 320px;
    height: 35px;

    ::placeholder {
      font-size: 14px;
    }
  }
`;

const EyeImg = styled.img`
  position: absolute;
  top: ${props => (props.EyeVisible ? '33%' : '30%')};
  left: 88%;
  cursor: pointer;

  @media screen and (max-width: 1700px) {
    top: ${props => (props.EyeVisible ? '31%' : '28%')};
    width: 20px;
  }
`;

const SignError = styled.div`
  color: #e52f2f;
  font-size: 12px;
  font-weight: 400;
  margin-top: 3px;
  width: 343px;
  display: flex;
  align-items: center;
`;

const ErrorMark = styled.div`
  background: url(/image/caution.png);
  width: 12px;
  height: 12px;
  margin-right: 3px;
  background-repeat: no-repeat;
  margin-bottom: 1px;
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