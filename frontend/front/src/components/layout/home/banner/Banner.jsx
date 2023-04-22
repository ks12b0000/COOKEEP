import styled from "@emotion/styled";
import {mq} from "../../../../constants/media/media";
import { Swiper, SwiperSlide } from "swiper/react"; // basic
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css"; //basic
import "swiper/css/navigation";
import "swiper/css/pagination";
import left from '../../../../asset/image/left.png'
import right from '../../../../asset/image/right.png'
import good from '../../../../asset/image/good.png'
import {useEffect, useRef, useState} from "react";
import CategoryHttp from "../../../../http/categoryHttp";

SwiperCore.use([Navigation, Pagination]);
const client = new CategoryHttp();
function Banner() {

    const swiperRef = useRef(null)

    const [banner,setBanner] = useState([])

    useEffect(() => {
        (async () => {
            try{
                const res = await client.getBanner();
                setBanner(res.result);
            }
            catch (err) {
                console.log(err)
            }
        })();
    },[])

    const SlideData = [
        {
            id:1,
            sum:"https://img.freepik.com/free-photo/top-view-closeup-plates-chinese-foods-white-table_181624-48736.jpg?w=2000",
            topText:"오늘의 추천 레시피 글",
            mainText1:"둘이 먹다 하나가 죽어도 모를 정도로 맛있는데",
            mainText2:"미친듯이 간단한 닭강정 (Feat. 양심 샐러드)",
        },
        {
            id:2,
            sum:"https://img.freepik.com/free-photo/top-view-closeup-plates-chinese-foods-white-table_181624-48736.jpg?w=2000",
            topText:"오늘의 추천 레시피 글",
            mainText1:"텍스트2",
            mainText2:"텍스트2",
        },
        {
            id:3,
            sum:"https://img.freepik.com/free-photo/top-view-closeup-plates-chinese-foods-white-table_181624-48736.jpg?w=2000",
            topText:"오늘의 추천 레시피 글",
            mainText1:"텍스트3",
            mainText2:"텍스트3",
        }
    ]
    return(
        <BannerWrap >
          <Swiper
              loop={true}
              allowTouchMove={false}
              ref={swiperRef}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true }}
          >
              {banner.map((item)=>
                  {
                  const title = item.title.split('//');
                  return (
                      <SwiperSlide key ={item.board_id} onClick={() => window.location.href=`/category/${item.board_id}`}>
                          <BannrImg > <img src={item.thumbnail} alt=""/></BannrImg>
                          <div className='swiperContents'>
                              <h1>
                                  <Img><img src={good} alt=""/></Img>
                                  <span>오늘의 추천 레시피 글</span>
                              </h1>
                              <BannerText>
                                  <span>{title[0]} </span>
                                  <span>{title[1]}</span>
                              </BannerText>
                          </div>
                      </SwiperSlide>
                  )
              }
              )}

             <div className='arrow'>
                 <div id="previousButton" onClick={() => swiperRef.current.swiper.slidePrev()} className='prev' >
                     <img src={left} alt=""/>
                 </div>
                 <div id="nextButton" onClick={() => swiperRef.current.swiper.slideNext()} className='next'>
                     <img src={right} alt=""/>
                 </div>
             </div>


          </Swiper>

        </BannerWrap>
    )
}
export default Banner;

const BannrImg =styled.div`

  img{
    position: absolute;
    z-index: -1;
    width:100%;
    height: 100%;
    object-fit: cover;
    ${mq[0]} {
      object-fit: cover;
    }
  }
 
  
  &:before{
    content: "";
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background:rgba(0,0,0,.5);
  }
`
const BannerWrap = styled.section`
  position: relative;
  width:100%;
  height: 350px;
  background:#D9D9D9;
  cursor: pointer;



;
  }
  //스와이퍼
  .swiperContents{
    width:1400px;
    height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin:0 auto;
    position: relative;
    
    h1{
      margin-top:60px;
      display:flex;
      align-items: center;
      width: 252px;
      height: 45px;
      background: #FF6242;
      border-radius: 999px;
      span{
        font-weight: 700;
        font-size: 24px;
        color: #FFFFFF;
      }
    }
  }
  .arrow{
    position: absolute;
    width:1400px;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    justify-content: space-between;
    z-index: 10;
    display: flex;
    background:transparent;

    @media screen and (max-width: 1700px) {
       width: 1250px;
    }
    
    >div {
      position: relative;
      width: 30px;
      height: 30px;
      cursor: pointer;
      img{
        width: 100%;
        height: 100%;
        object-fit: contain;
      
      }
    }
    .next{right:-30px;}
    .prev{left:-30px;}
  }
 
`


const Img =styled.div`
  margin:0 4px 0 10px;
 > img{
   vertical-align: text-before-edge;
   z-index: 10;
   width:24px;
   height: 24px;
    position: relative;
  
  }
`

const BannerText = styled.div`
  text-align: center;
  width:750px;
  margin-top:30px;  
  span{
    display: block;
    font-weight: 700;
    font-size: 42px;
    line-height: 50px;
    align-items: center;
    color: #FFFFFF;

  }
`