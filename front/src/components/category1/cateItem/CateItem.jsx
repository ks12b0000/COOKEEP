import styled from "@emotion/styled";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Pagination from "../pagination/Pagination";
import {useState,useEffect} from "react";
import axios from "axios";

const Ul = styled.ul`
    margin: 20px 0 30px;
    display: flex;
    gap:10px;
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
    const categoryItem = useSelector((state) => state.listReducer.item);
    const [posts,setPosts] = useState(categoryItem);
    const [loading,setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [showPost] = useState(8);
    const [totalPost,setTotalPost] = useState(categoryItem.length);

    // useEffect(() => {
    //     const loadPost = async () => {
    //         setLoading(true);
    //         const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    //         setPosts(response.data);
    //         setTotalPosts(response.data.length);
    //         setLoading(false);
    //     }
    //     loadPost();
    // },[]);
    const LastIndex = currentPage * showPost;
    const FirstIndex = LastIndex - showPost;
    const currentPost = posts.slice(FirstIndex,LastIndex);
    const paginate = (pageNum) => setCurrentPage(pageNum);
    const prevPage = () => setCurrentPage(currentPage  - 1);
    const nextPage = () => setCurrentPage( currentPage + 1);

    const showPagination = () => {
        return(
           <Pagination
              showPost={showPost}
              totalPost ={totalPost}
              currentPage ={currentPage}
              paginate ={paginate}
              prevPage ={prevPage}
              nextPage ={nextPage}
           />
        )
    }

    return (
        <>
            <Ul>
                {
                    currentPost.map((category) => (
                        <li key={category.id}>
                            <Link to={`/category1/${category.id}`}>
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
