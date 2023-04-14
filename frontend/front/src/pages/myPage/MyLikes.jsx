import styled from '@emotion/styled';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import AuthHttp from '../../http/authHttp';
import Header from '../../components/layout/header/Header';
import Footer from '../../components/layout/footer/Footer';
import { StyledLink } from './MyAlarms';

const authHttp = new AuthHttp();

const MyLikes = () => {

    const params = useParams();
    const { userId } = params;

    const[GetPosts, setGetPosts] = useState([])

    useEffect(()=>{
        onMyLikes();
    },[])

    const onMyLikes = async () => {
        try {
          const res = await authHttp.getMyLikes(userId);
          console.log(res);
          setGetPosts(res.data.result.likeList);
        } catch (err) {
          console.log(err);
        }
      };

    return(
        <>
            <Header />
            <Wrap onClick={()=>{console.log(GetPosts.length)}}>
                <Title>내가 좋아요한 게시글</Title>
                {GetPosts.length === 0 ? (
                    <>
                        <div>좋아요한 게시글이 없습니다.</div>
                    </>
                )
                :
                (
                    <>
                        {GetPosts.map((post)=>(
                            <StyledLink to={`/category/${post.board_id}`} key={post.board_id}>
                                <BoxItem>
                                    <Img src={post.thumbnail}/>
                                    <PostTitle>{post.title}</PostTitle>
                                </BoxItem>
                            </StyledLink>
                        ))}
                    </>
                )
                }
            </Wrap>
            <Footer />
        </>
    )
}

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -10;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
`;

const Title = styled.div`
    font-size: 35px;
    margin-bottom: 50px;
    z-index: 100;
`

const BoxItem = styled.div`
    width: 900px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    height: 150px;
    border-radius: 30px;
    padding: 40px 60px;
    box-sizing: border-box;
    display: flex;
    margin-bottom: 30px;
    align-items: center;
    cursor: pointer;
`

const Img = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 20px;
    margin-right: 30px;
`

const PostTitle = styled.div`
    font-size: 23px;
    font-weight: 400;
`


export default MyLikes;