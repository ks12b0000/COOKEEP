import styled from "@emotion/styled";

import Pagination from "../pagination/Pagination";
import { useState, useEffect } from "react";
import CategoryHttp from "../../../http/categoryHttp";
import IsNonData from "../../atomic/isNonData/IsNonData";
import Post from "../../post/Post";


const categoryHttp = new CategoryHttp();
function CateItem({cateItemName}) {


    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showPost, setShowPost] = useState(1);
    const [totalPost, setTotalPost] = useState(0);

    const LastIndex = currentPage * showPost;
    const FirstIndex = LastIndex - showPost;
    const currentPost = posts?.slice(FirstIndex, LastIndex);
    const paginate = (pageNum) => setCurrentPage(pageNum);
    const prevPage = () => setCurrentPage(currentPage - 1);
    const nextPage = () => setCurrentPage(currentPage + 1);

    const showPagination = () => {
        return <Pagination showPost={showPost} totalPost={totalPost} currentPage={currentPage} paginate={paginate} prevPage={prevPage} nextPage={nextPage} />;
    };

    useEffect(() => {
        (async () => {
            try {
                const { result } = await categoryHttp.getCategoryPostList(true, currentPage, cateItemName);
                setPosts(result);
                setTotalPost(result.length);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    const FilterPosts = (e) => {
        setShowPost(parseInt(e.target.value));
    };

    return (
        <>
            {/*<SelectBox>*/}
            {/*    <select onChange={FilterPosts} defaultValue="8">*/}
            {/*        <option value="8">8개씩보기</option>*/}
            {/*        <option value="16">16개씩 보기</option>*/}
            {/*        <option value="100">100개씩 보기</option>*/}
            {/*    </select>*/}
            {/*</SelectBox>*/}
            <Ul>
                {

                    posts.length === 0 ? <IsNonData text="데이터가 존재하지않습니다."/> : <Post data={currentPost}/>
                }

            </Ul>
            <div>{showPagination()}</div>
        </>
    );
}

export default CateItem;
const Ul = styled.ul`
    margin-top:16px;
  min-height: 800px;
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    justify-content: start;
    li {
        width: 19%;
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
const SelectBox = styled.div`
    position: relative;
    width: 100%;
    select {
        padding: 10px 15px;
        border: 1px solid #ccc;
        position: absolute;
        right: 0;
        top: -25px;
        border-radius: 5px;
        width: 150px;
        -webkit-appearance: none;
        background: url("https://i.imgur.com/e60gpgR.png") 88%/12px no-repeat;
        cursor: pointer;
        &:focus {
            outline: none;
        }
    }
`


