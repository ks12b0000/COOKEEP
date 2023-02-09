import styled from "@emotion/styled";

import {mq} from '../../../media/media';
import {color} from "../../../../constants/color";
import IsNonData from "../../../isNonData/IsNonData";
import Post from "../../../post/Post";

function Ranking({commented}) {
    return(
        <RankingWrap>
            <RankingTitle>레시피 Total 조회 순위</RankingTitle>
            <RankingUl>
                {commented.length === 0 ? <IsNonData text='데이터가 존재하지 않습니다.' />: <Post data={commented} /> }
            </RankingUl>
        </RankingWrap>
    )
}
export default Ranking;
const RankingWrap = styled.section`
  width:1400px;
  margin:48px auto 16px;
`
const RankingTitle = styled.h1`
  font-weight: 700;
  font-size: 24px;
  color:${color.main}
`

const  RankingUl = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap:16px;
  margin-top:16px;

`