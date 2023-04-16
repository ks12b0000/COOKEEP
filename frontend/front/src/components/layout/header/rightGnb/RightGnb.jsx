import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {useEffect, useState} from 'react';
import { logoutUser } from '../../../../redux/reducer/userSlice';
import { mq } from '../../../../constants/media/media';
import { color } from '../../../../constants/color';
import UserHttp from '../../../../http/userHttp';
import AuthHttp from '../../../../http/authHttp';

import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import * as React from "react";


const userHttp = new UserHttp();
const authHttp = new AuthHttp();

const RightGnb = ({HandleSearch,searchOn}) => {

  const userInfo = useSelector(state => state.persistedReducer.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false)

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
    window.location.reload();
  };

  return (
    <>
      <GnbContainer className={userInfo.isLoggedIn && 'user'}>
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
               <li onClick={HandleSearch} className={searchOn ? 'active' : 'search' }><img src={`${process.env.PUBLIC_URL}/image/search.png`} alt='검색아이콘'/></li>

            <li>
              <Link to={'/alarm'}>
                  <img src={`${process.env.PUBLIC_URL}/image/mypage.png`} alt='마이페이지'/>
              </Link>
            </li>


                <LogOut>
                     <div onClick={() => setOpen(!open)}><img src={`${process.env.PUBLIC_URL}/image/user.png`} alt='마이페이지'/></div>
                    {open &&
                        <MenuList>
                            <li onClick={() => navigate(`/mypage/alarms/${userInfo.userId}`)}>마이페이지</li>
                            <li onClick={logout}>로그아웃 </li>
                        </MenuList>
                    }
                </LogOut>

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

const LogOut =styled.li`
  position: relative;
`
const IconWrap = styled.div`
 
 text-align: right;
  >button{
    width: 30px;
    height: 30px;
    &:hover{
      background:#FF4122;
      color:#ffffff;
    }
  }
`
const MenuList = styled.ul`
  position: absolute;
  top:55px;
  z-index: 1000;
  left:-20px;
  width: 80px;
  background:#ffffff;
  border-radius: 5px;
  border:1px solid #FF4122;
  justify-content: center;
  display: flex;
  padding:5px;
  gap:5px;
  align-items: center;
  flex-direction: column;
  text-align: center;

  li{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100% !important;
    height: 33px !important;
    cursor: pointer;
    font-weight: 700;
    font-size: 14px;

    color: #3E4145;
    &:hover{
      background:#FF4122;
      color:#ffffff;
      border-radius: 5px;
    }

  }

`
const GnbContainer = styled.ul`
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    ${mq[0]} {
      display: none;
    }
  
  &.user {
    gap:10px;
    li {
      width: 44px;
      height: 44px;
      &.search{
        img{
          width: 20px;
          height: 20px;
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
        background: #FFC9BB;
        border-radius: 999px;

        img{
          width: 20px;
          height: 20px;
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
  img{
    cursor: pointer;
  }
  `;

export default RightGnb;