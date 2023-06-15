import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import AuthHttp from '../../http/authHttp';
import Layout from '../../components/layout/Layout';
import MypageNav from '../../components/mypage/myPageNav';
import Pagination from '../../components/mypage/pagination';

const authHttp = new AuthHttp();

const MyPosts = () => {
  const params = useParams();

  const { ref, inView } = useInView();

  let { userId } = params;
  userId = parseInt(userId);
  const userId2 = useSelector(
    state => state.persistedReducer.userReducer.userId
  );

  const navigate = useNavigate();

  //유저정보
  const [UserInfo, setUserInfo] = useState([]);

  //작성글 리스트
  const [Posts, setPosts] = useState([]);

  //페이지 네이션
  const [Page, setPage] = useState([]);
  const [SelectedButton, setSelectedButton] = useState(0);

  //모바일 화면 체크
  const [IsMobile, setIsMobile] = useState(false);

  //모바일 인피니트 스크롤
  const [MoreData, setMoreData] = useState(1);

  //footer 위치
  const [FooterBottom, setFooterBottom] = useState(false);

  //유저 정보 불러오기, Post정보 불러오기
  useEffect(() => {
    onMypage();
    getPostList();

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
      getMobilePostList();
    }
    console.log('check');
  }, [inView]);

  const onMypage = async () => {
    try {
      const res = await authHttp.getMypage(userId);
      setUserInfo(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const getPostList = async () => {
    try {
      const res = await authHttp.getPostList(userId, SelectedButton);
      console.log(res);
      setPosts(res.data.result.boardList);
      const arrayLength = res.data.result.total;
      const newArray = new Array(arrayLength).fill(0).map((_, index) => index);
      setPage(newArray);
    } catch (err) {
      console.log(err);
    }
  };

  //모바일용 인피니트 스크롤 함수
  const getMobilePostList = async () => {
    try {
      const res = await authHttp.getPostList(userId, MoreData);
      console.log(res);
      const newPosts = [...Posts, ...res.data.result.boardList];
      setPosts(newPosts);
      if (MoreData < res.data.result.total) {
        setMoreData(prev => prev + 1);
      }
      if (newPosts.length > 9) {
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

  //페이지 네이션 함수
  const handlePagination = buttonValue => {
    setSelectedButton(buttonValue);
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
            categoryName='posts'
            userId={userId}
            userImage={UserInfo.user_image}
          />
          <PageWrap>
            <RedIconWrap>
              <RedIcon>
                <img src='/image/mypage-post-r.png' alt='icon' />
              </RedIcon>
              <IconText>내가 작성한 글</IconText>
            </RedIconWrap>
            {Posts.length === 0 ? (
              <EmptyText>작성한 글이 없습니다.</EmptyText>
            ) : (
              <>
                <ContentsWrap>
                  {Posts.map((post, i) => (
                    <ContentsBox
                      onClick={() => {
                        window.open(
                          `https://www.teamprojectvv.shop/category/${post.board_id}`,
                          '_self'
                        );
                      }}
                      key={i}
                    >
                      <ContentsText>
                        {post.title} ({post.commented})
                      </ContentsText>
                      <ContentsArrow src='/image/mypage-alarms-arrow.png' />
                    </ContentsBox>
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
        </BoxWrap>
      </Wrap>
    </Layout>
  );
};

export const Wrap = styled.div`
  width: 1440px;
  margin: 0 auto;
  height: 74.2vh;
  margin-bottom: 10vh;

  @media screen and (max-width: 1700px) {
    width: 1300px;
  }

  @media screen and (max-width: 1020px) {
    width: 760px;
    height: 75vh;
  }

  @media screen and (max-width: 760px) {
    width: 100%;
    margin-bottom: 0;
    height: ${props => (props.length ? 'auto' : '92.5vh')};
  }
`;

export const Text = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
  margin-top: 3vh;
  color: #ed3419;

  @media screen and (max-width: 760px) {
    font-size: 18px;
    display: none;
  }
`;

export const BoxWrap = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
  display: grid;
  grid-template-columns: 25% 73%;
  justify-content: space-between;

  @media screen and (max-width: 1024px) {
    grid-template-columns: 29% 68%;
  }

  @media screen and (max-width: 760px) {
    grid-template-columns: 100%;
  }
`;

export const PageWrap = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #ff6242;
  border-radius: 10px;
  padding: 30px 25px;
  box-sizing: border-box;
  position: relative;

  @media screen and (max-width: 760px) {
    border: none;
    padding: 0;
  }
`;

export const RedIconWrap = styled.div`
  display: flex;
  @media screen and (max-width: 1080px) {
    margin-bottom: 70px;
  }

  @media screen and (max-width: 760px) {
    margin-top: 90px;
    margin-left: 18px;
    margin-bottom: 40px;
  }
`;

export const RedIcon = styled.div`
  width: 23px;
  height: 23px;
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
  top: ${props => (props.top ? '-35px' : '-15px')};
`;

export const ContentsWrap = styled.div`
  margin-top: ${props => (props.marginTop ? '6px' : '30px')};

  @media screen and (max-width: 1080px) {
    margin-bottom: 60px;
  }

  @media screen and (max-width: 760px) {
    margin-bottom: 0;
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

  @media screen and (max-width: 1080px) {
    margin: 15px 0;
  }

  @media screen and (max-width: 760px) {
    border: none;
    border-bottom: 1px solid #ced4da;
    border-radius: 0;
    padding: 35px 25px;
    margin: 0;
  }
`;
export const ContentsText = styled.div`
  font-weight: 400;
  font-size: 14px;
  opacity: ${props => (props.checked ? '0.4' : '')};

  @media screen and (max-width: 760px) {
    width: 85%;
  }
`;

export const ContentsArrow = styled.img`
  position: absolute;
  top: 50%;
  left: 97%;
  transform: translate(0, -50%);
  opacity: ${props => (props.checked ? '0.2' : '')};

  @media screen and (max-width: 1080px) {
    left: 95%;
  }

  @media screen and (max-width: 760px) {
    position: relative;
    top: 0;
    left: 0;
    transform: translate(0, 0);
    margin-left: auto;
  }
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

export default MyPosts;
