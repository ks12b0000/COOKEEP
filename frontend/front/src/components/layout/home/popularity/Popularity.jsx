import styled from "@emotion/styled";
import {color} from "../../../../constants/color";
import {mobile, mq} from '../../../../constants/media/media'
import Post from "../../../post/Post";
import IsNonData from "../../../atomic/isNonData/IsNonData";
import {Link} from "react-router-dom";



function Popularity({likeList}) {


    return(
        <Container>
          <PopularTitle> <div><img src={`${process.env.PUBLIC_URL}/image/popular.png`} alt=""/></div>이달의 인기 레시피 </PopularTitle>
          <PopularUl>
              {likeList.length === 0 ? <IsNonData text='데이터가 존재하지 않습니다.' />: <Post data={likeList} /> }
          </PopularUl>
            <MoreBtn><Link to="popularity">더보기  <img src={`${process.env.PUBLIC_URL}/image/moreArrow.png`} /></Link></MoreBtn>
        </Container>
    )
}
export default Popularity

const Container = styled.section`
  position: relative;
  width:1400px;
  margin:24px auto 16px;
  
  @media screen and (max-width: 1700px) {
    width: 1300px;
  }
  ${mobile}{
    width: 95vw;
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
