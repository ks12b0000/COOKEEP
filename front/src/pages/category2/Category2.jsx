import Header from "../../components/layout/header/Header";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCookie } from "../../until/cookie";

import CategoryHttp from "../../http/categoryHttp";
import axios from "axios";
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
                const res = await categoryHttp.submitWritingForm({
                    category: "카테고리1",
                    text: "안녕하세요",
                    title: "김성훈입니다",
                    user_id: 5,
                    thumbnail: "https://cdn.pixabay.com/photo/2022/12/06/06/21/lavender-7638368_1280.jpg"
                });
                console.log(res);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);
    const [state, setState] = useState("");
    const imageChange = (e) => {
        const files = e.target.files; // FileList 객체
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files[0]);
        fileReader.onload = function (e) {
            setState(e.currentTarget.result);
        };
    };
    useEffect(() => {
        console.log(state);
    }, [state]);
    return (
        <>
            <Header />
            <Container>
                <div>
                    <input type="file" onChange={imageChange} />
                    <img src={state} alt="" />
                    {/*{getCookie && getCookie("accesstoken")}*/}
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
