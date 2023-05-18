
import styled from "@emotion/styled";


import { useState, useEffect } from "react";

import {Pagination} from "@mui/material";
import IsNonData from "../../../components/atomic/isNonData/IsNonData";
import CategoryHttp from "../../../http/categoryHttp";
import Post from "../../../components/post/Post";
import AllPagination from "../../../components/categoryLayout/pagination/Pagination";
import {PaginationWrap} from "../../../components/categoryLayout/cateItem/CateItem";


const categoryHttp = new CategoryHttp();

function CateItemAll() {
    const [allText,setAllText] = useState(0);
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const [totalCount, setTotalCount] = useState(0);
    const onChangePagination = (e,p)=> {
        setCurrentPage(p - 1)

    };
        useEffect(() => {
            (async () => {
                try {
                    const { result } = await categoryHttp.getAllBoard(currentPage,allText);

                    setPosts(result.boards);
                    setTotalCount(result.total);
                } catch (err) {
                    console.log(err);
                }
            })();
        }, [currentPage,allText]);

        console.log(totalCount);
        const FilterPosts = (e) => {
            setAllText(e.target.value)
        };



        return (
            <>
                <SelectBox>
                    <select onChange={FilterPosts} >
                        <option value={`page=${currentPage}`}>최신순</option>
                        <option value={`sort=commented,desc&page=${currentPage}`}>댓글순</option>
                        <option value={`sort=liked,desc&page=${currentPage}`}>좋아요순</option>
                    </select>
                </SelectBox>
                <Ul>
                    {

                        posts.length === 0 ? <IsNonData text="데이터가 존재하지않습니다."/> : <Post data={posts} currentPag={currentPage}/>
                    }
                </Ul>
                <PaginationWrap > <Pagination  count={totalCount}  page={currentPage + 1 }   onChange={onChangePagination} variant="outlined" shape="rounded" showFirstButton showLastButton /></PaginationWrap>
            </>
        );
    }
    export default CateItemAll;
    const Ul = styled.ul`
      margin-bottom: 20px;
    margin-top:30px;
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



