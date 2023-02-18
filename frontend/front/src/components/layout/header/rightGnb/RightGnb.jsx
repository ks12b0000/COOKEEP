import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { logoutUser } from '../../../../redux/reducer/userSlice';
import { mq } from '../../../media/media';
import { color } from '../../../../constants/color';
import UserHttp from '../../../../http/userHttp';
import AuthHttp from '../../../../http/authHttp';

const userHttp = new UserHttp();
const authHttp = new AuthHttp();

const RightGnb = () => {

  const userInfo = useSelector(state => state.persistedReducer.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    LoginCheck();
  }, [userInfo]);

  //토큰이 아직 유효한지 확인
  const LoginCheck = async () => {
    try {
        const res = await authHttp.getIsLoggedIn();
        console.log(res);
    } catch (err) {
        dispatch(logoutUser());
        console.log(err.response);
    }
  }

  //로그아웃 기능 실행 함수
  const logout = async () => {
    try {
      const res = await userHttp.getLogout();
      console.log(res);
    } catch (err) {
      console.log(err);
    }

    dispatch(logoutUser());

    alert('로그아웃이 완료되었습니다.');
  };

  return (
    <>
      <GnbContainer>
        {userInfo.isLoggedIn === false ? (
          <>
            <li>
              <img
                src={`${process.env.PUBLIC_URL}/image/search.png`}
                alt='검색아이콘'
              />
            </li>

            <li>
              <Link to='/login'> 로그인</Link>
            </li>
            <li>
              <Link to='/sign'>회원가입</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <img
                src={`${process.env.PUBLIC_URL}/image/search.png`}
                alt='검색아이콘'
              />
            </li>

            <li>
              <Link to={`/mypage/${userInfo.userId}`}>마이페이지</Link>
            </li>
            <li>
              <Link to='/' onClick={logout}>
                로그아웃
              </Link>
            </li>
          </>
        )}
      </GnbContainer>
      <MediaMenu>햄버거</MediaMenu>
    </>
    );
}


const MediaMenu = styled.div`
  display: none;
  ${mq[0]} {
    display: block;
  }
`;

const GnbContainer = styled.ul`
    width: 225px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    ${mq[0]} {
      display: none;
    }
    li {
      a {
        color: #000000;
        cursor: pointer;
        font-weight: 600;
        font-size: 16px !important;
        &:hover {
          color: ${color.main};
        }
      }
    }
  `;

export default RightGnb;