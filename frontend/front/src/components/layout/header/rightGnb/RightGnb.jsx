import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { logoutUser } from '../../../../redux/reducer/userSlice';
import { mq } from '../../../../constants/media/media';
import { color } from '../../../../constants/color';
import UserHttp from '../../../../http/userHttp';
import AuthHttp from '../../../../http/authHttp';

const userHttp = new UserHttp();
const authHttp = new AuthHttp();

const RightGnb = ({HandleSearch,searchOn}) => {

  const userInfo = useSelector(state => state.persistedReducer.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    LoginCheck();
  }, [userInfo]);

  //토큰이 아직 유효한지 확인
  const LoginCheck = async () => {
    try {
        const res = await authHttp.getIsLoggedIn();

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
              {searchOn ?  <li><img src={`${process.env.PUBLIC_URL}/image/search-active.png`} alt='검색아이콘'/></li> :
                  <li><img src={`${process.env.PUBLIC_URL}/image/search.png`} alt='검색아이콘'/></li>}
            <li>
              <Link to='/login'> 로그인</Link>
            </li>
            <li>
              <Link to='/sign'>회원가입</Link>
            </li>
          </>
        ) : (
          <>
              {searchOn ?
                  <li onClick={HandleSearch}><img src={`${process.env.PUBLIC_URL}/image/search-active.png`} alt='검색아이콘'/></li> :
                  <li onClick={HandleSearch}><img src={`${process.env.PUBLIC_URL}/image/search.png`} alt='검색아이콘'/></li>
              }

            <li>
              <Link to={`/mypage/${userInfo.userId}`}>
                  <img src={`${process.env.PUBLIC_URL}/image/mypage.png`} alt='마이페이지'/>
              </Link>
            </li>
            <li>
              <Link to='/' onClick={logout}>
                  <img src={`${process.env.PUBLIC_URL}/image/user.png`} alt='로그아웃'/>
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
  img{
    cursor: pointer;
  }
  `;

export default RightGnb;