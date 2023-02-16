
import styled from "@emotion/styled";
import Logo from "./logo/Logo";
import RightGnb from "./rightGnb/RightGnb";

import {mq} from "../../media/media";

import {useState} from "react";
import Nav from "./nav/Nav";

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
`;

const ContainerFalse = styled.div`
  position: relative;
  top:0;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 65px;
  margin: 0 auto;
  border:1px solid #ccc;
  box-shadow: 4px 4px 16px rgba(0,0,0,.1);
`



function Header({color,categoryName}) {



    const [isFocus, setIsFocus] = useState(false);
    const handleFocus = () => {
        setIsFocus(true)
    }
    const handleClick = () => {
        setIsFocus(false);
    }
    //css 변수로 제어
const TitleWrap = styled.div`
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  height: 130px;
    >p{
    text-align: center;
    width: 720px;
    font-size: 2.2rem;
    line-height: 45px;
    color:${color}
    }
`

    const Props = {
      isFocus:isFocus,
      onFocus:handleFocus,
      onClick:handleClick
    }
    return (
       <>

            <HeaderContainer>
              <Container>
                <Logo />
                <Nav  categoryName = {categoryName}/>
                <RightGnb color={color}/>
              </Container>
            </HeaderContainer>

        </>
    );
}

export default Header;
