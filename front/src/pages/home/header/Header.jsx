import Nav from "./nav/Nav";
import styled from "@emotion/styled";
import Logo from "./logo/Logo";
import RightGnb from "./rightGnb/RightGnb";

const HeaderContainer = styled.header`
    width: 100%;
    height: 70px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;
const Container = styled.div`
    display: flex;
    width: 1200px;
    height: 100%;
    margin: 0 auto;
`;
function Header() {
    return (
        <HeaderContainer>
            <Container>
                <Logo />
                <Nav />
                <RightGnb />
            </Container>
        </HeaderContainer>
    );
}

export default Header;
