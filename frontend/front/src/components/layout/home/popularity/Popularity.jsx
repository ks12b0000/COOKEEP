import styled from "@emotion/styled";
import {color} from "../../../../constants/color";
import {mobile, mq} from '../../../../constants/media/media'
import Post from "../../../post/Post";
import { Swiper, SwiperSlide } from "swiper/react"; // basic
import IsNonData from "../../../atomic/isNonData/IsNonData";
import {Link} from "react-router-dom";
import {useMediaQuery} from "react-responsive";

import {useEffect, useState} from "react";
import CategoryHttp from "../../../../http/categoryHttp";
import {useSelector} from "react-redux";

const categoryHttp = new CategoryHttp();

function Popularity({likeList}) {
    const isMobile = useMediaQuery({
        query: "(max-width:768px)"
    });
    const [IsLiked, setIsLiked] = useState(false);
    const { userId } = useSelector(state => state.persistedReducer.userReducer);

    useEffect(() => {
        let boradId  =likeList.map((item) => item.board_id);

        (async () => {
            {
                try {

                    const res = await categoryHttp.getisLikeds(boradId, userId);
                    setIsLiked(res.data.result.map((item) => item.like));
                } catch (err) {
                    console.log(err);
                }
            }
        })()
    }, [ likeList ]);


    return !isMobile ? (
        <Container>
          <PopularTitle> <div><img src={`${process.env.PUBLIC_URL}/image/popular.png`} alt=""/></div>이달의 인기 레시피 </PopularTitle>
          <PopularUl>
              {likeList.length === 0 ? <IsNonData text='데이터가 존재하지 않습니다.' />: <Post data={likeList} /> }
          </PopularUl>
            <MoreBtn><Link to="popularity">더보기  <img src={`${process.env.PUBLIC_URL}/image/moreArrow.png`} /></Link></MoreBtn>
        </Container>
    ) : 
    (
        <>
            <Container>
          <PopularTitle> <div><img src={`${process.env.PUBLIC_URL}/image/popular.png`} alt=""/></div>이달의 인기 레시피 </PopularTitle>
         <BannerWrap>
             <Swiper
                 loop={false}
                 allowTouchMove={true}
                 spaceBetween={10}
                 slidesPerView={2}
                 pagination={false}

             >

                 {likeList.map((item,index) => {
                     return (
                         <SwiperSlide key={index}>
                             <PopularList>
                                 <Link to={`/category/${item.board_id}`}>
                                     <PopularListImg>
                                         <img src={item.thumbnail} alt='썸네일' />
                                     </PopularListImg>
                                     <PopularTextBox>
                                         <TextBoxLeft>
                                             <h2>{item.category}</h2>
                                             <LeftYear>
                                                 {/*<span>{DateString}</span>*/}
                                             </LeftYear>
                                             <LeftTitle>
                                                 <span>{item.title}</span>
                                             </LeftTitle>
                                             <LeftTag>
                                                 <LeftWrite>{item.user_name}</LeftWrite>
                                                 <LeftHashTag>{item.tags}</LeftHashTag>
                                             </LeftTag>
                                         </TextBoxLeft>
                                         <TextBoxRight>
                                             <IconWrap>
                                                 <IconImg>
                                                     {IsLiked[index]? <img src='/image/post-like-fill.png' alt='' /> : <img src="/image/post-like.png" alt=""/> }
                                                 </IconImg>
                                                 <span>{item.liked}</span>
                                             </IconWrap>
                                             <IconWrap>
                                                 <IconImg>
                                                     {' '}
                                                     <img
                                                         src='/image/post-comment.png'
                                                         alt=''
                                                     />
                                                 </IconImg>
                                                 <span>{item.commented}</span>
                                             </IconWrap>
                                         </TextBoxRight>
                                     </PopularTextBox>
                                 </Link>
                             </PopularList>
                         </SwiperSlide>
                     )
                 })}
                 <SwiperSlide >
                   <MobileMore>
                       <div><Link to="popularity"> <img src={`${process.env.PUBLIC_URL}/image/mobile-more.png`} alt=""/></Link></div>
                       <div>더 보기</div>
                   </MobileMore>
                 </SwiperSlide>
             </Swiper>
         </BannerWrap>
            </Container>
        </>
    )
}
export default Popularity
const MobileMore = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 270px;
  flex-direction: column;
