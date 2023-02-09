import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import {  useSelector } from "react-redux";
import WriteHttp from "../../../http/writeHttp";
import CommentUpload from "../../comment/CommentUpload";
import CommentList from "../../comment/CommentList";

import CategoryHttp from "../../../http/categoryHttp";
import AuthHttp from "../../../http/authHttp";
import Alert from "../../modal/Alert";
import useModal from "../../../hooks/useModal";
import {useNavigate} from "react-router";

import Header from "../../layout/header/Header";
import Footer from "../../layout/footer/Footer";
import Banner from "../../layout/home/banner/Banner";

function Detail() {
    const categoryHttp = new CategoryHttp();
    const writeHttp = new WriteHttp();
    const authHttp = new AuthHttp();

    const navigate = useNavigate()

    const {userId} = useSelector(state => state.persistedReducer.userReducer);
    const [detailUserId,setDetailUserId] = useState(null);
    const { id } = useParams();
    const [detailPost, setDetailPost] = useState([]);
    const {isOpen,controller} = useModal();

    const FetchDelete = async () => {
        try {
            await categoryHttp.deleteCategoryList(id,userId);
            navigate(-1)
        }catch (err){
            alert('유저아이디가 일치하지 않습니다.')
        }
    }

    const onLike = async (e) => {
        e.preventDefault();
        try {
            const res = await authHttp.postLike(id);
            console.log(res);
        }catch (err){
            console.log(err.response);
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const res = await writeHttp.getDetailPost(id);
                setDetailPost(res.result);
                setDetailUserId(res.result.user_id);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);


  const Props = {
    text:'해당 게시물을 삭제를 원하십니까?',
    setOpenModal:controller,
    onClick:FetchDelete
  }
    return (
        <>

          <Header categoryName ={detailPost.category}/>
            <Banner />

            <Container>
                <Top>
                    <TopImg>
                        <img src={detailPost.thumbnail} alt="" />
                    </TopImg>
                    <TopText>
                        <TextTitle>{detailPost.title}</TextTitle>
                        <Text dangerouslySetInnerHTML={{ __html: detailPost.text }}></Text>
                        <LikeButton onClick={(e)=>onLike(e)}>좋아요</LikeButton>
                    </TopText>
                </Top>
                {detailUserId === userId ?
                <ButtonWrap>
                  <ButtonStyle onClick={controller}>삭제</ButtonStyle>
                  <ButtonStyle onClick={() => navigate(`/${id}/edit`)}>수정</ButtonStyle>
                </ButtonWrap>  : null}
                <CommentUpload boardId={id} />
                <CommentList boardId={id} />
            </Container>
              {isOpen && <Alert {...Props} />}
          <Footer />
        </>
    );
}
export default Detail;

const Container = styled.article`
    width: 1100px;
    margin: 100px auto 0;
`;
const Top = styled.div`
    display: flex;
    justify-content: space-between;
`;
const TopImg = styled.figure`
    width: 50%;
    height: 500px;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;
const TopText = styled.figcaption`
    width: 50%;
    height: 500px;
    border: 1px solid #eee;
    box-sizing: border-box;
    padding: 1rem 0 0;
    span {
        display: block;
        padding: 0 1rem;
        box-sizing: border-box;
    }
`;
const TextTitle = styled.span`
    font-size: 24px;
    font-weight: 600;
    height: 10%;
`;
const Text = styled.span`
    font-size: 18px;
    height: 80%;
    font-weight: 500;
`;
const LikeButton = styled.button`
    cursor: pointer;

    background: #222;
    height: 10%;
    width: 100%;
    color: wheat;
    transition: 0.5s;
    &:hover {
        background: #333;
    }
`;
const ButtonWrap = styled.div`
 display: flex;
  justify-content: end;
  gap:15px;
`
const ButtonStyle = styled.button`
  
  margin-top:10px;
  width: 100px;
  height: 50px;
  border:1px solid #ccc;
  background:#ffffff;
  cursor: pointer;
  border-radius: 3px;
  &:hover{
    background:#222;
    color:#ffffff;
  }
  &:focus{
    border:1px solid #ccc;
  }
`