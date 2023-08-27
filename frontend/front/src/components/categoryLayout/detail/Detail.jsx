import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import WriteHttp from '../../../http/writeHttp';
import CommentList from '../../comment/CommentList';
import CategoryHttp from '../../../http/categoryHttp';
import { mobile } from '../../../constants/media/media';
import useModal from '../../../hooks/useModal';
import { useNavigate } from 'react-router';
import Header from '../../layout/header/Header';
import Footer from '../../layout/footer/Footer';
import Banner from '../../layout/home/banner/Banner';
import DetailBtn from '../detail/detailBtn/DetailBtn';
import Alert from '../../atomic/modal/Alert';
import { useMediaQuery } from 'react-responsive';

function Detail() {
  const categoryHttp = new CategoryHttp();
  const writeHttp = new WriteHttp();
  const isMobile = useMediaQuery({
    query: '(max-width:768px)',
  });
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
  const [IsModal, setIsModal] = useState(false);

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

  const OffLikeModal = () => {
    setIsModal(false);
  };

  const MoveLikeModal = () => {
    navigate('/login');
  };

  const onLike = async e => {
    e.preventDefault();
    if (isLoggedIn === false) {
      setIsModal(true);
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
    if (isLoggedIn === true) {
      try {
        const res = await categoryHttp.getisLiked(id, userId);
        setIsLiked(res.data.result.like);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const Props = {
    text: '해당 게시물을 삭제를 원하십니까?',
    setOpenModal: controller,
    onClick: FetchDelete,
  };

  const LikeProps = {
    body: {
      text: '로그인 후 이용 가능합니다.',
      icon: (
        <img src={`${process.env.PUBLIC_URL}/image/modal-icon.png`} alt='' />
      ),
    },

    buttons: {
      btn: [
        {
          text: '취소',
          onClick: OffLikeModal,
        },
        {
          text: '로그인',
          onClick: MoveLikeModal,
        },
      ],
    },
  };

  return (
    <>
      <Header categoryName={detailPost.category} />
      {!isMobile && <Banner />}
      <Container>
        <TopContainer>
          <TopHeader>
            <h1>{detailPost.category}</h1>
            <h2>{detailPost.title}</h2>
            <div>
              <span>{detailPost.create_date}</span>
              <span>view:{detailPost.view}</span>
            </div>
            <h3>{detailPost.user_name}</h3>
            <TopHeaderIconWrap>
              {detailPost.user_id === userId ? (
                <>
                  <li>
                    {IsLiked === true ? (
                      <p>
                        <LikeIcon
                          onClick={e => onLike(e)}
                          src='/image/heart-fill.png'
                          alt=''
                        />
                      </p>
                    ) : (
                      <p>
                        <LikeIcon
                          onClick={e => onLike(e)}
                          src='/image/heart.png'
                          alt=''
                        />
                      </p>
                    )}
                    <p>{detailPost.liked}</p>
                  </li>
                  <li>
                    <p className='msg'>
                      <img src='/image/msg.png' alt='' />
                    </p>
                    <p>{detailPost.commented}</p>
                  </li>
                  <DetailBtn board_id={id} />
                </>
              ) : (
                <>
                  <li>
                    {IsLiked === true ? (
                      <p>
                        <LikeIcon
                          onClick={e => onLike(e)}
                          src='/image/heart-fill.png'
                          alt=''
                        />
                      </p>
                    ) : (
                      <p>
                        <LikeIcon
                          onClick={e => onLike(e)}
                          src='/image/heart.png'
                          alt=''
                        />
                      </p>
                    )}
                    <p>{detailPost.liked}</p>
                  </li>
                  <li>
                    <p className='msg'>
                      <img src='/image/msg.png' alt='' />
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

      {IsModal && <Alert {...LikeProps} />}
    </>
  );
}
export default Detail;

const Container = styled.div`
  width:100%;
  max-width: 1440px;
  margin: 0 auto;

  @media screen and (max-width: 1700px) {
    width: 1300px;
  }

  @media screen and (max-width: 1020px) {
    width: 750px;
    padding-top: 10px;
  }

  @media screen and (max-width: 760px) {
    width: 370px;
  }
`;

const TopContainer = styled.div`
  margin: 24px auto;
  width: 100%;
  padding: 24px;
  box-sizing: border-box;
  border: 1px solid #ffa590;
  border-radius: 20px;

  @media screen and (max-width: 1020px) {
    width: 100%;
  }

  @media screen and (max-width: 760px) {
    margin: 89px auto;
    border: none;
  }
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
    ${mobile}{
      width: 70vw;
      word-break: keep-all;
    }
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
    gap: 10px;
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
  
  ${mobile}{
    gap:5px;
  }
  li {
    p {
      
      &.msg{
        position: relative;
        top: -2px;
        ${mobile}{
          top:0;
        }
      }
      
      
      font-size: 12px;
      width: 30px;
      height: 30px;
      ${mobile}{
        height:auto;
        img{
          width: 20px;
        }
      }
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

  img {
    width: 50vw;
  }

  @media screen and (max-width: 1020px) {
    min-height: 350px;
  }

  @media screen and (max-width: 760px) {
    min-height: 300px;
  }
`;
