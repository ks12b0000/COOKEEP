import styled from "@emotion/styled";
import { useState } from "react";
import { NavDada } from "../../../../http/data/nav/navData";
import { NavLink } from "react-router-dom";
import {mq} from  '../../../media/media'

function Nav() {
    const [menus, setMenus] = useState(NavDada);
    return (
        <NavContainer>
          <NavList>
            <ul>
              {menus.map((menu) => (
                  <Menu key={menu.id}>
                    <NavLink to={menu.url}>{menu.name}</NavLink>
                  </Menu>
              ))}
            </ul>
          </NavList>
        </NavContainer>
    );
}
export default Nav;
const NavContainer = styled.div`
  height: 60px;
  border-bottom:1px solid #333333;
  ${mq[0]}{
    height: 50px;
  }
`
const NavList = styled.nav`
    width: 1200px;
    margin:0 auto;
    ${mq[0]}{
      width: auto;
      overflow-x: scroll;
    }
    > ul {
        height: 100%;
        display: flex;
        ${mq[0]}{
          width: 150%;
        } 
    }
`;

const Menu = styled.li`
    flex-grow: 1;
    height: 100%;
    display: flex;
    position: relative;
    &:before{
      position: absolute;
      top:50%;
      right:0;
      transform: translateY(-50%);
      content:"";
      display: block;
      width: 1px;
      height: 32px;
      background: #333333;
    }
   &:last-of-type {
     //마지막 마대기 제거
     &:before{
       display: none;
     }
   }
    a {
        display: inline-block;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 60px;
        font-size: 16px !important;
        ${mq[0]}{
          line-height: 50px;
         }
      &.active {
            color: #35c5f0;
            font-weight: 600;
        
        }
    }
`;