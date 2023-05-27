import Header from "../../layout/header/Header";
import {Link, useParams} from "react-router-dom";
import SearchHttp from "../../../http/searchHttp";
import {useEffect, useState} from "react";
import IsNonData from "../../atomic/isNonData/IsNonData";
import Post from "../../post/Post";
import styled from "@emotion/styled";
import Buttons from "../../atomic/Buttons";
import {color} from "../../../constants/color";
import {PaginationWrap} from "../cateItem/CateItem";
import {Pagination} from "@mui/material";
const client = new SearchHttp();
function SearchTag() {
    const { contents } = useParams();
    const [tag, setTag] = useState([])
    const [allText,setAllText] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [total,setTotal] = useState(0);
    useEffect(() => {
        (async () => {
            try {
                const res = await client.getAutoTag(contents,currentPage,allText);
                console.log(res);
                setTag(res.data.result.boards);
                setTotal(res.data.result.total);

            }
            catch (err) {
                console.log(err);

            }
        })()
    },[contents,currentPage,allText])

    const FilterPosts = (e) => {
        setAllText(e.target.value)
    };

    const onChangePagination = (e,p)=> {
        setCurrentPage(p - 1)

    };

    return (
        <>
            <Header tagContents ={contents} />
            <Container>
              <SelectBox>
                  <select onChange={FilterPosts} defaultValue="8">
                      <option value={`page=${currentPage}`}>최신순</option>
                      <option value={`sort=board.commented,desc&page=${currentPage}`}>댓글순</option>
                      <option value={`sort=board.liked,desc&page=${currentPage}`}>좋아요순</option>
                  </select>
              </SelectBox>

                <Ul>
                 {

                    tag.length === 0   ?  <IsNonData text="데이터가 존재하지않습니다."/> : <Post data={tag}/>
                 }
                </Ul>
                <PaginationWrap > <Pagination  count={total}  page={currentPage + 1 }   onChange={onChangePagination} variant="outlined" shape="rounded" showFirstButton showLastButton /></PaginationWrap>
                <ButtonWrap>
                    <div>
                        <Link to="writing">
                            <Buttons text="글쓰기" />
                        </Link>
                    </div>
                </ButtonWrap>
            </Container>
        </>


    )
}

export default  SearchTag;
const Container = styled.section`
  width: 1440px;
  margin: 24px auto 16px;
`;

const ButtonWrap = styled.div`
    display: flex;
    justify-content: end;
`;

const Ul = styled.ul`
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
