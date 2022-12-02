import Header from "../../components/layout/header/Header";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { asyncList } from "../../redux/reducer/categoryList";
import Axios from "../../http/http";

import CategoryHttp from "../../http/categoryHttp";
const Container = styled.section`
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 1000px;
    div {
        font-size: 64px;
    }
`;
const categoryHttp = new CategoryHttp();
function Category2() {
    const [Category, setCategory] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const { result } = await categoryHttp.getCategoryList(true, 1, `카테고리2`);
                setCategory(result);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    return (
        <>
            <Header />
            <Container>
                <div>
                    {Category.map((cate) => (
                        <li key={cate.board_id}>
                            <span>{cate.title}</span>
                            <span>{cate.text}</span>
                        </li>
                    ))}
                </div>
            </Container>
        </>
    );
}
export default Category2;
