import styled from "@emotion/styled";
import {color} from "../../../../constants/color";
import {NavLink} from "react-router-dom";
import {useState} from "react";
import {NavDada} from "../../../../http/data/nav/navData";


const AllCategory = styled.li`
  position: relative;
  z-index: 100;
`

function List() {
    const [menus, setMenus] = useState(NavDada);
    const [none ,setNone] = useState(true)

    const SubMenu = styled.ul`
   display: ${none ? "none" : "block"} ;
  position: absolute;
  top:42px;
  height: 500px;
  width:85px;
  text-align: center;
  
  li{
    border:1px solid ${color.main};
    color:#ffffff;
    cursor: pointer;
    a{
      display: block;
      height: 45px;
      line-height: 45px;
    
      &:hover{
        background:#ffffff;
        color:${color.main};
      }
    }

  }
`
    return(
        <>
            <AllCategory>
                <a  onClick={() => setNone(!none)}>전체카테고리</a>

                <SubMenu >
                    {menus.map((menu) => (
                        <li key={menu.id}>
                            <NavLink to={menu.url}>{menu.name}</NavLink>
                        </li>
                    ))}
                </SubMenu>
            </AllCategory>
        </>
    )
}
export default  List;