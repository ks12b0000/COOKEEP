import styled from "@emotion/styled";


import * as React from "react";
import {useState} from "react";
import {NavDada} from "../../../../http/data/nav/navData";
import {Link, NavLink} from "react-router-dom";
import {color} from "../../../../constants/color";
import {mobile} from "../../../../constants/media/media";
import {useSelector} from "react-redux";
import {useMediaQuery} from "react-responsive";
import SearchModal from "../../../atomic/modal/SearchModal";

function Nav({categoryName, isOpen}) {
    const userInfo = useSelector(state => state.persistedReducer.userReducer);

    const [menus, setMenus] = useState(NavDada);
    const isMobile = useMediaQuery({
        query: "(max-width:768px)"
    });
    const [searchOpen, setSearchOpen] = useState(false);


    return !isMobile ? (<NavList>
            <ul className="menu">
                {menus.map((menu) => (<Menu key={menu.id}>
                    <NavLink to={menu.url}
                             className={categoryName === menu.name ? 'active' : null}>{menu.name}</NavLink>
                </Menu>))}
            </ul>
        </NavList>) : //모바일버전
        isOpen && (<>
            <MobileNavList className={isOpen ? 'show' : 'hide'}>

                <GnbContainer className={userInfo.isLoggedIn && 'user'} user={userInfo.isLoggedIn}>
                    {!userInfo.isLoggedIn && (
                        <BtnWrap className="btnWrap">
                            <li className="login">
                                <Link to='/login'> 로그인</Link>
                            </li>
                            <li className="sign">
                                <Link to='/sign'>회원가입</Link>
                            </li>
                        </BtnWrap>

                    )}
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '15px'}}
                         onClick={() => setSearchOpen(!searchOpen)}>
                        <img
                            src={`${process.env.PUBLIC_URL}/image/search.png`}
                            alt='검색아이콘'
                            style={{width: '20px', height: '20px'}}
                        />
                    </div>
                </GnbContainer>

                {userInfo.isLoggedIn && (
                    <User>
                        <div className='userBoard'>
                            <UserImg><Img src={userInfo.userImg}/></UserImg>
                            <span>마이페이지</span>
                        </div>
                        <UserArrow><img src={`${process.env.PUBLIC_URL}/image/user-arrow.png`} alt="" /></UserArrow>
                    </User>

                )}
                <ul className="menu">
                    {menus.map((menu) => (<Menu key={menu.id}>
                        <NavLink to={menu.url}
                                 className={categoryName === menu.name ? 'active' : null}>{menu.name}</NavLink>
                    </Menu>))}
                </ul>

            </MobileNavList>
            <SearchModal isOpen={searchOpen} setOpen={setSearchOpen}/>
        </>);
}

export default Nav;


const MobileNavList = styled.nav`
  position: fixed;
  top: 64px;
  width: 100vw;
  z-index: 100;
  background: #ffffff;
  height: 100vh;
  transition: ease 1s;

  &.hide {
    transform: translateX(-100%);
  }

  &.show {

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


  .menu {
    padding: 0 16px;
    display: flex;
    flex-direction: column;

    gap: 8px;

    li {
      padding-left: 15px;
      width: 65px;
      height: 43px;
      line-height: 43px;

    }
  }

`
const User = styled.div`
  margin: 16px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .userBoard{
    display: flex;
    align-items: center;
  }

  span {
    font-size: 18px;
    color: #ff8164;
  }

`
const UserImg = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50px;
  background-color: #D9D9D9;
  border: 1px solid #FF4122;
  margin-right: 24px;
  overflow: hidden;
  position: relative;
  margin-left: 26px;
`;
const UserArrow = styled.div`
  padding-right: 24px;
 width: 20px;
  height: 20px;
  display:flex;
  justify-content: center;
  align-items: center;
  
  img{
    width: 100%;
    height:100%;
    object-fit: contain;
  }
`
const Img = styled.img`
  height: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const NavList = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 670px;
  height: 43px;
  margin: 0 auto;


  .menu {
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
    padding: 24px 26px 14px 16px;
    justify-content: space-between;
  }
`;


const BtnWrap = styled.div`


  display: flex;
  height: 50px;
  gap: 10px;

  .login {
    width: 90px;
    height: 44px;
    background: #FF4122;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;

    a {
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

    a {
      font-family: 'Pretendard';
      font-weight: 600;
      font-size: 16px;
      color: #FF4122;
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
    color: ${color.subColor};

    ${mobile} {
      color: #5A5C5F;
    }

    &.active {
      color: ${color.main};
      font-weight: 700;

    }
  }
`;