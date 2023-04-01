import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import WriteHttp from '../../../http/writeHttp';
import CommentList from '../../comment/CommentList';
import CategoryHttp from '../../../http/categoryHttp';

import useModal from '../../../hooks/useModal';
import { useNavigate } from 'react-router';
import Header from '../../layout/header/Header';
import Footer from '../../layout/footer/Footer';
import Banner from '../../layout/home/banner/Banner';
import DetailBtn from '../detail/detailBtn/DetailBtn';
import Alert from '../../atomic/modal/Alert';

function Detail() {
  const categoryHttp = new CategoryHttp();
  const writeHttp = new WriteHttp();

  const navigate = useNavigate();

  const { userId } = useSelector(state => state.persistedReducer.userReducer);
  const { isLoggedIn } = useSelector(
    state => state.persistedReducer.userReducer
  );
  const [detailUserId, setDetailUserId] = useState(null);

  const { id } = useParams();

  //state
  const [detailPost, setDetailPost] = useState([]);
  const [IsLiked, setIsLiked] = useState(false);

  const { isOpen, controller } = useModal();

  useEffect(() => {
    getPost();
    checkIsLiked();
    console.log('detail', detailPost);
  }, [IsLiked]);

  const getPost = async () => {
    try {
      const res = await writeHttp.getDetailPost(id);
      setDetailPost(res.result);
      setDetailUserId(res.result.user_id);
    } catch (err) {
      console.log(err);
    }
  };

  const FetchDelete = async () => {
    try {
      await categoryHttp.deleteCategoryList(id, userId);
      navigate(-1);
    } catch (err) {
      alert('유저아이디가 일치하지 않습니다.');
    }
  };

  const onLike = async e => {
    e.preventDefault();
    if (isLoggedIn === false) {
      alert('로그인이 필요한 기능입니다.');
    } else {
      try {
        const res = await categoryHttp.postLike(id);
        if (res.data.result === '좋아요 취소 성공.') {
          setIsLiked(false);
        }

        if (res.data.result === '좋아요 누르기 성공.') {
          setIsLiked(true);
        }
        console.log(res);
      } catch (err) {
        console.log(err.response);
      }
    }
  };

  const checkIsLiked = async () => {
    try {
      const res = await categoryHttp.getisLiked(id, userId);
      setIsLiked(res.data.result.like);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const Props = {
    text: '해당 게시물을 삭제를 원하십니까?',
    setOpenModal: controller,
    onClick: FetchDelete,
  };

  return (
    <>
      <Header categoryName={detailPost.category} />
      <Banner />

      <Container>
        <TopContainer>
          <TopHeader>
            <h1>{detailPost.category}</h1>
            <h2>{detailPost.title}</h2>
            <div>
              <span>{detailPost.create_date}</span>
              <span>{detailPost.view}</span>
            </div>
            <h3>{detailPost.user_name}</h3>
            <TopHeaderIconWrap>
              {detailPost.user_id === userId ? (
                <DetailBtn board_id={id} />
              ) : (
                <>
                  <li>
                    {IsLiked === true ? (
                      <p>
                        <LikeIcon
                          onClick={e => onLike(e)}
                          src='/image/like-fill.png'
                          alt=''
                        />
                      </p>
                    ) : (
                      <p>
                        <LikeIcon
                          onClick={e => onLike(e)}
                          src='/image/like.png'
                          alt=''
                        />
                      </p>
                    )}
                    <p>{detailPost.liked}</p>
                  </li>
                  <li>
                    <p>
                      <img src='/image/message-dots-circle.png' alt='' />
                    </p>
                    <p>{detailPost.commented}</p>
                  </li>
                </>
              )}
            </TopHeaderIconWrap>
          </TopHeader>
          <TopBody>
            <div dangerouslySetInnerHTML={{ __html: detailPost.text }} />
          </TopBody>
        </TopContainer>

        {/* 댓긅 */}
        <CommentList boardId={id} userName={detailPost.user_name} />
      </Container>

      {isOpen && <Alert {...Props} />}
      <Footer />
    </>
  );
}
export default Detail;

const Container = styled.article`
  width: 1440px;
  margin: 0 auto;
`;

const TopContainer = styled.div`
  margin: 24px auto;
  width: 100%;
  padding: 24px;
  box-sizing: border-box;
  border: 1px solid #ffa590;
  border-radius: 20px;
`;
const TopHeader = styled.div`
  position: relative;
  //카테고리
  h1 {
    font-weight: 500;
    font-size: 18px;
    line-height: 23px;
    color: #ff4122;
  }
  //타이틀
  h2 {
    margin-top: 9px;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    color: #000000;
  }
  //작성자
  h3 {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    color: #b0b0b0;
  }
  > div {
    margin: 8px 0;
    display: flex;
    gap: 16px;
    span {
      display: block;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
      color: #b0b0b0;
    }
  }
`;
const TopHeaderIconWrap = styled.ul`
  display: flex;
  text-align: center;
  gap: 14px;
  position: absolute;
  right: 0;
  top: 0;
  color: #b0b0b0;
  li {
    p {
      font-size: 12px;
      width: 30px;
      height: 30px;
      margin-bottom: 2px;
    }
  }
`;

const LikeIcon = styled.img`
  margin-top: 2px;
  cursor: pointer;
`;

const TopBody = styled.div`
  margin: 16px auto 0;
  padding-top: 16px;
  box-sizing: border-box;
  border-top: 1px solid #ced4da;
  text-align: center;
  min-height: 750px;
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;
  color: #3e4145;
`;
