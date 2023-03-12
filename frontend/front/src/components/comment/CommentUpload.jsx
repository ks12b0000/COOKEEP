import styled from '@emotion/styled';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import CommentHttp from '../../http/commentHttp';

const commentHttp = new CommentHttp();

const CommentUpload = props => {
  const modalRef = useRef();
  const navigate = useNavigate();

  const [Text, setText] = useState('');
  const [IsModal, setIsModal] = useState(false);

  const userId = useSelector(
    state => state.persistedReducer.userReducer.userId
  );

  const isLoggedIn = useSelector(
    state => state.persistedReducer.userReducer.isLoggedIn
  );

  //유저가 로그인 하지 않은 채로 댓글창을 클릭 시 경고 모달창을 띄움
  const onModal = e => {
    e.preventDefault();

    if (isLoggedIn === false) {
      setIsModal(true);
    }
  };

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
    <>
      <RepleWrap>
        <Profile />
        <RepleTextarea
          placeholder='댓글을 입력해 주세요'
          value={Text}
          onChange={e => {
            setText(e.currentTarget.value);
          }}
          onClick={e => {
            onModal(e);
          }}
        />
        <RepleButton onClick={e => onSubmit(e)} text={Text}>
          댓글 쓰기
        </RepleButton>
      </RepleWrap>
      {IsModal && (
        <>
          <ModalBack />
          <ModalWrap ref={modalRef}>
            <ModalIcon src='/image/modal-icon.png' />
            <ModalText>로그인 후 이용 가능합니다.</ModalText>
            <Line1 />
            <ButtonWrap>
              <Button onClick={() => setIsModal(false)}>취소</Button>
              <Line2 />
              <Button onClick={() => navigate('/login')}>로그인</Button>
            </ButtonWrap>
          </ModalWrap>
        </>
      )}
    </>
  );
};

const RepleWrap = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  margin-bottom: 40px;
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
  background-color: ${props => (props.text ? '#FF4122' : '#f0f0f0')};
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

const ModalBack = styled.div`
  height: 100%;
  width: 100vw;
  background-color: black;
  opacity: 0.4;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  touch-action: none;
`;

const ModalWrap = styled.div`
  width: 500px;
  height: 256px;
  background-color: white;
  border-radius: 10px;
  position: fixed;
  top: 46%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalIcon = styled.img`
  margin-top: 70px;
`;

const ModalText = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: black;
  margin-top: 19px;
`;

const Line1 = styled.div`
  width: 100%;
  height: 0.1px;
  background-color: #616060;
  margin-top: 66px;
  margin-top: auto;
`;

const ButtonWrap = styled.div`
  width: 100%;
  height: 56px;
  display: grid;
  grid-template-columns: 49% 1% 49%;
`;

const Button = styled.div`
  display: flex;
  font-size: 16px;
  color: #5a5c5f;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    color: #ff4122;
  }
`;

const Line2 = styled.div`
  height: 56px;
  width: 0.1px;
  background-color: #616060;
`;

export default CommentUpload;
