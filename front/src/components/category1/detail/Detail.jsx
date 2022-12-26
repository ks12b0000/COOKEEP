import Header from "../../layout/header/Header";
import {useEffect, useState} from "react";
import { categoryList1 } from "../../../http/data/category1/categoryList1";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import WriteHttp from "../../../http/writeHttp";
import IsNonData from "../../isNonData/IsNonData";



function Detail() {
    const writeHttp = new WriteHttp();
    const { id } = useParams();
    const [detailPost,setDetailPost] = useState([]);

    useEffect(() => {
        (async () => {
           try {
               const res = await writeHttp.getDetailPost(id);
               setDetailPost(res.result);

           } catch (err){
               console.log(err);
           }
        })()
    },[])


    return (
        <>
            <Header />
            <Container>
                <Top>

                        <TopImg>
                            <img src={detailPost.thumbnail} alt=""/>
                        </TopImg>
                        <TopText>
                              <TextTitle>{detailPost.title}</TextTitle>
                              <Text>{detailPost.text}</Text>
                              <LikeButton >좋아요</LikeButton>
                        </TopText>

                </Top>
            </Container>
        </>
    );
}
export default Detail;


const Container = styled.article`
    width: 1200px;
    margin: 2rem auto 0;
  
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
`
const TopImg = styled.figure`
  width: 60%;
  height: 500px;

  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
const TopText = styled.figcaption`
  width: 40%;
  height: 500px;
  border:1px solid #eee;
  box-sizing: border-box;
  padding:1rem 1rem 0;
  span{
    display: block;
  }
  
`
const TextTitle = styled.span`
   font-size:24px;
   font-weight: 600;
   height: 10%;
 `
const Text = styled.span`
    font-size:18px;
    height: 80%;
  
    font-weight: 500;
`
const LikeButton = styled.button`
   border:1px solid ;
   background:#222;
   height: 10%;
   width: 100%;
   color: wheat;
`
