import Header from "../../layout/header/Header";
import {Link, useParams} from "react-router-dom";
import SearchHttp from "../../../http/searchHttp";
import {useEffect, useState} from "react";
import IsNonData from "../../atomic/isNonData/IsNonData";
import Post from "../../post/Post";
import Buttons from "../../atomic/Buttons";
import styled from "@emotion/styled";
import {Pagination} from "@mui/material";
import {PaginationWrap} from "../cateItem/CateItem";
import {mobile} from "../../../constants/media/media";
import FlexContainer from "../../atomic/FlexContainer";
import CustomSelect from "../../atomic/CustomSelect";
import Footer from "../../layout/footer/Footer";

const client = new SearchHttp();
function SearchList() {
    const { contents } = useParams();

    const [List, setList] = useState([])
    const [allText,setAllText] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [total,setTotal] = useState(0);
    useEffect(() => {
        (async () => {
            try {
                const res = await client.getAutoList(contents,currentPage,allText);
                setList(res.data.result.boards);
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
            <Header  contents={contents}/>
            <Container>

                <div style={{display:'flex', justifyContent:'flex-end',alignItems:'center'}}>
                    <CustomSelect setAllText={setAllText} currentPage={currentPage}/>
                </div>


                <Ul>
                    {

                        List.length === 0   ?  <IsNonData text="데이터가 존재하지않습니다."/> : <Post data={List}/>
                    }
                </Ul>
                <PaginationWrap > <Pagination  count={total}  page={currentPage + 1 }   onChange={onChangePagination} variant="outlined" shape="rounded" showFirstButton showLastButton /></PaginationWrap>
                <div style={{marginTop:'16px'}}>
                    <ButtonWrap>
                        <div>
                            <Link to="/search/writing">
                                <Buttons text="글쓰기" />
                            </Link>
                        </div>
                    </ButtonWrap>
                </div>
            </Container>
            <Footer />
        </>

    )
}

export default  SearchList;


const Container = styled.section`
  width: 1440px;
  margin: 24px auto 16px;

  @media screen and (max-width: 1700px) {
       width: 1300px;
    }
  
  ${mobile} {
    margin: 89px auto 16px;
    width: 100vw;
    padding: 0 16px;
    box-sizing: border-box;
  }
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
  
    ${mobile} {
      margin: 16px 0;
      gap: 2vw;
      min-height: auto;
      justify-content: space-between;
    }
    li {
        width: 19%;
        cursor: pointer;

      ${mobile}{
        margin-top:1vw;
        width:48.5%;
      }
    }
  
  
`;
