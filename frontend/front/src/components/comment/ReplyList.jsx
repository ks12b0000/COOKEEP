import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CommentHttp from '../../http/commentHttp';
import styled from '@emotion/styled';
import ReplyDelete from './ReplyDelete';
import Pagination from '../mypage/pagination';

const commentHttp = new CommentHttp();

const ReplyList = props => {
  const modalRef = useRef();
  const navigate = useNavigate();

  const username = useSelector(
    state => state.persistedReducer.userReducer.username
  );
  const userId = useSelector(
    state => state.persistedReducer.userReducer.userId
  );

  const [Replys, setReplys] = useState([]);
  const [EditComment, setEditComment] = useState('');
  const [Page, setPage] = useState([]);
  const [SelectedButton, setSelectedButton] = useState(0);

  useEffect(() => {
    getList();
  }, [SelectedButton]);

  const getList = async () => {
    try {
      const res = await commentHttp.getReplyList(
        props.commentId,
        SelectedButton
      );
      console.log(res);
      setReplys(res.data.result.list);
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

  // 대댓글 수정 기능
  const submitEdit = async (e, replyId, text) => {
    e.preventDefault();

    const body = {
      reply_id: replyId,
      user_id: userId,
      text: EditComment,
    };

    if (text === EditComment) {
      alert('댓글 내용을 변경해주세요');
    } else {
      try {
        await commentHttp.patchReplyEdit(body);
        window.location.reload();
      } catch (err) {
        console.log(err);
        alert(err.response.data.message);
      }
    }
  };

  //켜기 기능
  const onItem = (id, item) => {
    const copyList = [...Replys];
    copyList.find(reply => reply.reply_id === id)[item + '_selected'] = true;
    setReplys(copyList);
    console.log('Page', Page.length);
  };

  //닫기 기능
  const offItem = (id, item) => {
    const copyList = [...Replys];
    copyList.find(reply => reply.reply_id === id)[item + '_selected'] = false;
    setReplys(copyList);
  };

  //댓글 수정창 켜기 기능
  const onEdit = (id, text) => {
    const copyList = [...Replys];
    copyList.find(reply => reply.reply_id === id).edit_selected = true;
    setReplys(copyList);
    setEditComment(text);
  };

  //대댓글 삭제 기능
  const onDelete = async (e, replyId) => {
    e.preventDefault();

    if (window.confirm('정말 댓글을 삭제하겠습니까?')) {
      try {
        await commentHttp.deleteReply(replyId, userId);
        alert('댓글이 삭제되었습니다.');
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    } else {
      return;
    }
  };

  //오늘 날짜 구하기
  const currentDate = new Date();

  const year = currentDate.getFullYear(); // 년도
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 월 (0부터 시작하므로 +1 필요)
  const day = String(currentDate.getDate()).padStart(2, '0'); // 일

  const formattedDate = `${year}.${month}.${day}`;

  return (
    <Wrap>
      <ReplyArrow src='/image/reply-arrow.png' Length={Replys.length} />
      {Replys?.map(reply => (
        <CommentWrap key={reply.reply_id}>
          <Profile>
            <Img src={reply.user_image} />
          </Profile>
          <CommentBlock>
            <TextWrap>
              <TextBlock>
                <UserNameWrap>
                  <UsernameText>{reply.user_name}</UsernameText>
                  {props.userName === reply.user_name && (
                    <Author>작성자</Author>
                  )}
                </UserNameWrap>
                {formattedDate === reply.create_date ? (
                  <TimeStyled>{reply.create_time}</TimeStyled>
                ) : (
                  <TimeStyled>{reply.create_date}</TimeStyled>
                )}
              </TextBlock>
            </TextWrap>

            <ContentBlock>
              <ContentTextWrap>
                {username === reply.user_name ? (
                  <ContentText backColor>{reply.text}</ContentText>
                ) : (
                  <ContentText>{reply.text}</ContentText>
                )}
                <EditButton
                  src='/image/edit-icon.png'
                  alt='edit-button'
                  onClick={() => onItem(reply.reply_id, 'icon')}
                />
                {reply.icon_selected && (
                  <>
                    {userId === reply.user_id ? (
                      <>
                        <EditBox ref={modalRef}>
                          <CopyToClipboard
                            text={reply.text}
                            onCopy={() => alert('댓글이 복사되었습니다.')}
                          >
                            <div>복사하기</div>
                          </CopyToClipboard>
                          <div
                            onClick={() => {
                              navigate(`/written/${reply.user_id}`);
                            }}
                          >
                            작성글 보기
                          </div>
                          <div
                            onClick={() => onEdit(reply.reply_id, reply.text)}
                          >
                            수정하기
                          </div>
                          <div onClick={() => onItem(reply.reply_id, 'modal')}>
                            삭제하기
                          </div>
                        </EditBox>
                        <EditBoxBack
                          onClick={() => offItem(reply.reply_id, 'icon')}
                        />
                      </>
                    ) : (
                      <>
                        <EditBox ref={modalRef}>
                          <CopyToClipboard
                            text={reply.text}
                            onCopy={() => alert('댓글이 복사되었습니다.')}
                          >
                            <div>복사하기</div>
                          </CopyToClipboard>
                          <div
                            onClick={() => {
                              navigate(`/written/${reply.user_id}`);
                            }}
                          >
                            작성글 보기
                          </div>
                        </EditBox>
                        <EditBoxBack
                          onClick={() => offItem(reply.reply_id, 'icon')}
                        />
                      </>
                    )}
                  </>
                )}
              </ContentTextWrap>

              {reply.edit_selected && (
                <>
                  <EditBlock
                    value={EditComment}
                    type='text'
                    onChange={e => setEditComment(e.currentTarget.value)}
                  />
                  <Edit1Button
                    onClick={e => submitEdit(e, reply.reply_id, reply.text)}
                  >
                    확인
                  </Edit1Button>
                  <Edit2Button onClick={() => offItem(reply.reply_id, 'edit')}>
                    취소
                  </Edit2Button>
                </>
              )}
            </ContentBlock>
          </CommentBlock>
          {reply.modal_selected && (
            <ReplyDelete
              offItem={offItem}
              replyId={reply.reply_id}
              userId={userId}
            />
          )}
        </CommentWrap>
      ))}

      {/* 페이지 네이션 */}
      {Replys.length !== 0 && (
        <>
          <Pagination
            handlePagination={handlePagination}
            Page={Page}
            SelectedButton={SelectedButton}
          />
        </>
      )}

      {Replys.length !== 0 && <Line />}
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 1270px;
  height: auto;
  position: relative;
`;

const CommentWrap = styled.div`
  width: 1270px;
  height: auto;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 8% 92%;
  justify-content: space-between;
  margin: 10px 0 0 0;

  @media screen and (max-width: 1700px) {
    width: 1130px;
  }
`;

const ReplyArrow = styled.img`
  position: absolute;
  top: ${props => (props.Length ? '34px' : '14px')};
  left: -70px;
`;

const Profile = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 70px;
  background-color: #ced4da;
  position: relative;
  overflow: hidden;
`;

const Img = styled.img`
  height: 70px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CommentBlock = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 0;
  box-sizing: border-box;
  margin: 5px 0;
`;

const UserNameWrap = styled.div`
  display: flex;
`;

const UsernameText = styled.div`
  font-size: 17px;
  font-weight: 700;
  color: black;
  display: inline;
  margin-right: 6px;
`;

const Author = styled.div`
  color: #ff4122;
  border: 1px solid #ff4122;
  font-size: 12px;
  width: 45px;
  height: 20px;
  border-radius: 20px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TimeStyled = styled.div`
  font-size: 12px;
  color: #cbcbcb;
  font-weight: 400;
  margin: 6px 0 9px 0;
`;

const TextWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TextBlock = styled.div`
  display: block;
`;

const ContentBlock = styled.div`
  width: 100%;
  height: auto;
  position: relative;
`;

const ContentTextWrap = styled.div`
  display: grid;
  width: 1194px;
  grid-template-columns: 98% 1%;
  justify-content: space-between;
  position: relative;

  @media screen and (max-width: 1700px) {
    width: 1075px;
  }
`;

const ContentText = styled.div`
  font-size: 15px;
  display: block;
  border: 2px solid #f0f0f0;
  padding: 24px 16px;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: ${props => (props.backColor ? '#F8F9FA' : 'white')};
`;

const EditButton = styled.img`
  margin-left: 10px;
  margin-top: 3px;
  cursor: pointer;
  margin-left: auto;
  position: absolute;
  left: 100%;
`;

const EditBoxBack = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
`;

const EditBox = styled.div`
  height: auto;
  width: 100px;
  border: 1px solid #ff4122;
  border-radius: 5px;
  position: absolute;
  top: 0;
  left: 101.5%;
  display: grid;
  justify-content: center;
  align-items: center;
  padding: 5px 0;
  box-sizing: border-box;
  background-color: white;
  z-index: 100;

  div {
    font-size: 15px;
    font-weight: 400;
    text-align: center;
    height: 33px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 85px;
    border-radius: 5px;

    &:hover {
      background-color: #ff4122;
      color: white;
    }
  }
`;

const EditBlock = styled.input`
  position: absolute;
  top: 1px;
  left: 0;
  border-radius: 10px;
  border: 1px solid #ff4122;
  font-size: 15px;
  padding: 24px 16px;
  box-sizing: border-box;
  width: 1146px;
  font-family: 400;
  background-color: white;

  :focus {
    outline: none;
  }

  ::placeholder {
    font-size: 15px;
    font-weight: 400;
    letter-spacing: 2px;
    color: #aaaaaa;
  }

  @media screen and (max-width: 1700px) {
    width: 1054px;
  }
`;

const Edit1Button = styled.div`
  background-color: #ff4122;
  width: 20px;
  color: #ffffff;
  font-size: 11px;
  font-weight: 500;
  position: absolute;
  top: 56%;
  left: 87%;
  padding: 5px 14px;
  border-radius: 5px;
  transition: 0.2s;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    top: 52%;
  }

  @media screen and (max-width: 1700px) {
    left: 90%;
  }
`;

const Edit2Button = styled.div`
  background-color: #ff4122;
  width: 20px;
  color: #ffffff;
  font-size: 11px;
  font-weight: 500;
  position: absolute;
  top: 56%;
  left: 92%;
  padding: 5px 14px;
  border-radius: 5px;
  transition: 0.2s;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    top: 52%;
  }

  @media screen and (max-width: 1700px) {
    left: 95%;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 0.1px;
  background-color: #ffa590;
`;

export default ReplyList;
