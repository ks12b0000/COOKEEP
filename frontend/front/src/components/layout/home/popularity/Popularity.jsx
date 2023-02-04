import styled from "@emotion/styled";
import {color} from "../../../../constants/color";
import{Link} from "react-router-dom";
import {mq} from '../../../media/media'

function Popularity() {
    return(
        <Container>
            <PopularityWrap>
                <PopularText><h1><span>오늘의</span><span>인기 MENU</span></h1></PopularText>
                <PopularListLayout>
                    <ul>
                        <li>
                            <h5>작성자: <span>홍길동</span></h5>
                            <PopularListIMG><img src="https://recipe1.ezmember.co.kr/cache/data/goods/22/03/13/1000026683/1000026683_detail_089.jpg?w=500" alt=""/></PopularListIMG>
                            <PopularSubText><span>텍스트설명을 적어놓겠습니다 .... 처리로 하겠습니다. 최대 2줄까지만 허용하는 텍스트입니다. 가가가가가ㅏ각ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</span></PopularSubText>
                            <Link to={"/categoryLayout"}>  <PageRouter>레시피 바로 보러가기  {`>`}</PageRouter></Link>
                        </li>
                        <li>
                            <h5>작성자: <span>홍길동</span></h5>
                            <PopularListIMG><img src="https://recipe1.ezmember.co.kr/cache/data/goods/22/03/13/1000026683/1000026683_detail_089.jpg?w=500" alt=""/></PopularListIMG>
                            <PopularSubText><span>텍스트설명을 적어놓겠습니다 .... 처리로 하겠습니다. 최대 2줄까지만 허용하는 텍스트입니다. 가가가가가ㅏ각ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</span></PopularSubText>
                            <Link to={"/categoryLayout"}>  <PageRouter>레시피 바로 보러가기  {`>`}</PageRouter></Link>
                        </li>
                        <li>
                            <h5>작성자: <span>홍길동</span></h5>
                            <PopularListIMG><img src="https://recipe1.ezmember.co.kr/cache/data/goods/22/03/13/1000026683/1000026683_detail_089.jpg?w=500" alt=""/></PopularListIMG>
                            <PopularSubText><span>텍스트설명을 적어놓겠습니다 .... 처리로 하겠습니다. 최대 2줄까지만 허용하는 텍스트입니다. 가가가가가ㅏ각ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</span></PopularSubText>
                            <Link to={"/categoryLayout"}>  <PageRouter>레시피 바로 보러가기  {`>`}</PageRouter></Link>
                        </li>
                    </ul>
                </PopularListLayout>
            </PopularityWrap>
        </Container>
    )
}
export  default  Popularity

const Container = styled.section`
  width:1200px;
  margin:65px auto 0;
  ${mq[0]}{
    width: 100vw;
  }
`
const PopularityWrap =styled.div`
  display: flex;
  height: 390px;
  justify-content: space-around;  
  align-items: center;
  ${mq[0]}{
    flex-direction: column;
  }
`
const PopularText = styled.div`
  width: 30%;
  ${mq[0]}{
    width: 100vw;
    text-align: center;
  }
  span{
    display: block;
    font-weight: 400;
    font-size: 32px;
    line-height: 50px;
    color:${color.main};
    ${mq[0]}{
      line-height: 1.3;
      
    }
  }
`
const PopularListLayout = styled.div`
    width: 70%;
    height: 390px;
    ${mq[0]}{
      width: 100vw;
    }
    ul{
      display: flex;
      gap:10px;
      ${mq[0]}{
        flex-wrap: wrap;
      }
      li{
        padding:15px 20px 25px;
        flex-grow: 1;
        height:390px;
        border-radius: 5px;
        background:#f5f5f5;
        box-sizing: border-box;
        h5{
          font-size: 18px;
        }
      }
    }
`

const PopularListIMG = styled.div`
  margin:12px 0 10px;
  width: 100%;
  height: 240px;
  background:red;
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
`
const PopularSubText =styled.div`
     width: 240px;
  
    span{
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      display: block;
      width: 100%;
      font-size: 16px;
    }
`
const PageRouter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top:25px;
  height: 40px;
  background:${color.main};
  color:#ffffff;
`