import Header from "../../layout/header/Header";
import {Link, useParams} from "react-router-dom";
import SearchHttp from "../../../http/searchHttp";
import {useEffect, useState} from "react";
import IsNonData from "../../atomic/isNonData/IsNonData";
import Post from "../../post/Post";
import styled from "@emotion/styled";
import Buttons from "../../atomic/Buttons";
import {color} from "../../../constants/color";
const client = new SearchHttp();
function SearchTag() {
    const { contents } = useParams();
    const [tag, setTag] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const res = await client.getAutoTag(contents);
                console.log(res);
                setTag(res.data.result);
            }
            catch (err) {
                console.log(err);

            }
        })()
    },[contents])


    return (
        <>
            <Header tagContents ={contents} />
            <Container>
              {/*<SelectBox>*/}
              {/*    <select onChange={FilterPosts} defaultValue="8">*/}
              {/*        <option value="">최신순</option>*/}
              {/*        <option value="sort=commented,desc">댓글순</option>*/}
              {/*        <option value="liked,desc">좋아요순</option>*/}
              {/*    </select>*/}
              {/*</SelectBox>*/}

                <Ul>
                 {

                    tag.length === 0   ?  <IsNonData text="데이터가 존재하지않습니다."/> : <Post data={tag}/>
                 }
                </Ul>
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
