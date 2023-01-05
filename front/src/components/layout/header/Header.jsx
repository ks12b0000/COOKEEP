import Nav from "./nav/Nav";
import styled from "@emotion/styled";
import Logo from "./logo/Logo";
import RightGnb from "./rightGnb/RightGnb";
import Search from "./search/Search";
import {mq} from "../../media/media";

const HeaderContainer = styled.header`
    width: 100%;
    height: 90px;
    position: relative;
  
    top: 0;
    left: 0;
    z-index: 10;
    background-color: white;
    border-bottom: 1px solid #333333;
    ${mq[0]}{
      height: 70px;
    }
   
`;
const Container = styled.div`
    display: flex;
    align-items: center;
    width: 1200px;
    height: 100%;
    margin: 0 auto;
  ${mq[0]}{
    width: 100vw;
    justify-content: space-around;
  }
`;
function Header() {
    return (
        <HeaderContainer>
            <Container>
                <Logo />
                <Search />
                <RightGnb />
            </Container>
            <Nav />
        </HeaderContainer>
    );
}

export default Header;
