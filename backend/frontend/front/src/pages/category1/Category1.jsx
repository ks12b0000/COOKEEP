import Header from "../../components/layout/header/Header";
import styled from "@emotion/styled";
import CateItem from "../../components/category1/cateItem/CateItem";
import Buttons from "../../components/buttons/Buttons";
import { useDispatch, useSelector } from "react-redux";
import {  Routes, Route } from "react-router";
import {Link} from 'react-router-dom'
import Detail from "../../components/category1/detail/Detail";
import Writing from "../../components/category1/writing/Writing";

const Container = styled.section`
    width: 1200px;
    margin: 100px auto 0;
    
  
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
    return (
        <>
            <Routes>
                <Route path="writing" element={<Writing />}></Route>
            </Routes>
            <Container>
                <Category1Title>
                    <h1>카테고리 이름</h1>
                    <CateItem />
                    <ButtonWrap>
                        <div>
                            <Link to="/category1/writing">
                                <Buttons text="글쓰기" />
                            </Link>
                        </div>
                    </ButtonWrap>
                </Category1Title>
            </Container>
        </>
    );
}
export default Category1;