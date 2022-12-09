import styled from "@emotion/styled";
import { useState } from "react";
import { NavDada } from "../../../../http/data/nav/navData";
import { NavLink } from "react-router-dom";

const NavList = styled.nav`
    width: 600px;
    > ul {
        height: 100%;
        display: flex;
    }
`;

const Menu = styled.li`
    flex-grow: 1;
    height: 100%;
    display: flex;
    position: relative;
    a {
        display: inline-block;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 70px;
        font-size: 16px !important;
        &.active {
            color: #35c5f0;
            font-weight: 700;
            &:before {
                content: "";
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 2px;
                background: #35c5f0;
                display: block;
            }
        }
    }
`;
function Nav() {
    const [menus, setMenus] = useState(NavDada);

    return (
        <NavList>
            <ul>
                {menus.map((menu) => (
                    <Menu key={menu.id}>
                        <NavLink to={menu.url}>{menu.name}</NavLink>
                    </Menu>
                ))}
            </ul>
        </NavList>
    );
}
export default Nav;
