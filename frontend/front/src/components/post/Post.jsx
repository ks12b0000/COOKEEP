import styled from "@emotion/styled";
import {Link, useParams} from "react-router-dom";
function Post({data}) {
    return(
        <>
        { data.map((item,index) =>{
                const dt = new Date(item.create_date);
                const DateString =dt.toLocaleDateString()
          return(
            <PopularList key ={index}>
              <Link to  ={`/category/${item.board_id}`}>
                <PopularListImg><img src={item.thumbnail} alt="썸네일"/></PopularListImg>
                  <PopularTextBox>
                    <TextBoxLeft>
                      <LeftYear><span>{DateString}</span></LeftYear>
                      <LeftTitle><span>{item.title}</span></LeftTitle>
                      <LeftTag>
                        <LeftWrite>{item.user_name}</LeftWrite>
                        <LeftHashTag>{item.tags}</LeftHashTag>
                      </LeftTag>
                    </TextBoxLeft>
                    <TextBoxRight>
                      <div>
                        <RightImg><img src={`${process.env.PUBLIC_URL}/image/like.png`} alt=""/></RightImg>
                          <span>{item.liked}</span>
                      </div>
                      <div>
                        <RightImg> <img src={`${process.env.PUBLIC_URL}/image/message-dots-circle.png`} alt=""/></RightImg>
                          <span>{item.commented}</span>
                     </div>
                  </TextBoxRight>
                </PopularTextBox>
              </Link>
          </PopularList> )})}
        </>
    )
}
export  default  Post;

const PopularList = styled.li`
    border-radius: 20px;
    width: 19%;
    box-sizing: border-box;
    transition: 0.3s ease-in-out;
    cursor: pointer;

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
  img{
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    width: 100%;
    height: 100%;
    object-fit: cover;
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
`

const TextBoxLeft = styled.div`
  width: 65%;
`

const LeftYear = styled.p`
  span{
    vertical-align: text-top;
    font-size: 12px;
    font-weight: 400;
    color: #CBCBCB;
  
  }
  padding-bottom:2px;
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
const RightImg = styled.div`
  width: 24px;
  height: 24px;

  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
 `