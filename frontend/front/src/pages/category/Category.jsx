import Layout from "../../components/layout/Layout";
import {Route, Routes} from "react-router";
import Writing from "../../components/categoryLayout/writing/Writing";
import CateItem from "../../components/categoryLayout/cateItem/CateItem";
import {Link} from "react-router-dom";
import Buttons from "../../components/buttons/Buttons";
import styled from "@emotion/styled";
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
function Category({title,categoryName}){
    return(
        <Layout>
            <Routes>
                <Route path="writing" element={<Writing />}></Route>
            </Routes>
            <Container>
                <Category1Title>
                    <h1>{title}</h1>
                    <CateItem cateItemName={categoryName}/>
                    <ButtonWrap>
                        <div>
                            <Link to="/category1/writing">
                                <Buttons text="글쓰기" />
                            </Link>
                        </div>
                    </ButtonWrap>
                </Category1Title>
            </Container>
        </Layout>
    )
}
export default Category;