import styled from '@emotion/styled';
import Logo from './logo/Logo';
import RightGnb from './rightGnb/RightGnb';
import { mobile, mq } from '../../../constants/media/media';
import { useEffect, useRef, useState } from 'react';
import Nav from './nav/Nav';
import SearchView from '../../atomic/Search.view';
import {useMediaQuery} from "react-responsive";


const HeaderContainer = styled.header`
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
  background-color: white;
  margin-bottom: 1px;
  height: 75px;
  box-sizing: border-box;

  ${mobile} {
    position: fixed;
    top: 0;
    z-index: 100;
    height: 65px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Container = styled.div`
  width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;

  @media screen and (max-width: 1700px) {
    width: 1300px;
  }

  @media screen and (max-width: 1024px) {
    width: 760px;
  }

  @media screen and (max-width: 768px) {
    width: 100vw;
    justify-content: space-around;
    height: 60px;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
`;

function Header({color,categoryName,contents,tagContents}) {
    const [searchOn,setSearchOn] =useState(contents || tagContents  ? true : false);
    const [bottom,setBottom] =useState(false);
    const isMobile = useMediaQuery({
        query: '(max-width:768px)',
    });
  const [isOpen, setIsOpen] = useState(false);

    const MenuOpen = () =>  {
        setIsOpen(!isOpen);
    }
  
  const MenuClose = () => {
      setIsOpen(false);
    }

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
                  {searchOn && !isMobile ?   <SearchView  bottom={bottom} onFocus={onFocus}  onBlur={onBlur} contents={contents} tagContents={tagContents} /> :    <Nav  categoryName = {categoryName} isOpen={isOpen} setIsOpen={setIsOpen} />}
            <RightGnb color={color} HandleSearch={HandleSearch} searchOn={searchOn} MenuOpen={MenuOpen} MenuClose={MenuClose} />
              </Container>
            </HeaderContainer>

        </>
    );
}

export default Header;
