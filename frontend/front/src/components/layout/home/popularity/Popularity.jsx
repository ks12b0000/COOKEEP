import styled from "@emotion/styled";
import {color} from "../../../../constants/color";
import {mq} from '../../../../constants/media/media'
import Post from "../../../post/Post";
import IsNonData from "../../../atomic/isNonData/IsNonData";



function Popularity({likeList}) {


    return(
        <Container>
          <PopularTitle> <div><img src={`${process.env.PUBLIC_URL}/image/popular.png`} alt=""/></div>이달의 인기 레시피 </PopularTitle>
          <PopularUl>
              {likeList.length === 0 ? <IsNonData text='데이터가 존재하지 않습니다.' />: <Post data={likeList} /> }
          </PopularUl>
        </Container>
    )
}
export default Popularity

const Container = styled.section`
  width:1400px;
  margin:24px auto 16px;
  ${mq[0]}{
    width: 100vw;
  }

  @media screen and (max-width: 1700px) {
       width: 1300px;
    }
`

const  PopularUl = styled.ul`
  display: flex;
  min-height: 300px;
  justify-content: space-around;
  align-items: center;
  gap:16px;
  margin-top:16px;
`
const PopularTitle = styled.h1`
  display: flex;
  gap:4px;
  align-items: center;
  font-weight: 700;
  font-size: 24px;
  color:${color.main}
`