`
const BannerWrap = styled.section`
  padding:2vw;
  min-height: 290px;
  margin-top:4vw;
  cursor: pointer;
  
  .swiper{
    min-height: 290px;
  }

`
;
const Container = styled.section`
  position: relative;
  width:1400px;
  margin:84px auto 16px;
  
  @media screen and (max-width: 1700px) {
    width: 1300px;
  }
  ${mobile}{
    width: 95vw;
    margin:90px auto 16px;
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
  align-items: center;
  gap:16px;
  margin-top:16px;

  ${mobile}{
    width: 95vw;
    margin: 9px auto 0;
    flex-wrap: wrap;
    gap:0;
    justify-content: flex-start;
  }
`
const PopularTitle = styled.h1`
  display: flex;
  gap:4px;
  align-items: center;
  font-weight: 700;
  font-size: 24px;
  color:${color.main};
  
  ${mobile} {
    font-size: 18px;
  }
  
  
`




const PopularList = styled.li`
    box-shadow: 0px 1px 3px rgba(0,0,0,.2);
    border-radius: 20px;
    width: 19%;
    box-sizing: border-box;
    transition: 0.3s ease-in-out;
    cursor: pointer;
   ${mobile} {
     width:100%;
     padding:2vw;
   }
    &:last-of-type{
      padding:0;
    }
   &:hover{
     transform: scale(1.05);
   }
`
const PopularListImg = styled.div`
  width: 100%;
  height: 220px;

  ${mobile} {
    width: 100%;
    height: 35vw;
  }
  img{
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    
    ${mobile}{
      border-top-right-radius: 2.5vw;
      border-top-left-radius: 2.5vw;
    }
   
  }
`

const PopularTextBox = styled.div`
  padding:16px;
  box-sizing: border-box;
  background: #F8F9FA;
  display: flex;
  justify-content: space-between;
  gap:16px;
  border-bottom-right-radius:20px;
  border-bottom-left-radius:20px;
  
  ${mobile}{
    height: 40vw;
    padding: 2.5vw;
    box-sizing: border-box;
    gap:0;
   
  
  }
`

const TextBoxLeft = styled.div`
  width: 65%;
  h2{
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #CBCBCB;
    
    ${mobile} {
      font-size:12px;
    }
  }
`

const LeftYear = styled.p`
  span{
    vertical-align: text-top;
    font-size: 12px;
    font-weight: 400;
    color: #CBCBCB;
  
  }
  padding:4px 0;
  margin:0;
`
const LeftTitle = styled.p`
  span{
    word-wrap: break-word;
    white-space: normal;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box !important;
    font-weight: 700;
    font-size: 18px;
    color:#000000;
    min-height: 44px;
    
    ${mobile} {
      font-size: 14px;
      min-height: 9vw;
    }
  }
  margin:0;
`

const LeftTag = styled.p`
   padding-top:8px;
   span{
     display: block;
   }
  
`

const LeftWrite = styled.span`
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #CBCBCB;
`

const LeftHashTag = styled.span`
  padding-top:8px;
  font-weight: 400;
  font-size: 14px;
  color: #838485;
`
const TextBoxRight = styled.div`
  display: flex;
  gap:4px;
  >div{
    display: flex;
    flex-direction: column;
   
    span{
      text-align: center;
      padding-top:4px;
      font-weight: 400;
      font-size: 12px;
      color: #B0B0B0;
    }
  }
 `
const IconWrap = styled.div`
  margin-left: 3px;
 `

const IconImg = styled.div`
   width: 19px;
   height: 19px;
   
   ${mobile} {
     width: 14px;
     height: 14px;
     
     img{
       width: 100%;
       height: 100%;
       object-fit: contain;
     }
   }
 `;