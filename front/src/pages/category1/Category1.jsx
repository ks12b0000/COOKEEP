import Header from "../home/header/Header";
import styled from "@emotion/styled";
import CateItem from "./cateItem/CateItem";

const Container = styled.section`
    width: 1200px;
    margin: 0 auto;
    height: 1000px;
`;
const Category1Title = styled.div`
    padding: 50px;
    h1 {
        font-size: 24px;
        font-weight: 600;
    }
`;

function Category1() {
    return (
        <>
            <Header />
            <Container>
                <Category1Title>
                    <h1>카테고리 이름</h1>
                    <CateItem />
                </Category1Title>
            </Container>
        </>
    );
}
export default Category1;
