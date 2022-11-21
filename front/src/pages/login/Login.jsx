import Header from "../home/header/Header";
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
function Login() {
    return (
        <>
            <Header />
            <Container>
                <div>Login페이지입니다.</div>
            </Container>
        </>
    );
}
export default Login;
