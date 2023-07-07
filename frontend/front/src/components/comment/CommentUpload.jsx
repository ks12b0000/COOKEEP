import styled from '@emotion/styled';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import CommentHttp from '../../http/commentHttp';
import Alert from '../atomic/modal/Alert';
import { useMediaQuery } from 'react-responsive';

const commentHttp = new CommentHttp();

const CommentUpload = props => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({
    query: '(max-width:768px)',
  });

  const [Text, setText] = useState('');
  const [IsModal, setIsModal] = useState(false);

  const userId = useSelector(
    state => state.persistedReducer.userReducer.userId
  );

  const isLoggedIn = useSelector(
    state => state.persistedReducer.userReducer.isLoggedIn
  );

  const userImage = useSelector(
    state => state.persistedReducer.userReducer.userImg
  );

  console.log(userImage);

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

  const OffModal = () => {
    setIsModal(false);
  };

  const MoveModal = () => {
    navigate('/login');
  };

  const Props = {
    body: {
      text: '로그인 후 이용 가능합니다.',
      icon: (
        <img src={`${process.env.PUBLIC_URL}/image/modal-icon.png`} alt='' />
      ),
    },

    buttons: {
      btn: [
        {
          text: '취소',
          onClick: OffModal,
        },
        {
          text: '로그인',
          onClick: MoveModal,
        },
      ],
    },
  };

  return (
    <>
      <RepleWrap>
        {isLoggedIn ? (
          <Profile>
            <Img src={userImage} alt='profile' />
          </Profile>
        ) : (
          <Profile></Profile>
        )}

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
        {isMobile ? (
          <RepleButton onClick={e => onSubmit(e)} text={Text}>
            입력
          </RepleButton>
        ) : (
          <RepleButton onClick={e => onSubmit(e)} text={Text}>
            댓글 쓰기
          </RepleButton>
        )}
      </RepleWrap>
      {IsModal && <Alert {...Props} />}
    </>
  );
};

const RepleWrap = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  margin-bottom: 40px;
  grid-template-columns: 7% 83% 8%;
  justify-content: space-between;

  @media screen and (max-width: 1020px) {
    margin: 0 auto 40px auto;
    width: 750px;
    grid-template-columns: 8% 70% 13%;
  }

  @media screen and (max-width: 760px) {
    width: 350px;
    grid-template-columns: 84% 13%;
  }
`;

const Profile = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 70px;
  background-color: #ced4da;
  position: relative;
  overflow: hidden;

  @media screen and (max-width: 760px) {
    display: none;
  }
`;

const Img = styled.img`
  height: 70px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const RepleTextarea = styled.textarea`
  padding: 15px;
  width: 100%;
  height: 70px;
  border-radius: 10px;
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

  @media screen and (max-width: 760px) {
    height: 43px;
    padding: 11px 12px;
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
  transition: 0.2s;

  @media screen and (max-width: 760px) {
    margin: 0;
    width: 48px;
    height: 43px;
  }
`;

export default CommentUpload;
