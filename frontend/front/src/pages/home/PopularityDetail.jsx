import CategoryHttp from "../../http/categoryHttp";
import Layout from "../../components/layout/Layout";
import {useEffect,useState} from "react";
import IsNonData from "../../components/atomic/isNonData/IsNonData";
import Post from "../../components/post/Post";
import {Link} from "react-router-dom";
import styled from "@emotion/styled";
import {mq} from "../../constants/media/media";
import {color} from "../../constants/color";

const client = new CategoryHttp();
function PopularityDetail() {
    const [popularMoreList,setPopularMoreList] = useState([]);

    useEffect(() => {
        (async()=>{
           try{
              const res = await client.getMainLikeMore();
               setPopularMoreList(res.result);
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
                    {setPopularMoreList.length === 0 ? <IsNonData text='데이터가 존재하지 않습니다.' />: <Post data={popularMoreList} /> }
                </PopularUl>

            </Container>
        </Layout>
    )
}
export default PopularityDetail;



const Container = styled.section`
  position: relative;
  width:1400px;
  margin:24px auto 16px;
  ${mq[0]}{
    width: 100vw;
  }

  @media screen and (max-width: 1700px) {
       width: 1300px;
    }
`
const MoreBtn = styled.div`
  position: absolute;
  top:0;
  right:0;
  a{
    font-weight: 500;
    font-size: 18px;
    line-height: 23px;
    color: #838485;
  }
  img{
    vertical-align: unset;
    padding-left:5px;
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
`
const PopularTitle = styled.h1`
  display: flex;
  gap:4px;
  align-items: center;
  font-weight: 700;
  font-size: 24px;
  color:${color.main}
`
