import Header from "../../components/layout/header/Header";
import styled from "@emotion/styled";
import CateItem from "../../components/category1/cateItem/CateItem";
import Buttons from "../../components/buttons/Buttons";
import { useDispatch, useSelector } from "react-redux";
<<<<<<< HEAD
import {  Routes, Route } from "react-router";
import {Link} from 'react-router-dom'
=======
import { Link, Routes, Route } from "react-router-dom";
>>>>>>> c895c0ef131ad3c7e020e886707b505ecbb5cbed
import Detail from "../../components/category1/detail/Detail";
import Writing from "../../components/category1/writing/Writing";

const Container = styled.section`
    width: 1200px;
    margin: 0 auto;
<<<<<<< HEAD
  
`;
const Category1Title = styled.div`
=======
    height: 1000px;
`;
const Category1Title = styled.div`
    margin-top: 70px;
>>>>>>> c895c0ef131ad3c7e020e886707b505ecbb5cbed
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
            <Header />
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
