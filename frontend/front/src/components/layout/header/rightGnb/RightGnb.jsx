import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { logoutUser, saveUserImg } from '../../../../redux/reducer/userSlice';
import { mobile, mq } from '../../../../constants/media/media';
import { color } from '../../../../constants/color';
import UserHttp from '../../../../http/userHttp';
import AuthHttp from '../../../../http/authHttp';

import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import * as React from 'react';
import AlarmModal from './AlarmModal';

const userHttp = new UserHttp();
const authHttp = new AuthHttp();

const RightGnb = ({ HandleSearch, searchOn ,MenuOpen}) => {
  const userInfo = useSelector(state => state.persistedReducer.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  // const [UserImage, setUserImage] = useState('');
  const [AlarmOpen, setAlarmOpen] = useState(false);

  useEffect(() => {
    LoginCheck();
    // getUserImageItem();
  }, [userInfo]);

  //토큰이 아직 유효한지 확인
  const LoginCheck = async () => {
    try {
      const res = await authHttp.getIsLoggedIn();
      if (userInfo.userImg === '') {
        dispatch(
          saveUserImg({
            userImg: res.data.result.user_image,
          })
        );
      }
    } catch (err) {
      dispatch(logoutUser());
      console.log(err.response);
    }
  };

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
    window.location.reload();
  };

  const AlarmToggle = e => {
    e.preventDefault();
    if (AlarmOpen) {
      setAlarmOpen(false);
    } else {
      setAlarmOpen(true);
    }
  };

  return (
    <>
      <GnbContainer className={userInfo.isLoggedIn && 'user'}>
        {userInfo.isLoggedIn === false ? (
          <>
            <li
              onClick={HandleSearch}
              className={searchOn ? 'active' : 'search'}
            >
              <img
                src={`${process.env.PUBLIC_URL}/image/search.png`}
                alt='검색아이콘'
              />
            </li>
            <li>
              <Link to='/login'> 로그인</Link>
            </li>
            <li className='sign'>
              <Link to='/sign'>회원가입</Link>
            </li>
          </>
        ) : (
          <>
            <li
              onClick={HandleSearch}
              className={searchOn ? 'active' : 'search'}
            >
              <img
                src={`${process.env.PUBLIC_URL}/image/search.png`}
                alt='검색아이콘'
              />
            </li>

            <LogOut className={AlarmOpen ? 'alarmon' : 'alarm'}>
              {AlarmOpen ? (
                <img
                  src={`${process.env.PUBLIC_URL}/image/alarm-r.png`}
                  alt='알람아이콘'
                  onClick={e => AlarmToggle(e)}
                />
              ) : (
                <img
                  src={`${process.env.PUBLIC_URL}/image/alarm-g.png`}
                  alt='알람아이콘'
                  onClick={e => AlarmToggle(e)}
                />
              )}
              {AlarmOpen && <AlarmModal />}
            </LogOut>

            <LogOut>
              <div>
                <UserImg onClick={() => setOpen(!open)}>
                  <Img src={userInfo.userImg} />
                </UserImg>
              </div>
              {open && (
                <MenuList>
                  <li
                    onClick={() =>
                      navigate(`/mypage/alarms/${userInfo.userId}`)
                    }
                  >
                    마이페이지
                  </li>
                  <li onClick={logout}>로그아웃 </li>
                </MenuList>
              )}
            </LogOut>
          </>
        )}
      </GnbContainer>

      <MediaMenu>
        <ul>
          <li className={AlarmOpen ? 'alarmon' : 'alarm-m'}>
            {AlarmOpen ? (
              <img
                src={`${process.env.PUBLIC_URL}/image/alarm-r.png`}
                alt='알람아이콘'
                onClick={e => AlarmToggle(e)}
              />
            ) : (
              <img
                src={`${process.env.PUBLIC_URL}/image/alarm-g.png`}
                alt='알람아이콘'
                onClick={e => AlarmToggle(e)}
              />
            )}
            {AlarmOpen && <AlarmModal />}
          </li>

          <li onClick={MenuOpen}>
            <img src={`${process.env.PUBLIC_URL}/image/ham.png`} alt="메뉴판"/>
          </li>
        </ul>
      </MediaMenu>
    </>
  );
};

const MediaMenu = styled.div`
  display: none;
  ${mobile} {
    display: block;
    position: absolute;
    right: 16px;

    ul {
      display: flex;
      li{
        &:first-of-type {
          margin-right: 19px;
        }
      }
    }
    img{
      width: 18px;
      height: 22px;
      object-fit: contain;
    }
  }
`;

const LogOut = styled.li`
  position: relative;
`;

const UserImg = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  background-color: #d9d9d9;
  margin-right: 24px;
  overflow: hidden;
  position: relative;
  margin-left: 26px;
`;

const Img = styled.img`
  height: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const MenuList = styled.ul`
  position: absolute;
  top: 60px;
  z-index: 1000;
  left: -20px;
  width: 80px;
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid #ff4122;
  justify-content: center;
  display: flex;
  padding: 5px;
  gap: 5px;
  align-items: center;
  flex-direction: column;
  text-align: center;

  li {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100% !important;
    height: 33px !important;
    cursor: pointer;
    font-weight: 700;
    font-size: 14px;

    color: #3e4145;
    &:hover {
      background: #ff4122;
      color: #ffffff;
      border-radius: 5px;
    }
  }
`;

const GnbContainer = styled.ul`
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
 ${mobile} {
   display: none;
 }

 

  &.user {
    gap: 10px;
    li {
      width: 44px;
      height: 44px;
      justify-content: center;
      align-items: center;
      display: flex;
      &.search {
        img {
          width: 20px;
          height: 20px;
        }
      }
     
      
      &.alarm {
        
        ${mobile} {
          display: none;
        }
        img {
          width: 20px;
          height: 23px;
        }
      }
      
      &.alarm-m {
        img {
          width: 20px;
          height: 23px;
        }
        
      }

      &.alarmon {
        width: 44px;
        height: 44px;
        background: #ffc9bb;
        border-radius: 999px;

        img {
          width: 20px;
          height: 23px;
        }
      }
    }
  }
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    &.active {
      width: 44px;
      height: 44px;
      background: #ffc9bb;
      border-radius: 999px;

      img {
        width: 20px;
        height: 20px;
      }
    }

     
    }
   
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
  img {
    cursor: pointer;
  }
`;

export default RightGnb;
