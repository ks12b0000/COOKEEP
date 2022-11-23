import Header from "../../layout/header/Header";
import styled from "@emotion/styled";
const Container = styled.div`
    display: flex;
    width: 1200px;
    height: 100%;
    margin: 0 auto;
`;
function Writing(){
    return(
        <>
            <Header/>
            <Container>글쓰페이지입니다.</Container>
        </>
    )
}
export default Writing;