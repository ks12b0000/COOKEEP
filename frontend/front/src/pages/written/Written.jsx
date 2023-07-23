import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useInView } from 'react-intersection-observer';
import { useMediaQuery } from 'react-responsive';
import Header from '../../components/layout/header/Header';
import CommentHttp from '../../http/commentHttp';
import styled from '@emotion/styled';
import Pagination from '../../components/mypage/pagination';

const commentHttp = new CommentHttp();

const Written = () => {
  const params = useParams();
  const { userId } = params;
  const navigate = useNavigate();
  const isMobile = useMediaQuery({
    query: '(max-width:768px)',
  });
  const { ref, inView } = useInView();

  const [WrittenList, setWrittenList] = useState([]);
  const [Username, setUsername] = useState('');
  const [UserPicture, setUserPicture] = useState('');
  //모바일 인피니트 스크롤
  const [MoreData, setMoreData] = useState(0);

  //페이지 네이션
  const [Page, setPage] = useState([]);
  const [SelectedButton, setSelectedButton] = useState(0);

  useEffect(() => {
    getWrittenList();
  }, [SelectedButton]);

  //게시글 목록 불러오기
  const getWrittenList = async () => {
    try {
      const res = await commentHttp.getWrittenList(userId, SelectedButton);
      setWrittenList(res.data.result.boardList);
      const arrayLength = res.data.result.total;
      const newArray = new Array(arrayLength).fill(0).map((_, index) => index);
      setPage(newArray);
      setUsername(res.data.result.username);
      setUserPicture(res.data.result.userPicture);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  //인피니트 스크롤
  useEffect(() => {
    if (inView) {
      getMobileWrittenList();
    }
    console.log('check');
  }, [inView]);

  // 인피니트 스크롤로 리스트 얻기
  const getMobileWrittenList = async () => {
    try {
      const res = await commentHttp.getWrittenList(userId, MoreData);
      const newWrittenList = [...WrittenList, ...res.data.result.boardList];
      setWrittenList(newWrittenList);
      if (MoreData < res.data.result.total) {
        setMoreData(prev => prev + 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 페이지 네이션 함수
  const handlePagination = buttonValue => {
    setSelectedButton(buttonValue);
  };

  return (
    <>
      <Header />
      <Wrap>
        <Title onClick={() => console.log(WrittenList)}>작성글 보기</Title>
        <UserBlock>
          <Profile>
            <Img src={UserPicture} />
          </Profile>
          <UserText>
            <span>닉네임</span>
            {Username}
          </UserText>
        </UserBlock>
        {WrittenList.length === 0 ? (
          <EmptyText>작성한 게시글이 없습니다.</EmptyText>
        ) : (
          <>
            {WrittenList.map(list => (
              <WrittenBlock
                key={list.board_id}
                onClick={() => navigate(`/category/${list.board_id}`)}
              >
                <div>
                  {list.title}
                  <span>{`(${list.commented})`}</span>
                </div>
                <Arrow src='/image/mypage-alarms-arrow.png' />
              </WrittenBlock>
            ))}
          </>
        )}
        <div ref={ref}></div>
        {!isMobile && (
          <>
            {WrittenList.length !== 0 && (
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
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 1440px;
  height: auto;
  margin: 30px auto 0 auto;
  border: 1px #ff4122 solid;
  border-radius: 10px;
  padding: 30px;
  box-sizing: border-box;

  @media screen and (max-width: 1700px) {
    width: 1300px;
  }

  @media screen and (max-width: 1020px) {
    width: 740px;
  }

  @media screen and (max-width: 760px) {
    width: 350px;
    padding: 0;
    grid-template-columns: 88% 5%;
    margin: 0 auto;
    margin-top: 80px;
    border: none;
  }
`;

const Title = styled.div`
  color: #ed3419;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const UserBlock = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  @media screen and (max-width: 1020px) {
    margin-bottom: 40px;
  }

  @media screen and (max-width: 760px) {
    margin-bottom: 20px;
  }
`;

const Profile = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 60px;
  background-color: #ced4da;
  position: relative;
  overflow: hidden;
  margin-right: 20px;
`;

const Img = styled.img`
  height: 60px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const UserText = styled.div`
  font-size: 15px;
  font-weight: 400;

  span {
    font-size: 15px;
    font-weight: 700;
    margin-right: 8px;
  }
`;

const EmptyText = styled.div`
  height: 200px;
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top: -40px;
  margin-bottom: 20px;
`;

const WrittenBlock = styled.div`
  width: 100%;
  height: 72px;
  border: 1px solid #ced4da;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 97% 2%;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
  margin: 10px 0;
  cursor: pointer;

  span {
    margin-left: 5px;
  }

  @media screen and (max-width: 760px) {
    width: 350px;
    padding: 20px 0;
    margin: 0 auto;
    box-sizing: border-box;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #dddddd;
    grid-template-columns: 97% 3%;
  }
`;

const Arrow = styled.img``;

export default Written;
