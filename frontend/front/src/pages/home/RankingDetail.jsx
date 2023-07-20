import {useEffect, useState} from "react";
import Layout from "../../components/layout/Layout";
import IsNonData from "../../components/atomic/isNonData/IsNonData";
import Post from "../../components/post/Post";
import styled from "@emotion/styled";
import {mobile, mq} from "../../constants/media/media";
import {color} from "../../constants/color";
import CategoryHttp from "../../http/categoryHttp";

const client = new CategoryHttp();
function RankingDetail() {

    const [rankingMore,setRankingMore] = useState([]);

    useEffect(() => {
        (async()=>{
            try{
                const res = await client.getCommentedMore();
                setRankingMore(res.result);
            }catch (err){
                console.log(err);
            }
        })()
    },[])

    return (
        <Layout>
            <Container>
                <PopularTitle> <div><img src={`${process.env.PUBLIC_URL}/image/popular.png`} alt=""/></div>이달의 인기 레시피 </PopularTitle>
                <PopularUl>
                    {setRankingMore.length === 0 ? <IsNonData text='데이터가 존재하지 않습니다.' />: <Post data={rankingMore} /> }
                </PopularUl>

            </Container>
        </Layout>
    )
}
export default RankingDetail;


const Container = styled.section`
  position: relative;
  width:1400px;
  margin:24px auto 16px;
 

  @media screen and (max-width: 1700px) {
       width: 1300px;
    }


  ${mobile}{
    margin: 89px auto 16px;
    width: 100vw;
    padding: 0 16px;
    box-sizing: border-box;
  }
`



const  PopularUl = styled.ul`
  display: flex;
  min-height: 300px;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
  gap:16px;
  margin-top:16px;

  ${mobile} {
    margin: 16px 0;
    gap: 1vw;
    min-height: auto;
    justify-content: space-between;
  }
`
const PopularTitle = styled.h1`
  display: flex;
  gap:4px;
  align-items: center;
  font-weight: 700;
  font-size: 24px;
  color:${color.main}
`
