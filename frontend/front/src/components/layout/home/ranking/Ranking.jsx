import styled from "@emotion/styled";
import {color} from "../../../../constants/color";
import IsNonData from "../../../atomic/isNonData/IsNonData";
import Post from "../../../post/Post";
import {Link} from "react-router-dom";
import {mobile} from "../../../../constants/media/media";

function Ranking({commented}) {
    return(
        <RankingWrap>
              <RankingTitle><div><img src={`${process.env.PUBLIC_URL}/image/ranking.png`} alt=""/></div>  레시피 Total 조회 순위</RankingTitle>
            <RankingUl>
                {commented.length === 0 ? <IsNonData text='데이터가 존재하지 않습니다.' />: <Post data={commented} /> }
            </RankingUl>
            <MoreBtn><Link to="rangking">더보기  <img src={`${process.env.PUBLIC_URL}/image/moreArrow.png`} /></Link></MoreBtn>
        </RankingWrap>

)
}
export default Ranking;

const RankingWrap = styled.section`
  position:relative;
  width:1400px;
  margin:48px auto 16px;
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
const RankingTitle = styled.h1`
  display: flex;
  gap:4px;
  align-items: center;
  font-weight: 700;
  font-size: 24px;
  color:${color.main};

  ${mobile} {
    width: 100%;
    font-size: 18px;
  }
`

const  RankingUl = styled.ul`
  min-height: 300px;
  display: flex;
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