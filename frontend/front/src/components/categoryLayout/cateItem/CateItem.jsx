import styled from "@emotion/styled";


import {useEffect, useState} from "react";
import CategoryHttp from "../../../http/categoryHttp";
import {Pagination} from "@mui/material";
import Post from "../../post/Post";
import IsNonData from "../../atomic/isNonData/IsNonData";
import CustomSelect from "../../atomic/CustomSelect";


const categoryHttp = new CategoryHttp();

function CateItem({cateItemName}) {
    const buttonCount = 5; // 버튼 개수
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [allText, setAllText] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const onChangePagination = (e, p) => {
        setCurrentPage(p - 1)

    };


    useEffect(() => {
        (async () => {
            try {
                if (allText) {
                    const {result} = await categoryHttp.getCategoryPostList(false, currentPage, cateItemName, allText);
                    setPosts(result.boards);
                    setTotalCount(result.total);
                } else {
                    const {result} = await categoryHttp.getCategoryPostList(true, currentPage, cateItemName);
                    setPosts(result.boards);
                    setTotalCount(result.total);
                }

            } catch (err) {
                console.log(err);
            }
        })();
    }, [currentPage, allText]);
    const FilterPosts = (e) => {
        setAllText(e.target.value)
    };


    return (
        <>
            <CustomSelect setAllText={setAllText} currentPage={currentPage} />
            <Ul>
                {

                    posts.length === 0 ? <IsNonData text="데이터가 존재하지않습니다."/> :
                        <Post data={posts} currentPage={currentPage}/>
                }
            </Ul>
            <PaginationWrap>
                <Pagination
                    variant="outlined"
                    count={totalCount}
                    boundaryCount={totalCount > buttonCount ? buttonCount - 1 : totalCount}
                    page={currentPage + 1}
                    onChange={onChangePagination}
                    shape="rounded" showFirstButton showLastButton
                />
            </PaginationWrap>
        </>
    );
}

export default CateItem;

export const PaginationWrap = styled.div`
  display: flex;
  justify-content: center;

  .MuiPagination-ul li button {
    width: 40px;
    height: 40px;
    color: #CBCBCB;
    font-weight: 600;
    font-size: 16px
  }

  .Mui-selected {
    background: #FF4122 !important;
    color: #ffffff !important;
    border: none !important;
  }
`
const Ul = styled.ul`
  margin-top: 16px;
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


