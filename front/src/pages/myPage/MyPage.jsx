import styled from "@emotion/styled";

const Container = styled.section`
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    div {
        font-size: 64px;
    }
`;
function MyPage() {
    return (
        <>
            <Container>
                <div>마이페이지입니다.</div>
            </Container>
        </>
    );
}
export default MyPage;
