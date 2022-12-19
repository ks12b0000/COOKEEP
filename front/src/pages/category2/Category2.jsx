import Header from "../../components/layout/header/Header";
import styled from "@emotion/styled";
<<<<<<< HEAD
import { useEffect, useState } from "react";
import CategoryHttp from "../../http/categoryHttp";
import axios from "axios";
import {useSelector} from "react-redux";
=======
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCookie } from "../../until/cookie";

import CategoryHttp from "../../http/categoryHttp";
import axios from "axios";
>>>>>>> c895c0ef131ad3c7e020e886707b505ecbb5cbed
const Container = styled.section`
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
<<<<<<< HEAD
=======
    height: 1000px;
>>>>>>> c895c0ef131ad3c7e020e886707b505ecbb5cbed
    div {
        font-size: 64px;
    }
`;
const categoryHttp = new CategoryHttp();
function Category2() {
    const [Category, setCategory] = useState([]);
<<<<<<< HEAD
    const [state, setState] = useState("");

=======

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
>>>>>>> c895c0ef131ad3c7e020e886707b505ecbb5cbed
    return (
        <>
            <Header />
            <Container>
                <div>
<<<<<<< HEAD
=======
                    <input type="file" onChange={imageChange} />
                    <img src={state} alt="" />
>>>>>>> c895c0ef131ad3c7e020e886707b505ecbb5cbed
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
