import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import AuthHttp from '../../http/authHttp';
import Layout from '../../components/layout/Layout';
import MypageNav from '../../components/mypage/myPageNav';
import {
  Button,
  Arrow,
  DoubleArrow,
} from '../../components/comment/CommentList';

const authHttp = new AuthHttp();

const MyLikes = () => {
  const params = useParams();
  const { userId } = params;

  const navigate = useNavigate();

  const username = useSelector(
    state => state.persistedReducer.userReducer.username
  );

  const [UserInfo, setUserInfo] = useState([]);

  const [Likes, setLikes] = useState([]);
  const [Page, setPage] = useState([]);
  const [SelectedButton, setSelectedButton] = useState(0);
  const [Count, setCount] = useState(0);
  const [IsEdit, setIsEdit] = useState(false);
  const [BoardIdList, setBoardIdList] = useState([]);

  useEffect(() => {
    onMypage();
    getLikeList();
  }, [SelectedButton]);

  //유저 정보 불러오기
  const onMypage = async () => {
    try {
      const res = await authHttp.getMypage(userId);
      setUserInfo(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  //좋아요한 게시글 리스트 불러오기
  const getLikeList = async () => {
    try {
      const res = await authHttp.getLikeList(userId, SelectedButton);
      console.log(res);
      setLikes(res.data.result.commentList);
      setCount(res.data.result.total);
      const arrayLength = res.data.result.total;
      const newArray = new Array(arrayLength).fill(0).map((_, index) => index);
      setPage(newArray);
    } catch (err) {
      console.log(err);
    }
  };

  //좋아요 한 게시글 리스트 다중삭제
  const onDeletLikeList = async e => {
    e.preventDefault();

    const params = {
      'boardIdList' : BoardIdList
    }

    try {
      const res = await authHttp.deleteLikeList(userId, params);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBoardIdList = boardId => {
    if (BoardIdList.includes(boardId)) {
      // 이미 체크한 보드를 다시 클릭한 경우
      setBoardIdList(BoardIdList.filter(id => id !== boardId));
    } else {
      // 체크하지 않은 보드를 클릭한 경우
      setBoardIdList([...BoardIdList, boardId]);
    }
  };

  // 페이지 네이션 함수
  //넘버 버튼으로 페이지 불러오기
  const pageList = pageNum => {
    setSelectedButton(pageNum);
  };

  //left arrow 버튼으로 페이지 불러오기
  const leftList = () => {
    if (SelectedButton > 0) {
      setSelectedButton(prev => prev - 1);
    }
  };

  //right arrow 버튼으로 페이지 불러오기
  const rightList = () => {
    if (SelectedButton < Page.length - 1) {
      setSelectedButton(prev => prev + 1);
    }
  };

  //첫 페이지로 이동
  const firstList = () => {
    if (SelectedButton > 0) {
      setSelectedButton(0);
    }
  };

  //마지막 페이지로 이동
  const lastList = () => {
    if (SelectedButton < Page.length - 1) {
      setSelectedButton(Page.length - 1);
    }
  };

  return (
    <Layout>
      <Wrap>
        <Text>마이페이지</Text>
        {username === UserInfo.username ? (
          <>
            <BoxWrap>
              <MypageNav
                userNickName={UserInfo.nickname}
                userName={UserInfo.username}
                userEmail={UserInfo.email}
                categoryName='likes'
                userId={userId}
              />
              <PageWrap>
                <TopWrap>
                  <RedIconWrap>
                    <RedIcon>
                      <img src='/image/mypage-like-r.png' alt='icon' />
                    </RedIcon>
                    <IconText>내가 좋아요한 글</IconText>
                  </RedIconWrap>
                  {IsEdit ? (
                    <ButtonWrap>
                      <EditButton
                        backColor='white'
                        border='1px solid #FF4122'
                        color='#FF4122'
                        marginRight
                        onClick={() => setIsEdit(false)}
                      >
                        취소
                      </EditButton>
                      {BoardIdList.length !== 0 ? (
                        <EditButton
                          backColor='#FF4122'
                          border='1px solid #FF4122'
                          color='white'
                          onClick={e => onDeletLikeList(e)}
                        >
                          삭제
                        </EditButton>
                      ) : (
                        <EditButton
                          backColor='#F0F0F0'
                          border='1px solid #F0F0F0'
                          color='white'
                          cursor='true'
                        >
                          삭제
                        </EditButton>
                      )}
                    </ButtonWrap>
                  ) : (
                    <EditButton
                      backColor='#FF4122'
                      border='1px solid #FF4122'
                      color='white'
                      onClick={() => setIsEdit(true)}
                    >
                      편집
                    </EditButton>
                  )}
                </TopWrap>
                {Likes.length === 0 ? (
                  <EmptyText>좋아요 누른 글이 없습니다.</EmptyText>
                ) : (
                  <>
                    <ContentsWrap>
                      {Likes.map(like => (
                        <ImgTextWrap key={like.board_id}>
                          {IsEdit && (
                            <>
                              {BoardIdList.includes(like.board_id) ? (
                                <CheckImg
                                  src='/image/mylike-check.png'
                                  onClick={e =>
                                    handleBoardIdList(like.board_id)
                                  }
                                />
                              ) : (
                                <CheckImg
                                  src='/image/mylike-check-x.png'
                                  onClick={e =>
                                    handleBoardIdList(like.board_id)
                                  }
                                />
                              )}
                            </>
                          )}
                          <ContentsBox
                            onClick={() => {
                              window.open(
                                `https://www.teamprojectvv.shop/category/${like.board_id}`,
                                '_self'
                              );
                            }}
                          >
                            <ContentsText>{like.title}</ContentsText>
                            <ContentsArrow src='/image/mypage-alarms-arrow.png' />
                          </ContentsBox>
                        </ImgTextWrap>
                      ))}
                    </ContentsWrap>

                    <Nav>
                      {SelectedButton > 0 && (
                        <Button onClick={() => firstList()}>
                          <DoubleArrow url='/image/double-arrow-left.png' />
                        </Button>
                      )}
                      <Button onClick={() => leftList()}>
                        <Arrow url='/image/arrow-left.png' />
                      </Button>
                      {Page.map((page, i) => (
                        <Button
                          key={i}
                          onClick={() => pageList(page)}
                          aria-current={page === SelectedButton ? 'true' : null}
                        >
                          {page + 1}
                        </Button>
                      ))}
                      <Button onClick={() => rightList()}>
                        <Arrow url='/image/arrow-right.png' />
                      </Button>
                      {SelectedButton < Page.length - 1 && (
                        <Button onClick={() => lastList()}>
                          <DoubleArrow url='/image/double-arrow-right.png' />
                        </Button>
                      )}
                    </Nav>
                  </>
                )}
              </PageWrap>
            </BoxWrap>
          </>
        ) : (
          navigate('/notfound')
        )}
      </Wrap>
    </Layout>
  );
};

export const Wrap = styled.div`
  width: 1440px;
  margin: 0 auto;
  height: 73vh;
  margin-bottom: 10vh;

  @media screen and (max-width: 1700px) {
    width: 1300px;
  }
`;

export const Text = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
  margin-top: 3vh;
  color: #ed3419;
`;

export const BoxWrap = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
  display: grid;
  grid-template-columns: 25% 73%;
  justify-content: space-between;
`;

export const PageWrap = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #ff6242;
  border-radius: 10px;
  padding: 30px 25px;
  box-sizing: border-box;
  position: relative;
`;

const TopWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EditButton = styled.div`
  width: 110px;
  height: 40px;
  border-radius: 5px;
  background-color: ${props => props.backColor};
  border: ${props => props.border};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.color};
  font-weight: 500;
  font-size: 16px;
  margin-right: ${props => (props.marginRight ? '10px' : '')};
  cursor: ${props => (props.cursor ? '' : 'pointer')};
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const RedIconWrap = styled.div`
  display: flex;
`;

export const RedIcon = styled.div`
  width: 23px;
  height: 23px;
  padding-top: 2px;
  box-sizing: border-box;
`;

export const IconText = styled.div`
  font-size: 18px;
  font-weight: 800;
  color: #fb3b1e;
  margin-left: 6px;
`;

export const EmptyText = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  color: #fb3b1e;
  top: -15px;
`;

export const ContentsWrap = styled.div`
  margin-top: 30px;
`;

const ImgTextWrap = styled.div`
  display: flex;
  align-items: center;
`;

const CheckImg = styled.img`
  margin-right: 11px;
  cursor: pointer;

  @media screen and (max-width: 1700px) {
    width: 28px;
  }
`;

export const ContentsBox = styled.div`
  width: 100%;
  height: 5.8vh;
  border: 1px solid #ced4da;
  border-radius: 10px;
  margin: 10px 0;
  margin-top: ${props => props.marginTop};
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  cursor: pointer;
  transition: 0.2s;
  position: relative;

  &:hover {
    border: 1px solid #ffa590;
  }

  &:active {
    background-color: #f0f0f0;
    border: 1px solid #ff4122;
  }
`;

export const ContentsText = styled.div`
  font-weight: 400;
  font-size: 13px;
`;

const ContentsArrow = styled.img`
  position: absolute;
  top: 50%;
  left: 97%;
  transform: translate(0, -50%);
`;

//페이지네이션
export const Nav = styled.nav`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
  top: 90.6%;
  left: 50%;
  transform: translate(-50%, 0);
`;

export default MyLikes;
