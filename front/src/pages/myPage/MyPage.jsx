import Header from "../../components/layout/header/Header";
import styled from "@emotion/styled";
const Container = styled.section`
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 1000px;
    div {
        font-size: 64px;
    }
`;
function MyPage() {
    return (
        <>
            <Header />
            <Container>
                <div>마이페이지입니다.</div>
            </Container>
        </>
    );
}
export default MyPage;
