import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import AuthHttp from '../../http/authHttp';
import Layout from '../../components/layout/Layout';
import MypageNav from '../../components/mypage/myPageNav';
import Pagination from '../../components/mypage/pagination';

const authHttp = new AuthHttp();

const MyPosts = () => {
  const params = useParams();
  let { userId } = params;
  userId = parseInt(userId);
  const userId2 = useSelector(
    state => state.persistedReducer.userReducer.userId
  );

  const navigate = useNavigate();

  const [UserInfo, setUserInfo] = useState([]);
  const [Posts, setPosts] = useState([]);
  const [Page, setPage] = useState([]);
  const [SelectedButton, setSelectedButton] = useState(0);

  useEffect(() => {
    onMypage();
    getPostList();

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
                  {Posts.map(post => (
                    <ContentsBox
                      onClick={() => {
                        window.open(
                          `https://www.teamprojectvv.shop/category/${post.board_id}`,
                          '_self'
                        );
                      }}
                      key={post.board_id}
                    >
                      <ContentsText>
                        {post.title} ({post.commented})
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

export const Wrap = styled.div`
  width: 1440px;
  margin: 0 auto;
  height: 74.2vh;
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
  position: relative;
`;

export const RedIconWrap = styled.div`
  display: flex;
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
  opacity: ${props => (props.checked ? '0.4' : '')};
`;

export const ContentsArrow = styled.img`
  position: absolute;
  top: 50%;
  left: 97%;
  transform: translate(0, -50%);
  opacity: ${props => (props.checked ? '0.2' : '')};
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
