import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Header from '../../components/layout/header/Header';
import CommentHttp from '../../http/commentHttp';
import styled from '@emotion/styled';

const commentHttp = new CommentHttp();

const Written = () => {
  const params = useParams();
  const { userId } = params;

  const [WrittenList, setWrittenList] = useState([]);

  useEffect(() => {
    onWrittenPage();
  }, []);

  const onWrittenPage = async () => {
    try {
      const res = await commentHttp.getWrittenList(userId, 0);
      setWrittenList(res.data.result.boardList);
      console.log(res);
    } catch (err) {
      console.log(err);
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
        {WrittenList.map(list => (
          <WrittenBlock>{list.title}</WrittenBlock>
        ))}
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 1440px;
  height: 780px;
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
`;

export default Written;
