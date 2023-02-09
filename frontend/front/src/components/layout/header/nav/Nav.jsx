import styled from "@emotion/styled";
import {useEffect, useRef, useState} from "react";
import { NavDada } from "../../../../http/data/nav/navData";
import { NavLink } from "react-router-dom";
import {color} from "../../../../constants/color";
import {useParams} from "react-router";

function Nav({categoryName}) {

    const [menus, setMenus] = useState(NavDada);
    const [active,setActive] =useState(false);


    return (

          <NavList>
            <ul>
              {menus.map((menu) => (
                  <Menu key={menu.id}>
                    <NavLink to={menu.url} className={ categoryName === menu.name ? 'active' : null} >{menu.name}</NavLink>
                  </Menu>
              ))}
            </ul>
          </NavList>

    );
}
export default Nav;

const NavList = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 670px;
    height: 43px;
    margin:0 auto;
  
   ul{
     display: flex;
     width: 100%;
     justify-content: space-around;
     align-items: center;
   }
`;

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
      &.active {
           color:${color.main};
           font-weight: 700;
      
        }
    }
`;