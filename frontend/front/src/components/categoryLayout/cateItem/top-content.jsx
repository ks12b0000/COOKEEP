import styled from "@emotion/styled";
import {useSelector} from "react-redux";
import * as React from 'react';
import DetailBtn from "../detail/detailBtn/DetailBtn";
import categoryHttp from "../../../http/categoryHttp";
import {useNavigate} from "react-router";


function TopContent({detailPost}) {

    const dt = new Date(detailPost?.create_date);
    const DateString =dt.toLocaleDateString()
    const {userId} = useSelector(state => state.persistedReducer.userReducer);
    const {board_id} = detailPost;


    return(
        <TopContainer>
            <TopHeader>
                <h1>{detailPost.category}</h1>
                <h2>{detailPost.title}</h2>
                <div>
                    <span>{DateString}</span><span>View 111</span>
                </div>
                <h3>{detailPost.user_name}</h3>
                <TopHeaderIconWrap>
                    {detailPost.user_id === userId ?
                        <DetailBtn board_id={board_id} />:
                        <>
                          <li>
                          <p><img src={`${process.env.PUBLIC_URL}/image/like.png`} alt=""/></p>
                          <p>{detailPost.liked}</p>
                          </li>
                          <li>
                          <p><img src={`${process.env.PUBLIC_URL}/image/message-dots-circle.png`} alt=""/></p>
                          <p>{detailPost.commented}</p>
                         </li>
                        </>
                    }


                </TopHeaderIconWrap>

            </TopHeader>
            <TopBody >
                <div dangerouslySetInnerHTML={{__html: detailPost.text}}/>
            </TopBody>
        </TopContainer>
    )
}
export default TopContent;

const TopContainer = styled.div`
    margin:24px auto;
    width: 100%;
    padding:24px;
    box-sizing: border-box;
    border: 1px solid #FFA590;
    border-radius: 20px;

  
`;
const TopHeader = styled.div`
  position: relative;
  //카테고리
  h1{
    font-weight: 500;
    font-size: 18px;
    line-height: 23px;
    color: #FF4122;

  }
  //타이틀
  h2{
    margin-top:9px;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    color: #000000;
  }
  //작성자
  h3{
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    color: #B0B0B0;
  }
  >div{
    margin:8px 0;
    display: flex;
    gap:16px;
    span{
      display: block;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
      color: #B0B0B0;
    }
  }
`
const TopHeaderIconWrap = styled.ul`
  display: flex;
  text-align: center;
  gap:14px;
  position: absolute; 
  right:0;
  top:0;
  color: #B0B0B0;
  li{
    p{
      font-size: 12px;
    }
  }
`
const TopBody = styled.div`
  margin:16px auto 0;
  padding-top:16px;
  box-sizing: border-box;
  border-top: 1px solid #CED4DA;;
  text-align: center;
  min-height: 750px;
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;
  color: #3E4145;

`
