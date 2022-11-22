import Header from "../home/header/Header";
import { useState } from "react";
import { categoryList1 } from "../../data/category1/categoryList1";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";

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

function Detail() {
    const { id } = useParams();
    const [data, setData] = useState(categoryList1.filter((v) => v.id === parseInt(id)));
    console.log(data);
    console.log(data);
    return (
        <>
            <Header />
            <Container>
                {data.map((v) => (
                    <div key={v.id}>
                        <img src={v.img} alt="" />
                    </div>
                ))}
            </Container>
        </>
    );
}
export default Detail;
