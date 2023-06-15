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
  PageWrap,
  Text,
  BoxWrap,
  RedIconWrap,
  RedIcon,
  IconText,
  EmptyText,
  ContentsWrap,
  ContentsText,
  ContentsBox,
  ContentsArrow,
} from './MyPosts';
import Pagination from '../../components/mypage/pagination';

const authHttp = new AuthHttp();

const MyComments = () => {
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

  //작성한 댓글 리스트
  const [Comments, setComments] = useState([]);

  //페이지 네이션
  const [Page, setPage] = useState([]);
  const [SelectedButton, setSelectedButton] = useState(0);

  //모바일 화면 체크
  const [IsMobile, setIsMobile] = useState(false);

  //모바일 인피니트 스크롤
  const [MoreData, setMoreData] = useState(1);

  //footer 위치
  const [FooterBottom, setFooterBottom] = useState(false);

  //유저 정보 불러오기, Comment정보 불러오기
  useEffect(() => {
    onMypage();
    getCommentList();

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

  const getCommentList = async () => {
    try {
      const res = await authHttp.getCommentList(userId, SelectedButton);
      console.log(res);
      setComments(res.data.result.commentList);
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
      const res = await authHttp.getCommentList(userId, MoreData);
      console.log(res);
      const newComments = [...Comments, ...res.data.result.commentList];
      setComments(newComments);
      if (MoreData < res.data.result.total) {
        setMoreData(prev => prev + 1);
      }
      if (newComments.length > 9) {
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

  // 페이지 네이션 함수
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
            categoryName='comments'
            userId={userId}
            userImage={UserInfo.user_image}
          />
          <PageWrap>
            <RedIconWrap>
              <RedIcon>
                <img src='/image/mypage-comment-r.png' alt='icon' />
              </RedIcon>
              <IconText>내가 댓글 단 글</IconText>
            </RedIconWrap>
            {Comments.length === 0 ? (
              <EmptyText>내가 댓글 단 글이 없습니다.</EmptyText>
            ) : (
              <>
                <ContentsWrap>
                  {Comments.map(comment => (
                    <ContentsBox
                      onClick={() => {
                        window.open(
                          `https://www.teamprojectvv.shop/category/${comment.board_id}`,
                          '_self'
                        );
                      }}
                      key={comment.board_id}
                    >
                      <ContentsText>
                        {comment.title} ({comment.commented})
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

export default MyComments;
