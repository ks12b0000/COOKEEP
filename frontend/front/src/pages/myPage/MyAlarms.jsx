import styled from '@emotion/styled';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/reducer/userSlice';
import AuthHttp from '../../http/authHttp';
import UserInfoChange from '../../components/mypage/UserInfoChange';
import Header from '../../components/layout/header/Header';
import Footer from '../../components/layout/footer/Footer';
import { Link } from 'react-router-dom';
import MypageNav from '../../components/mypage/myPageNav';

const authHttp = new AuthHttp();

const MyAlarms = () => {
  const params = useParams();
  const { userId } = params;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSocialLogin = useSelector(
    state => state.persistedReducer.userReducer.isSocialLogin
  );

  const username = useSelector(
    state => state.persistedReducer.userReducer.username
  );

  const [UserInfo, setUserInfo] = useState([]);
  const [IsModal, setIsModal] = useState(false);

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

  // const onDeleteUser = async e => {
  //   e.preventDefault();
  //   const getPassword = prompt('비밀번호를 입력해주세오');

  //   const body = {
  //     password: getPassword,
  //   };

  //   try {
  //     const res = await authHttp.postCheckPassword(userId, body);
  //     console.log(res);
  //     if (res.data.code === 1000) {
  //       if (window.confirm('정말 계정을 삭제하겠습니까?')) {
  //         try {
  //           const res = await authHttp.deleteUser(userId);
  //           setUserInfo(res.data.result);
  //           console.log(res);
  //           alert('계정이 삭제되었습니다');
  //           dispatch(logoutUser());
  //           navigate('/login');
  //         } catch (err) {
  //           console.log(err);
  //           alert(err.response.data.message);
  //         }
  //       } else {
  //         return;
  //       }
  //     }
  //   } catch (err) {
  //     if (err.response.data.code === 3006) {
  //       alert(err.response.data.message);
  //     }
  //   }
  // };

  return (
    <>
      <Header />
      {username === UserInfo.username ? (
        <Wrap>
          <Text>마이페이지</Text>
          <BoxWrap>
            <MypageNav userName={UserInfo.username} userEmail={UserInfo.email} />
          </BoxWrap>
        </Wrap>
      ) : 
      (
        navigate('/notfound')
      )}
    </>
  );
};

export const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Wrap = styled.div`
  width: 1440px;
  margin: 0 auto;
`

const Text = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
  margin-top: 10px;
  color: #ED3419;
`

const BoxWrap = styled.div`
  width: 100%;
  height: 80vh;
  margin: auto;
  display: grid;
  grid-template-columns: 27% 70%;
`;





export default MyAlarms;
