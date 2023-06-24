import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import AuthHttp from '../../http/authHttp';
import Layout from '../../components/layout/Layout';
import MypageNav from '../../components/mypage/myPageNav';
import {
  Wrap,
  Text,
  BoxWrap,
  PageWrap,
  RedIconWrap,
  RedIcon,
  IconText,
  EmptyText,
  ContentsWrap,
  ContentsText,
  ContentsArrow,
} from './MyPosts';
import Alert from '../../components/atomic/modal/Alert';
import Pagination from '../../components/mypage/pagination';

const authHttp = new AuthHttp();

const MyLikes = () => {
  const params = useParams();

  const { ref, inView } = useInView();

  let { userId } = params;
  userId = parseInt(userId);
  const userId2 = useSelector(
    state => state.persistedReducer.userReducer.userId
  );

  const navigate = useNavigate();

  //유저 정보
  const [UserInfo, setUserInfo] = useState([]);

  //좋아요 리스트
  const [Likes, setLikes] = useState([]);

  //페이지 네이션
  const [Page, setPage] = useState([]);
  const [SelectedButton, setSelectedButton] = useState(0);

  //편집 버튼 state
  const [IsEdit, setIsEdit] = useState(false);

  //좋아요 리스트 삭제
  const [BoardIdList, setBoardIdList] = useState([]);

  //모달창 state
  const [IsModal, setIsModal] = useState(false);

  //모바일 화면 체크
  const [IsMobile, setIsMobile] = useState(false);

  //모바일 인피니트 스크롤
  const [MoreData, setMoreData] = useState(1);

  //footer 위치
  const [FooterBottom, setFooterBottom] = useState(false);

  //유저 정보 불러오기, 좋아요 리스트 불러오기
  useEffect(() => {
    onMypage();
    getLikeList();

    if (userId !== userId2) {
      navigate('/notfound');
    }
  }, [SelectedButton]);

  //모바일 화면 체크
  useEffect(() => {
    checkIsMobile(); // 초기 로드 시 한 번 실행
    window.addEventListener('resize', checkIsMobile); // 윈도우 크기 변경 시 실행

    return () => {
      window.removeEventListener('resize', checkIsMobile); // 컴포넌트가 unmount 될 때 이벤트 리스너 제거
    };
  }, []);

  //인피니트 스크롤
  useEffect(() => {
    if (inView) {
      getMobileLikeList();
    }
    console.log('check');
  }, [inView]);

  //유저 정보 불러오기 함수
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
      console.log('좋아요한 게시글 리스트', res);
      setLikes(res.data.result.commentList);
      const arrayLength = res.data.result.total;
      const newArray = new Array(arrayLength).fill(0).map((_, index) => index);
      setPage(newArray);
    } catch (err) {
      console.log(err);
    }
  };

  //인피니트 스크롤로 좋아요 리스트 얻기
  const getMobileLikeList = async () => {
    try {
      const res = await authHttp.getLikeList(userId, MoreData);
      console.log(res);
      const newLikes = [...Likes, ...res.data.result.commentList];
      setLikes(newLikes);
      console.log('length', newLikes.length);
      if (MoreData < res.data.result.total) {
        setMoreData(prev => prev + 1);
      }
      if (newLikes.length > 9) {
        setFooterBottom(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //모바일 화면 체크 함수
  const checkIsMobile = () => {
    const isMobileDevice = window.matchMedia('(max-width: 760px)').matches;
    setIsMobile(isMobileDevice);
  };

  //좋아요 리스트 다중삭제 함수
  const onDeleteLikeList = async () => {
    const num = BoardIdList;
    console.log('num', num);

    try {
      const res = await authHttp.deleteLikeList(userId, num);
      console.log(res);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  //다중삭제용 배열 값 컨트롤 함수
  const handleBoardIdList = boardId => {
    if (BoardIdList.includes(boardId)) {
      // 이미 체크한 보드를 다시 클릭한 경우
      setBoardIdList(BoardIdList.filter(id => id !== boardId));
    } else {
      // 체크하지 않은 보드를 클릭한 경우
      setBoardIdList([...BoardIdList, boardId]);
    }
  };

  //페이지네이션 함수
  const handlePagination = buttonValue => {
    setSelectedButton(buttonValue);
  };

  //편집모드 닫기 함수
  const offEdit = e => {
    e.preventDefault();

    setIsEdit(false);
    setBoardIdList([]);
  };

  //모달창 닫기 함수
  const offModal = () => {
    setIsModal(false);
  };

  const Props = {
    body: {
      text: '삭제하시겠습니까?',
      icon: (
        <img src={`${process.env.PUBLIC_URL}/image/modal-icon.png`} alt='' />
      ),
      subText: <>삭제하면 복구가 불가능 합니다.</>,
    },

    buttons: {
      btn: [
        {
          text: '취소',
          onClick: offModal,
        },
        {
          text: '삭제',
          onClick: onDeleteLikeList,
        },
      ],
    },
  };

  return (
    <Layout>
      <Wrap length={FooterBottom}>
        <Text>마이페이지</Text>
        <BoxWrap>
          <MypageNav
            userNickName={UserInfo.nickname}
            userName={UserInfo.username}
            userEmail={UserInfo.email}
            categoryName='likes'
            userId={userId}
            userImage={UserInfo.user_image}
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
                    onClick={e => offEdit(e)}
                  >
                    취소
                  </EditButton>
                  {BoardIdList.length !== 0 ? (
                    <EditButton
                      backColor='#FF4122'
                      border='1px solid #FF4122'
                      color='white'
                      onClick={() => setIsModal(true)}
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
                  mobileBackColor='#ffffff'
                  mobileColor='#FF4122'
                  color='white'
                  onClick={() => setIsEdit(true)}
                >
                  편집
                </EditButton>
              )}
            </TopWrap>
            {Likes.length === 0 ? (
              <EmptyText top>좋아요 누른 글이 없습니다.</EmptyText>
            ) : (
              <>
                <ContentsWrap marginTop>
                  {Likes.map(like => (
                    <ImgTextWrap key={like.board_id}>
                      {IsEdit && (
                        <>
                          {BoardIdList.includes(like.board_id) ? (
                            <CheckImg
                              src='/image/mylike-check.png'
                              onClick={e => handleBoardIdList(like.board_id)}
                            />
                          ) : (
                            <CheckImg
                              src='/image/mylike-check-x.png'
                              onClick={e => handleBoardIdList(like.board_id)}
                            />
                          )}
                        </>
                      )}
                      <ContentsBox
                        include={BoardIdList.includes(like.board_id)}
                        onClick={() => {
                          window.open(
                            `https://www.teamprojectvv.shop/category/${like.board_id}`,
                            '_self'
                          );
                        }}
                      >
                        <ContentsText>
                          {like.title} ({like.commented})
                        </ContentsText>
                        <ContentsArrow src='/image/mypage-alarms-arrow.png' />
                      </ContentsBox>
                    </ImgTextWrap>
                  ))}
                </ContentsWrap>

                {IsMobile ? (
                  <div ref={ref}></div>
                ) : (
                  <>
                    {/* 페이지네이션 */}
                    <Pagination
                      handlePagination={handlePagination}
                      Page={Page}
                      SelectedButton={SelectedButton}
                    />
                  </>
                )}
              </>
            )}
          </PageWrap>
          {IsModal && <Alert {...Props} />}
        </BoxWrap>
      </Wrap>
    </Layout>
  );
};

const TopWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  top: -10px;

  @media screen and (max-width: 1080px) {
    top: 0px;
  }
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

  @media screen and (max-width: 760px) {
    width: 90px;
    height: 40px;
    margin-top: 45px;
    margin-right: ${props => (props.marginRight ? '8px' : '16px')};
    background-color: ${props => props.mobileBackColor};
    color: ${props => props.mobileColor};
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImgTextWrap = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 760px) {
    border-bottom: 1px solid #ced4da;
  }
`;

const CheckImg = styled.img`
  margin-right: 11px;
  cursor: pointer;

  @media screen and (max-width: 1700px) {
    width: 28px;
  }
`;

const ContentsBox = styled.div`
  width: 100%;
  height: 5.8vh;
  border: ${props =>
    props.include ? '1px solid #FFA590' : '1px solid #ced4da'};
  border-radius: 10px;
  margin: 5px 0;
  margin-top: ${props => props.marginTop};
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  cursor: pointer;
  transition: 0.2s;
  position: relative;
  background-color: ${props => (props.include ? '#FFECE8' : 'white')};

  &:hover {
    border: 1px solid #ffa590;
  }

  &:active {
    background-color: #f0f0f0;
    border: 1px solid #ff4122;
  }

  @media screen and (max-width: 760px) {
    border: none;
    border-radius: 0;
    padding: 35px 25px;
    margin: 0;
  }
`;

export default MyLikes;
