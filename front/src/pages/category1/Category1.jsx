import Header from "../home/header/Header";
import styled from "@emotion/styled";
import CateItem from "./cateItem/CateItem";
import Buttons from "../../components/buttons/Buttons";
import { useDispatch, useSelector } from "react-redux";

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
const ButtonWrap = styled.div`
    display: flex;
    justify-content: end;
`;
function Category1() {
    const dispatch = useDispatch();
    const stats = useSelector((state) => state);
    console.log(stats);
    return (
        <>
            <Header />
            <Container>
                <Category1Title>
                    <h1>카테고리 이름</h1>
                    <CateItem />
                    <ButtonWrap>
                        <Buttons text="글쓰기" />
                    </ButtonWrap>
                </Category1Title>
            </Container>
        </>
    );
}
export default Category1;
