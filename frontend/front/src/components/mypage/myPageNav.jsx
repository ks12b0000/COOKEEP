import styled from '@emotion/styled';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const MypageNav = props => {
  const isSocialLogin = useSelector(
    state => state.persistedReducer.userReducer.isSocialLogin
  );

  const navigate = useNavigate();
  const [userInfo, serUserInfo] = useState([]);

  return (
    <Wrap>
      <UserWrap>
        <UserImg>
          <Img src={props.userImage} />
        </UserImg>
        <UserInfo>
          <div>
            <span>닉네임</span>
            {props.userNickName}
          </div>
          {isSocialLogin === false && (
            <div>
              <span>아이디</span>
              {props.userName}
            </div>
          )}
          <div>
            <span>이메일</span>
            {props.userEmail}
          </div>
        </UserInfo>
      </UserWrap>
      <Box
        className={props.categoryName === 'alarms' ? 'active' : null}
        onClick={() => navigate(`/mypage/alarms/${props.userId}`)}
      >
        {props.categoryName === 'alarms' ? (
          <BoxIcon url='/image/mypage-alarm-w.png' />
        ) : (
          <BoxIcon url='/image/mypage-alarm.png' />
        )}
        <BoxText className={props.categoryName === 'alarms' ? 'active' : null}>
          댓글 알림
        </BoxText>
      </Box>
      <Box
        className={props.categoryName === 'posts' ? 'active' : null}
        onClick={() => navigate(`/mypage/posts/${props.userId}`)}
      >
        {props.categoryName === 'posts' ? (
          <BoxIcon url='/image/mypage-post-w.png' />
        ) : (
          <BoxIcon url='/image/mypage-post.png' />
        )}
        <BoxText className={props.categoryName === 'posts' ? 'active' : null}>
          내가 작성한 글
        </BoxText>
      </Box>
      <Box
        className={props.categoryName === 'likes' ? 'active' : null}
        onClick={() => navigate(`/mypage/likes/${props.userId}`)}
      >
        {props.categoryName === 'likes' ? (
          <BoxIcon url='/image/mypage-like-w.png' marginTop='3px' />
        ) : (
          <BoxIcon url='/image/mypage-like.png' marginTop='3px' />
        )}
        <BoxText className={props.categoryName === 'likes' ? 'active' : null}>
          내가 좋아요한 글
        </BoxText>
      </Box>
      <Box
        className={props.categoryName === 'comments' ? 'active' : null}
        onClick={() => navigate(`/mypage/comments/${props.userId}`)}
      >
        {props.categoryName === 'comments' ? (
          <BoxIcon url='/image/mypage-comment-w.png' marginTop='3px' />
        ) : (
          <BoxIcon url='/image/mypage-comment.png' marginTop='3px' />
        )}
        <BoxText
          className={props.categoryName === 'comments' ? 'active' : null}
        >
          내가 댓글 단 글
        </BoxText>
      </Box>
      <Box
        className={props.categoryName === 'account' ? 'active' : null}
        onClick={() => navigate(`/mypage/account/${props.userId}`)}
      >
        {props.categoryName === 'account' ? (
          <BoxIcon url='/image/mypage-account-w.png' />
        ) : (
          <BoxIcon url='/image/mypage-account.png' />
        )}
        <BoxText className={props.categoryName === 'account' ? 'active' : null}>
          설정
        </BoxText>
      </Box>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #ff6242;
  border-radius: 10px;
`;
const UserWrap = styled.div`
  display: flex;
  width: 87%;
  margin: 5vh auto 6vh auto;
  align-items: center;
`;

const UserImg = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50px;
  background-color: #d9d9d9;
  margin-right: 24px;
  overflow: hidden;
  position: relative;
`;

const Img = styled.img`
  height: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const UserInfo = styled.div`
  position: relative;
  top: 7px;
  div {
    color: #5a5c5f;
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 9px;
    letter-spacing: -0.5px;
  }

  span {
    color: #000000;
    font-weight: 700;
    margin-right: 8px;
  }
`;

const Box = styled.div`
  width: 87%;
  margin: 15px auto;
  border: 1px solid #ff6242;
  border-radius: 10px;
  height: 11.3%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &.active {
    background-color: #ff6242;
  }
`;

const BoxIcon = styled.div`
  width: 22px;
  height: 22px;
  background-repeat: no-repeat;
  margin-right: 6px;
  background-image: url(${props => props.url});
  &.active {
    font-weight: 700;
  }
  margin-top: ${props => props.marginTop};
`;

const BoxText = styled.div`
  color: #b0b0b0;
  font-size: 16px;
  font-weight: 500;
  &.active {
    color: white;
  }
`;

export default MypageNav;
