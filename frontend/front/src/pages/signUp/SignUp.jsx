import { useState, useRef } from 'react';
import styled from '@emotion/styled';
import UserHttp from '../../http/userHttp';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import AgreeForm from '../../components/signUp/AgreeForm';
import Header from '../../components/layout/header/Header';
import Footer from '../../components/layout/footer/Footer';

const userHttp = new UserHttp();

function SignUp() {
  const navigate = useNavigate();
  const idRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  //카카오 로그인 요청 주소
  const KakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=7c7c8648e57e3b651c5125b11996d35b&redirect_uri=https://www.teamprojectvv.shop/callback/kakao&response_type=code`;

  //구글 로그인 요청 주소
  const googleURL = `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=79582605278-52s8lmhreqecgap848deg5hls42gkpdc.apps.googleusercontent.com&redirect_uri=https://www.teamprojectvv.shop/callback/google&response_type=code&scope=email`;

  //네이버 로그인 요청 주소
  const state = Math.floor(new Date().getTime() + Math.random() * 1000);
  const NaverURL = `https://nid.naver.com/oauth2.0/authorize?client_id=92iO7IYduFlBEHoQfTkR&response_type=code&redirect_uri=https://www.teamprojectvv.shop/callback/naver&state=${state}`;

  //state
  //회원가입 시 서버 body에 보낼 정보
  const [Username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  //패스워드 일치여부 확인
  const [CheckPassword, setCheckPassword] = useState('');

  //아이디 중복여부 확인
  const [CheckUsername, setCheckUsername] = useState(false);

  //이메일 중복여부 확인
  const [CheckEmail, setCheckEmail] = useState(false);

  //이용약관 동의여부 확인
  const [CheckAgree, setCheckAgree] = useState(false);

  //이용약관 동의 모달창
  const [AgreeModal, setAgreeModal] = useState(false);

  //비밀번호 보이기 여부 체크
  const [EyeVisible1, setEyeVisible1] = useState(false);
  const [EyeVisible2, setEyeVisible2] = useState(false);

  //회원가입 완료시 다른 모달창을 띄움
  const [IsDone, setIsDone] = useState(false);

  //에러 시 메세지 문구
  const [IdText, setIdText] = useState('');
  const [EmailText, setEmailText] = useState('');
  const [PasswordText, setPasswordText] = useState('');

  //focus 색상 구분
  const [IsError, setIsError] = useState(false);

  //function
  //회원가입 실행 함수
  const onSignUp = async e => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{5,}$/;

    const body = {
      username: Username,
      email: Email,
      password: Password,
    };

    if (!(Username && Email && Password && CheckPassword)) {
      return alert('모든 값을 입력해주세요');
    } else if (passwordRegex.test(Password) === false) {
      setIsError(true);
      passwordRef.current.focus();
      setPasswordText('영문, 숫자 조합 5자리 이상으로 입력해주세요');
      setTimeout(() => {
        setPasswordText('');
        setIsError(false);
      }, 5000);
    } else if (Password !== CheckPassword) {
      setIsError(true);
      passwordRef.current.focus();
      setPasswordText('비밀번호와 비밀번호 확인 값이 일치하지 않습니다');
      setTimeout(() => {
        setPasswordText('');
        setIsError(false);
      }, 5000);
    } else if (!CheckUsername) {
      setIsError(true);
      idRef.current.focus();
      setIdText('아이디 중복검사를 진행해 주세요');
      setTimeout(() => {
        setIdText('');
        setIsError(false);
      }, 5000);
    } else if (!CheckEmail) {
      setIsError(true);
      emailRef.current.focus();
      setEmailText('이메일 중복검사를 진행해 주세요');
      setTimeout(() => {
        setEmailText('');
        setIsError(false);
      }, 5000);
    } else if (!CheckAgree) {
      return alert('회원가입 약관동의를 진행해 주세요');
    } else {
      try {
        const res = await userHttp.postSignUp(body);
        console.log(res);
        setIsDone(true);
      } catch (err) {
        console.log(err);
        alert(err.response.data.message);
      }
    }
  };

  //아이디 중복체크 실행 함수
  const onCheckUsername = async e => {
    e.preventDefault();
    const idRegex = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d]{5,13}$/;

    if (Username === '') {
      setIsError(true);
      idRef.current.focus();
      setIdText('아이디를 입력해 주세요');
      setTimeout(() => {
        setIdText('');
        setIsError(false);
      }, 5000);
    } else if (idRegex.test(Username) === false) {
      setIsError(true);
      idRef.current.focus();
      setIdText('영문, 숫자 조합 5자리 이상으로 입력해주세요');
      setTimeout(() => {
        setIdText('');
        setIsError(false);
      }, 5000);
    } else {
      try {
        const res = await userHttp.getCheckUsername(Username);
        console.log(res);

        if (!res.data.result.isDuplicate) {
          setCheckUsername(true);
          alert(res.data.message);
        }
      } catch (err) {
        console.log(err);
        alert(err.response.data.message);
      }
    }
  };

  //이메일 중복체크 실행 함수
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

  //패스워드 표시 여부 토글
  const eye1Toggle = e => {
    e.preventDefault();
    if (EyeVisible1) {
      setEyeVisible1(false);
    } else {
      setEyeVisible1(true);
    }
  };

  const eye2Toggle = e => {
    e.preventDefault();
    if (EyeVisible2) {
      setEyeVisible2(false);
    } else {
      setEyeVisible2(true);
    }
  };

  return (
    <>
      <SignBackground IsDone={IsDone}>
        <Link to='/'>
          <Logo />
        </Link>
        {IsDone ? (
          <DoneModalWrap>
            <CheckImg />
            <DoneTitle>회원가입이 완료되었습니다.</DoneTitle>
            <DoneText>
              로그인 후 나만의 프로필을 설정하여
              <br /> COOKEEP을 자유롭게 이용해 보세요!
            </DoneText>
            <Link to='/login'>
              <DoneButton>로그인 하러가기</DoneButton>
            </Link>
          </DoneModalWrap>
        ) : (
          <SignWrap>
            <SignTitle>JOIN</SignTitle>
            {/* 아이디 입력 */}
            <SignName>아이디</SignName>
            <IdWrap>
              {CheckUsername === true ? (
                <IdInput value={Username} disabled />
              ) : (
                <IdInput
                  value={Username}
                  type='id'
                  ref={idRef}
                  placeholder='영문, 숫자 조합 5자리 이상'
                  onChange={e => {
                    setUsername(e.currentTarget.value);
                  }}
                  isError={IsError}
                />
              )}
              <IdButton
                onClick={e => onCheckUsername(e)}
                isFilled={Username !== ''}
              >
                중복확인
              </IdButton>
              {IdText && (
                <SignError>
                  <ErrorMark />
                  {IdText}
                </SignError>
              )}
            </IdWrap>
            {/* 이메일 입력 */}
            <SignName>이메일</SignName>
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
              <IdButton onClick={e => onCheckEmail(e)} isFilled={Email !== ''}>
                중복확인
              </IdButton>
              {EmailText && (
                <SignError>
                  <ErrorMark />
                  {EmailText}
                </SignError>
              )}
            </IdWrap>
            {/* 비밀번호 입력 */}
            <SignName>비밀번호</SignName>
            <SignInputWrap>
              <SignInput
                value={Password}
                type={EyeVisible1 ? 'text' : 'password'}
                ref={passwordRef}
                placeholder='비밀번호를 입력하세요'
                onChange={e => {
                  setPassword(e.currentTarget.value);
                }}
                isError={IsError}
              />
              {EyeVisible1 ? (
                <EyeImg
                  onClick={e => eye1Toggle(e)}
                  EyeVisible={EyeVisible1}
                  src='/image/eye-open.png'
                  alt='eye open'
                />
              ) : (
                <EyeImg
                  onClick={e => eye1Toggle(e)}
                  EyeVisible={EyeVisible1}
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

            {/* 비밀번호확인 입력 */}
            <SignName>비밀번호 확인</SignName>
            <SignInputWrap>
              <SignInput
                value={CheckPassword}
                type={EyeVisible2 ? 'text' : 'password'}
                placeholder='동일한 비밀번호를 입력해주세요'
                onChange={e => {
                  setCheckPassword(e.currentTarget.value);
                }}
                isError={IsError}
              />
              {EyeVisible2 ? (
                <EyeImg
                  onClick={e => eye2Toggle(e)}
                  EyeVisible={EyeVisible2}
                  src='/image/eye-open.png'
                  alt='eye open'
                />
              ) : (
                <EyeImg
                  onClick={e => eye2Toggle(e)}
                  EyeVisible={EyeVisible2}
                  src='/image/eye.png'
                  alt='eye close'
                />
              )}
            </SignInputWrap>
            <AgreeText onClick={() => setAgreeModal(true)}>
              {CheckAgree ? (
                <img src='/image/check.png' alt='checked' />
              ) : (
                <img src='/image/check-x.png' alt='checked' />
              )}
              회원가입 약관동의
            </AgreeText>
            <SignButton onClick={e => onSignUp(e)}>가입하기</SignButton>
            <OtherTextWrap>
              <Line />
              <OtherText>간편 회원가입</OtherText>
              <Line />
            </OtherTextWrap>
            <OtherLoginWrap>
              <a href={NaverURL}>
                <OtherLogin>
                  <img src='/image/naver.png' alt='naver-logo' />
                  <div>네이버로 시작하기</div>
                </OtherLogin>
              </a>
              <a href={KakaoURL}>
                <OtherLogin>
                  <img src='/image/kakao.png' alt='kakao-logo' />
                  <div>카카오로 시작하기</div>
                </OtherLogin>
              </a>
              <a href={googleURL}>
                <OtherLogin>
                  <img src='/image/google.png' alt='google-logo' />
                  <div>구글로 시작하기</div>
                </OtherLogin>
              </a>
            </OtherLoginWrap>
            <LoginAskWrap>
              <LoginAskText>이미 계정이 있으신가요?</LoginAskText>
              <Link to='/login'>
                <LoginAskLink>로그인</LoginAskLink>
              </Link>
            </LoginAskWrap>
            {AgreeModal ? (
              <AgreeForm
                setAgreeModal={setAgreeModal}
                setCheckAgree={setCheckAgree}
              />
            ) : (
              <></>
            )}
          </SignWrap>
        )}
      </SignBackground>
    </>
  );
}

const SignBackground = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: ${props => (props.IsDone ? '100vh' : 'auto')};
  background: url(/image/login-back.jpg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  padding: ${props => (props.IsDone ? '0 0 50px 0' : '50px 0 100px 0')};
  box-sizing: ${props => (props.IsDone ? 'border-box' : '')};
`;

const Logo = styled.div`
  margin-top: 50px;
  background: url(/image/LOGO.png);
  width: 260px;
  height: 50px;
  background-size: 260px;
  background-repeat: no-repeat;
  margin-bottom: 30px;
  position: relative;
  top: 0;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    top: -3px;
  }
`;

const SignWrap = styled.div`
  position: relative;
  width: 470px;
  height: 800px;
  background-color: white;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

const SignTitle = styled.div`
  color: #ff4122;
  font-size: 24px;
  margin-bottom: 25px;
  font-weight: 700;
`;

const SignName = styled.div`
  color: #000000;
  text-align: left;
  font-size: 16px;
  width: 343px;
  font-weight: 500;
  margin-bottom: 8px;
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

const SignInputWrap = styled.div`
  width: 343px;
  height: 48px;
  position: relative;
  margin-bottom: 25px;
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
`;

const EyeImg = styled.img`
  position: absolute;
  top: ${props => (props.EyeVisible ? '33%' : '30%')};
  left: 88%;
  cursor: pointer;
`;

const IdWrap = styled.div`
  width: 343px;
  height: 48px;
  position: relative;
  display: grid;
  grid-template-columns: 62% 36%;
  margin-bottom: 25px;
  justify-content: space-between;
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
`;

const AgreeText = styled.div`
  width: 343px;
  text-align: left;
  font-size: 16px;
  color: #9ca1a7;
  cursor: pointer;
  font-weight: 400;

  img {
    width: 18px;
    height: 18px;
    margin-right: 5px;
    margin-bottom: 4px;
    opacity: 0.8;
  }
`;

const SignButton = styled.button`
  width: 343px;
  height: 51px;
  background-color: #ff4122;
  border: none;
  border-radius: 7px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1px;
  margin-top: 15px;
  cursor: pointer;
`;

const OtherTextWrap = styled.div`
  display: grid;
  width: 340px;
  height: 30px;
  grid-template-columns: 33% 27% 33%;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const Line = styled.div`
  width: 100%;
  height: 0.1px;
  background-color: #9a9a9a;
`;

const OtherText = styled.div`
  color: #9a9a9a;
  font-weight: 300;
  font-size: 14px;
  text-align: center;
`;

const OtherLoginWrap = styled.div`
  display: flex;
  width: 300px;
  justify-content: space-between;
  margin-top: 20px;
`;

const OtherLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 1px 3px;
    cursor: pointer;
  }
  div {
    text-align: center;
    margin-top: 10px;
    color: #5a5c5f;
    font-weight: 300;
    font-size: 12px;
  }
`;

const LoginAskWrap = styled.div`
  width: 320px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
`;

const LoginAskText = styled.div`
  color: #9a9a9a;
  font-weight: 300;
  font-size: 12px;
`;

const LoginAskLink = styled.div`
  color: #ff8164;
  text-decoration: underline;
  font-size: 12px;
  margin-left: 10px;
`;

const DoneModalWrap = styled.div`
  position: relative;
  width: 470px;
  height: 390px;
  background-color: white;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

const CheckImg = styled.div`
  width: 45px;
  height: 45px;
  background-size: 44px;
  background: url(/image/check-mark.png);
`;

const DoneTitle = styled.div`
  color: #ff4122;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  margin-top: 30px;
`;

const DoneText = styled.div`
  width: 241px;
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;
  text-align: center;
  color: #000000;
  margin-top: 40px;
`;

const DoneButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 343px;
  height: 51px;
  border-radius: 5px;
  margin-top: 40px;
  background-color: #ff4122;
  cursor: pointer;
  color: white;
  font-weight: 600;
  font-size: 16px;
`;

export default SignUp;
