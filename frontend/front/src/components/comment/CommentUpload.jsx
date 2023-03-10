import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CommentHttp from '../../http/commentHttp';

const commentHttp = new CommentHttp();

const CommentUpload = props => {
  const [Text, setText] = useState('');
  const userId = useSelector(
    state => state.persistedReducer.userReducer.userId
  );

  const onSubmit = async e => {
    e.preventDefault();

    const body = {
      board_id: props.boardId,
      user_id: userId,
      text: Text,
    };

    if (!Text) {
      alert('댓글 내용을 입력해주세요');
    } else {
      try {
        const res = await commentHttp.postCommentUpload(body);
        console.log(res);
      } catch (err) {
        console.log(err);
        alert(err.response.data.message);
      }
    }
    return window.location.reload();
  };

  return (
    <RepleWrap>
      <Profile />
      <RepleTextarea
        placeholder='댓글을 입력해 주세요'
        value={Text}
        onChange={e => {
          setText(e.currentTarget.value);
        }}
      />
      <RepleButton onClick={e => onSubmit(e)}>댓글 쓰기</RepleButton>
    </RepleWrap>
  );
};

const RepleWrap = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: 7% 83% 10%;
  justify-content: space-between;
`;

const Profile = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 70px;
  background-color: #ced4da;
`;

const RepleTextarea = styled.textarea`
  padding: 15px;
  width: 100%;
  height: 80px;
  border-radius: 15px 20px;
  border: 1px solid #ffa590;
  box-sizing: border-box;
  font-size: 16px;

  :focus {
    outline: none;
    border: 2px solid #949494;
  }

  ::placeholder {
    font-size: 16px;
    font-weight: 300;
    letter-spacing: 2px;
    color: #aaaaaa;
  }
`;

const RepleButton = styled.div`
  width: 100px;
  height: 40px;
  background-color: #9e9e9e;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-left: auto;
  color: white;
  margin-top: 10px;
  font-weight: 600;
  cursor: pointer;
`;

export default CommentUpload;
