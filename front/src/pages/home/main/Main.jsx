import styled from "@emotion/styled";

const MainContainer = styled.main`
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    height: 800px;
    align-items: center;
    font-size: 64px;
`;
function Main() {
    return (
        <MainContainer>
            <div>메인페이지입니다.</div>
        </MainContainer>
    );
}
export default Main;
