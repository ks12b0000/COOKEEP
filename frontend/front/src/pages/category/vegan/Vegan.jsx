import styled from "@emotion/styled";
import Layout from "../../../components/layout/Layout";
import {Route, Routes} from "react-router";
import Writing from "../../../components/categoryLayout/writing/Writing";
import CateItem from "../../../components/categoryLayout/cateItem/CateItem";
import {Link} from "react-router-dom";
import Buttons from "../../../components/buttons/Buttons";
import Category from "../Category";


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

function Vegan() {

    const Props ={
        title:'비건 컨텐츠',
        categoryName:'비건'
    }
    return (
        <>
            <Category {...Props} />
        </>
    );
}
export default Vegan;
