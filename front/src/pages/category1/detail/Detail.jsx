import Header from "../../home/header/Header";
import { useState } from "react";
import { categoryList1 } from "../../../data/category1/categoryList1";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { detail } from "../../../redux/reducer/categoryList";

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
    const { id } = useParams();
    const { item } = useSelector((state) => state.listReducer);
    const [items, setItem] = useState(item.filter((item) => item.id === parseInt(id)));
    return (
        <>
            <Header />
            <Container>
                {items.map((item) => (
                    <div key={item.id}>
                        <img src={item.img} alt="" />
                        <DetailTitle>{item.mainTitle}</DetailTitle>
                        <DetailSubTitle>{item.subTitle}</DetailSubTitle>
                    </div>
                ))}
            </Container>
        </>
    );
}
export default Detail;
