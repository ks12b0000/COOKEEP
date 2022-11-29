import styled from "@emotion/styled";
import Axios from "../../../http/http";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../pagination/Pagination";
import { useState, useEffect } from "react";
import axios from "axios";
import { categoryList1 } from "../../../data/category1/categoryList1";
import categoryHttp from "../../../http/categoryHttp";

const Ul = styled.ul`
    margin: 20px 0 30px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: start;
    min-height: 550px;
    li {
        margin-top: 20px;
        width: 23%;
        height: 250px;
        cursor: pointer;
    }
`;
const Thumbnail = styled.div`
    width: 250px;
    height: 200px;
    border-radius: 4px;
    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
    }
`;

const TextBox = styled.div`
    margin-top: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    span {
        width: 90%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 16px;
        font-weight: 500;
    }
`;
function CateItem() {
    const [posts, setPosts] = useState(categoryList1);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [showPost] = useState(2);
    const [totalPost, setTotalPost] = useState(posts.length);

    const LastIndex = currentPage * showPost;
    const FirstIndex = LastIndex - showPost;
    const currentPost = posts.slice(FirstIndex, LastIndex);
    const paginate = (pageNum) => setCurrentPage(pageNum);
    const prevPage = () => setCurrentPage(currentPage - 1);
    const nextPage = () => setCurrentPage(currentPage + 1);

    const showPagination = () => {
        return <Pagination showPost={showPost} totalPost={totalPost} currentPage={currentPage} paginate={paginate} prevPage={prevPage} nextPage={nextPage} />;
    };

    return (
        <>
            <Ul>
                {currentPost.map((category, idx) => (
                    <li key={idx + 1}>
                        <Link to={`/category1/${category.board_id}`}>
                            <Thumbnail>
                                <img src={category.img} alt="" />
                            </Thumbnail>
                            <TextBox>
                                <span>{category.mainTitle}</span>
                                <span>{category.subTitle}</span>
                            </TextBox>
                        </Link>
                    </li>
                ))}
            </Ul>
            <div>{showPagination()}</div>
        </>
    );
}
export default CateItem;
