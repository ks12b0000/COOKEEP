import styled from "@emotion/styled";
import  {color} from "../../../../constants/color";
import {mq} from '../../../media/media';

function Ranking() {
    return(
        <RankingWrap>
            <h1>레시피 Total 조회 순위</h1>
        </RankingWrap>
    )
}
export default Ranking;
const RankingWrap = styled.section`
    width:1200px;
    margin:100px auto 0;
    text-align: center;
    ${mq[0]}{
      width: 100vw;
    }
    h1{
    font-size: 24px;
   
    }
`