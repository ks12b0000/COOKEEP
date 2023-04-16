
import styled from "@emotion/styled";
import Logo from "./logo/Logo";
import RightGnb from "./rightGnb/RightGnb";

import {mq} from "../../../constants/media/media";

import {useEffect, useRef, useState} from "react";
import Nav from "./nav/Nav";
import SearchView from "../../atomic/Search.view";

const HeaderContainer = styled.header`
    width: 100%;
    position: relative;
    top: 0;
    left: 0;
    background-color: white;
    margin-bottom: 1px;
    height: 75px;
    box-sizing: border-box;
  
    img{
      width:100%;
      height: 100%;
      object-fit: cover;
     }
`;


const Container = styled.div`
  width:1440px;
  margin:0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  ${mq[0]}{
    width: 100vw;
    justify-content: space-around;
    height: 70px;
  }

  @media screen and (max-width: 1700px) {
       width: 80%;
    }
`;




function Header({color,categoryName}) {
    const [searchOn,setSearchOn] =useState(false);
    const [bottom,setBottom] =useState(false);

    const HandleSearch  = () => {
        setSearchOn(!searchOn);
    }
    const onFocus = () => {
        setBottom(true)
    }
    const onBlur = () => {
        setBottom(false)
    }
    return (
       <>

            <HeaderContainer >
              <Container >
                <Logo />
                  {searchOn ?   <SearchView  bottom={bottom} onFocus={onFocus}  onBlur={onBlur} /> :    <Nav  categoryName = {categoryName} />}
                <RightGnb color={color} HandleSearch={HandleSearch } searchOn={searchOn}/>
              </Container>
            </HeaderContainer>

        </>
    );
}

export default Header;
