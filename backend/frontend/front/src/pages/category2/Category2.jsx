import Header from "../../components/layout/header/Header";
import styled from "@emotion/styled";
import {useCallback, useEffect, useState} from "react";

import CategoryHttp from "../../http/categoryHttp";
import axios from "axios";

const Container = styled.section`
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 100px;

    div {
        font-size: 64px;
    }
`;
const categoryHttp = new CategoryHttp();
function Category2() {

    return (
        <>
            <Container>
               카테고리2
            </Container>
        </>
    );
}
export default Category2;
