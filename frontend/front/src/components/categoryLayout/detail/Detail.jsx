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
import TopContent from "../cateItem/top-content";


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

                <TopContent detailPost={detailPost} />

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
    width: 1440px;
    margin: 0 auto ;

 
`;


