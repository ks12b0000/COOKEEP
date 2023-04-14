import styled from "@emotion/styled";
import {Link, useParams} from "react-router-dom";
import PostLike from './PostLike';
import CategoryHttp from "../../http/categoryHttp";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

function Post({data}) {
    const boradId  =data.map((item) => item.board_id);
    console.log(boradId);
    const categoryHttp = new CategoryHttp();

    const { userId } = useSelector(state => state.persistedReducer.userReducer);
    const { isLoggedIn } = useSelector(
        state => state.persistedReducer.userReducer
    );
    const [IsLiked, setIsLiked] = useState(false);

    useEffect(() => {
        checkIsLiked()
    }, []);

    // 좋아요 눌렀는지 여부 체크

    const checkIsLiked = async () => {
        if(isLoggedIn===true){
            try {
                const res = await categoryHttp.getisLiked([boradId], userId);
                setIsLiked(res.data.result.like);
            } catch (err) {
                console.log(err);
            }
        }
    };


    return(
        <>
        { data.map((item,index) =>{
                const dt = new Date(item.create_date);
                const DateString =dt.toLocaleDateString()

          return (
            <PopularList key={index}>
              <Link to={`/category/${item.board_id}`}>
                <PopularListImg>
                  <img src={item.thumbnail} alt='썸네일' />
                </PopularListImg>
                <PopularTextBox>
                  <TextBoxLeft>
                    <h2>{item.category}</h2>
                    <LeftYear>
                      <span>{DateString}</span>
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
                        <PostLike boardId={item.board_id}/>
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
          );})}
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
  h2{
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #CBCBCB;
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
 `;