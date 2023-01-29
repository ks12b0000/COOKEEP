
import styled from "@emotion/styled";
import Logo from "./logo/Logo";
import RightGnb from "./rightGnb/RightGnb";
import Search from "./search/Search";
import {mq} from "../../media/media";
import MainSearch from "./search/MainSearch";
import {useState} from "react";

const HeaderContainer = styled.header`
    width: 100%;
    position: relative;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: white;
    margin-bottom: 1px;
     height: 500px;
  
    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 0;
      height: 100%;
      width: 100%;
      background-color: rgba(0,0,0,0.3);
    }
    img{
      width:100%;
      height: 100%;
      object-fit: cover;
     }
`;
const Container = styled.div`
    position: absolute;
    top:0;
    display: flex;
     width: 100%;
    justify-content: space-between;
    align-items: center;
    height: 65px;
    margin: 0 auto;

 
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
function Header({color, isMain}) {

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
            {isMain ?
                <ContainerFalse>
                    <Logo color={color}/>
                    <Search />
                    <RightGnb color={color}/>
                </ContainerFalse>
                :
                <HeaderContainer>
                  <img src="https://mp-seoul-image-production-s3.mangoplate.com/0776fea76b4a824ff583128cb51dd45c.jpg" alt=""/>
                  <Container>
                    <Logo color={color}/>
                    <RightGnb color={color}/>
                  </Container>
                  <TitleWrap>
                    <p>솔직한 리뷰 밑을수 있는 평점</p>
                    <p>오늘뭐먹지?</p>
                    <MainSearch {...Props}/>
                  </TitleWrap>
                </HeaderContainer>
            }
        </>
    );
}

export default Header;
