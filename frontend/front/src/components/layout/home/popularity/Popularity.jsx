import styled from "@emotion/styled";
import {color} from "../../../../constants/color";
import {mq} from '../../../media/media'
import Post from "../../../post/Post";
import IsNonData from "../../../isNonData/IsNonData";



function Popularity({likeList}) {

    return(
        <Container>
          <PopularTitle>이달의 인기 레시피 </PopularTitle>
          <PopularUl>
              {likeList.length === 0 ? <IsNonData text='데이터가 존재하지 않습니다.' />: <Post data={likeList} /> }
          </PopularUl>
        </Container>
    )
}
export  default  Popularity

const Container = styled.section`
  width:1400px;
  margin:24px auto 0;
  ${mq[0]}{
    width: 100vw;
  }
`

const PopularTitle = styled.h1`
  font-weight: 700;
  font-size: 24px;
  color:${color.main}
`
const PopularUl = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap:16px;
  margin-top:16px;

`