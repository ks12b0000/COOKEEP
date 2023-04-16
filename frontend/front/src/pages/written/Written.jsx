import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Header from '../../components/layout/header/Header';
import CommentHttp from '../../http/commentHttp';
import styled from '@emotion/styled';

const commentHttp = new CommentHttp();

const Written = () => {
  const params = useParams();
  const { userId } = params;
  const navigate = useNavigate();

  const [WrittenList, setWrittenList] = useState([]);
  const [Page, setPage] = useState([]);
  const [SelectedButton, setSelectedButton] = useState(0);

  useEffect(() => {
    onWrittenPage();
  }, [SelectedButton]);

  //게시글 목록 불러오기
  const onWrittenPage = async () => {
    try {
      const res = await commentHttp.getWrittenList(userId, SelectedButton);
      setWrittenList(res.data.result.boardList);
      const arrayLength = res.data.result.total;
      const newArray = new Array(arrayLength).fill(0).map((_, index) => index);
      setPage(newArray);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  //넘버 버튼으로 페이지 불러오기
  const pageList = async pageNum => {
    setSelectedButton(pageNum);
  };

  //left arrow 버튼으로 페이지 불러오기
  const leftList = async () => {
    if (SelectedButton > 0) {
      setSelectedButton(prev => prev - 1);
    }
  };

  //right arrow 버튼으로 페이지 불러오기
  const rightList = async () => {
    if (SelectedButton < Page.length - 1) {
      setSelectedButton(prev => prev + 1);
    }
  };

  //첫 페이지로 이동
  const firstList = async () => {
    if (SelectedButton > 0) {
      setSelectedButton(0);
    }
  };

  //마지막 페이지로 이동
  const lastList = async () => {
    if (SelectedButton < Page.length - 1) {
      setSelectedButton(Page.length - 1);
    }
  };

  return (
    <>
      <Header />
      <Wrap>
        <Title onClick={() => console.log(WrittenList)}>작성글 보기</Title>
        <UserBlock>
          <UserImg></UserImg>
          <UserText>
            <span>닉네임</span>집나간호랑이
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
                {list.title}<span>{`(${list.commented})`}</span>
              </WrittenBlock>
            ))}
          </>
        )}

        {/* 페이지 네이션 */}
        {WrittenList.length!==0
        &&
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
        }
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
`;

const UserImg = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50px;
  background-color: #d9d9d9;
  margin-right: 24px;
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
  display: flex;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
  margin: 10px 0;
  cursor: pointer;

  span{
    margin-left: 5px;
  }
`;

// 페이지네이션

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  border: 1px solid #cbcbcb;
  position: relative;
  top: 0;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  background: white;
  color: #cbcbcb;
  font-size: 1rem;
  transition: 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
    transform: translateY(-3px);
  }

  &[disabled] {
    background: white;
    border: 1px solid #cbcbcb;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: #ff4122;
    border: 1px solid #ff4122;
    color: white;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

const Arrow = styled.div`
  width: 8px;
  height: 14px;
  background: url(${props => props.url});
  background-size: 8px;
`;

const DoubleArrow = styled.div`
  width: 14px;
  height: 12px;
  background: url(${props => props.url});
  background-size: 14px;
`;

export default Written;
