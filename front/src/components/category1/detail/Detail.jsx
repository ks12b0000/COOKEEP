import Header from "../../layout/header/Header";
import { useState } from "react";
import { categoryList1 } from "../../../http/data/category1/categoryList1";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.section`
    width: 1200px;
    margin: 0 auto;
    div {
        margin: 20px auto;
        width: 1000px;
        height: 775px;
        img {
            border-radius: 15px;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
`;
const DetailTitle = styled.h1`
    padding: 10px 0 5px;
    font-size: 28px;
    font-weight: bold;
`;
const DetailSubTitle = styled.h3`
    font-size: 18px;
    font-weight: 400;
`;
function Detail() {
    // const { id } = useParams();
    // const { result } = useSelector((state) => state.listReducer.item);

    return (
        <>
            <Header />
            <Container>
                {/*{result.map((item) => (*/}
                {/*    <div key={item.id}>*/}
                {/*        <img src={item.img} alt="" />*/}
                {/*        <DetailTitle>{item.mainTitle}</DetailTitle>*/}
                {/*        <DetailSubTitle>{item.subTitle}</DetailSubTitle>*/}
                {/*    </div>*/}
                {/*))}*/}
            </Container>
        </>
    );
}
export default Detail;
