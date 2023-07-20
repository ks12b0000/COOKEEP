import styled from "@emotion/styled";
import {useState, useEffect} from "react";
import {mobile} from "../../../constants/media/media";
import {Pagination} from "@mui/material";
import IsNonData from "../../../components/atomic/isNonData/IsNonData";
import CategoryHttp from "../../../http/categoryHttp";
import Post from "../../../components/post/Post";
import {PaginationWrap} from "../../../components/categoryLayout/cateItem/CateItem";
import CustomSelect from "../../../components/atomic/CustomSelect";
import FlexContainer from "../../../components/atomic/FlexContainer";


const categoryHttp = new CategoryHttp();

function CateItemAll() {
    const [allText, setAllText] = useState(0);
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    const onChangePagination = (e, p) => {
        setCurrentPage(p - 1)
    };


    useEffect(() => {
        (async () => {
            try {
                const {result} = await categoryHttp.getAllBoard(currentPage, allText);


                setPosts(result.boards);
                setTotalCount(result.total);
            } catch (err) {
                console.log(err);
            }
        })();
    }, [currentPage, allText]);


    return (
        <>
            <FlexContainer>
                <h1>전체</h1>
                <CustomSelect setAllText={setAllText} currentPage={currentPage}/>
            </FlexContainer>
            <Ul>
                {posts.length === 0 ? <IsNonData text="데이터가 존재하지않습니다."/> :
                    <Post data={posts} currentPag={currentPage}/>}
            </Ul>
            <PaginationWrap> <Pagination count={totalCount} page={currentPage + 1} onChange={onChangePagination}
                                         variant="outlined" shape="rounded" showFirstButton
                                         showLastButton/></PaginationWrap>
        </>
    );
}

export default CateItemAll;


const Ul = styled.ul`
  margin-bottom: 20px;
  margin-top: 30px;
  min-height: 800px;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  gap:16px;
  ${mobile} {
    margin: 16px 0;
    gap: 2vw;
    min-height: auto;
    justify-content: space-between;
  }
  li {
    width: 19%;
    cursor: pointer;

    ${mobile} {
      margin-top:1vw;
      width: 48.5%;
    }
`


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

    ${mobile} {
      padding: 12px 15px;
      width: 100px;

    }
  }
`



