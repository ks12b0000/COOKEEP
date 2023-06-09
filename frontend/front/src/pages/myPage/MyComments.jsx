import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
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
  let { userId } = params;
  userId = parseInt(userId);
  const userId2 = useSelector(
    state => state.persistedReducer.userReducer.userId
  );

  const navigate = useNavigate();

  const [UserInfo, setUserInfo] = useState([]);

  const [Comments, setComments] = useState([]);
  const [Page, setPage] = useState([]);
  const [SelectedButton, setSelectedButton] = useState(0);

  useEffect(() => {
    onMypage();
    getCommentList();

    if (userId !== userId2) {
      navigate('/notfound');
    }
  }, [SelectedButton]);

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

  // 페이지 네이션 함수
  const handlePagination = buttonValue => {
    setSelectedButton(buttonValue);
  };

  return (
    <Layout>
      <Wrap>
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

                {/* 페이지네이션 */}
                <Pagination
                  handlePagination={handlePagination}
                  Page={Page}
                  SelectedButton={SelectedButton}
                />
              </>
            )}
          </PageWrap>
        </BoxWrap>
      </Wrap>
    </Layout>
  );
};

export default MyComments;
