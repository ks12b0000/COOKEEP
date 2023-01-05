import styled from "@emotion/styled";
import Banner from "./banner/Banner";

const MainContainer = styled.main`
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    height: 800px;
    align-items: center;
    div {
        font-size: 64px;
    }
`;
function Main() {
    return (
        <MainContainer>
            <Banner />
        </MainContainer>
    );
}

export default Main;
