import styled from "@emotion/styled";


import { useState } from "react";
import { NavDada } from "../../../../http/data/nav/navData";
import {Link, NavLink} from "react-router-dom";
import {color} from "../../../../constants/color";
import{mobile} from "../../../../constants/media/media";
import AlarmModal from "../rightGnb/AlarmModal";
import * as React from "react";
import {useSelector} from "react-redux";
import {useMediaQuery} from "react-responsive";

function Nav({categoryName,isOpen}) {
    const userInfo = useSelector(state => state.persistedReducer.userReducer);
    const [menus, setMenus] = useState(NavDada);
    const [active,setActive] =useState(false);
    const isMobile = useMediaQuery({
        query: "(max-width:768px)"
    });




    return  !isMobile ?  (

          <NavList>

            <ul className="menu">
              {menus.map((menu) => (
                  <Menu key={menu.id}>
                    <NavLink to={menu.url} className={ categoryName === menu.name ? 'active' : null} >{menu.name}</NavLink>
                  </Menu>
              ))}
            </ul>

          </NavList>
        ):
        //모바일버전
        isOpen && (
        <MobileNavList  className={ isOpen ? 'show' :'hide'}>
            <GnbContainer className={userInfo.isLoggedIn && 'user'}>
                <BtnWrap className="btnWrap">
                    <li className="login">
                        <Link to='/login'> 로그인</Link>
                    </li>
                    <li className="sign">
                        <Link to='/sign'>회원가입</Link>
                    </li>
                </BtnWrap>

                <div>
                    <img
                    src={`${process.env.PUBLIC_URL}/image/search.png`}
                    alt='검색아이콘'
                    />
                </div>
            </GnbContainer>



            <ul className="menu">
                {menus.map((menu) => (
                    <Menu key={menu.id}>
                        <NavLink to={menu.url} className={ categoryName === menu.name ? 'active' : null} >{menu.name}</NavLink>
                    </Menu>
                ))}
            </ul>
        </MobileNavList>

    );
}
export default Nav;


const MobileNavList = styled.nav`
     position: fixed;
     top: 65px;
     width: 100vw;
     z-index: 100;
     background: #ffffff;
     height: 100vh;
     transition: ease 1s;
    
    &.hide{
      transform: translateX(-100%);
    }
    &.show{
    
      animation: slideOn .5s;
    }


  @keyframes slideOn {
    0% {
      transform: translateX(-100%);
    }

    100% {
      transform: translateX(-0%);
    }
  }
  
  
  .menu{
    padding:0 16px;
    display: flex;
    flex-direction: column;
 
    gap:8px;
    
    li{
      padding-left:15px;
      width: 65px;
      height: 43px;
      line-height: 43px;
    
    }
  }
  
`


const NavList = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 670px;
    height: 43px;
    margin:0 auto;
  
 
  
   .menu{
     display: flex;
     width: 100%;
     justify-content: space-around;
     align-items: center;
     
     // ${mobile} {
     //
     //   flex-direction: column;
     //   align-items: flex-start;
     // }
   }
`;

const GnbContainer = styled.ul`
  display: none;
    ${mobile} {
      display: flex;
      padding: 24px 16px 14px;
      justify-content: space-between;
    }
`;


const BtnWrap = styled.div`

   display: flex;
   height: 50px;
   gap:10px;
  
  .login{
    width: 90px;
    height: 44px;
    background: #FF4122;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    a{
      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      color: #FFFFFF;
    }
  }


  .sign {
    width: 90px;
    height: 44px;
    border: 1px solid #FF4122;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    a{
      font-family: 'Pretendard';
      font-weight: 600;
      font-size: 16px;
      color:#FF4122;
    }
  }


`
const Menu = styled.li`
    width: auto;
    height: 100%;
    a {
        display: block;
        width: 100%;
        height: 100%;
        font-weight: 500;
        font-size: 18px !important;
        color:${color.subColor};
      
      ${mobile} {
        color: #5A5C5F; 
      }
      &.active {
           color:${color.main};
           font-weight: 700;
      
        }
    }
`;