import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import CommentHttp from '../../http/commentHttp';
import styled from '@emotion/styled';
import ReplyList from './ReplyList';
import ReplyUpload from './ReplyUpload';
import CommentUpload from './CommentUpload';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CommentDelete from './CommentDelete';
import Pagination from '../mypage/pagination';
import { useMediaQuery } from 'react-responsive';

const commentHttp = new CommentHttp();

const CommentList = props => {
  const modalRef = useRef();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({
    query: '(max-width:768px)',
  });

  const username = useSelector(
    state => state.persistedReducer.userReducer.username
  );
  const userId = useSelector(
    state => state.persistedReducer.userReducer.userId
  );

  //댓글 리스트 state
  const [Comments, setComments] = useState([]);

  //댓글 수정창 컨트롤
  const [EditComment, setEditComment] = useState('');

  //페이지 네이션
  const [Page, setPage] = useState([]);
  const [SelectedButton, setSelectedButton] = useState(0);
  const [Count, setCount] = useState(0);
  const [Total, setTotal] = useState(0);

  useEffect(() => {
    getList();
  }, [SelectedButton]);

  //페이지네이션으로 댓글리스트 얻기
  const getList = async () => {
    try {
      const res = await commentHttp.getCommentList(
        props.boardId,
        SelectedButton
      );
      setComments(res.data.result.list);
      setCount(res.data.result.cnt);
      setTotal(res.data.result.total);
      const arrayLength = res.data.result.total;
      const newArray = new Array(arrayLength).fill(0).map((_, index) => index);
      setPage(newArray);
      console.log('댓글 리스트', res);
    } catch (err) {
      console.log(err);
    }
  };

  // 페이지 네이션 함수
  const handlePagination = buttonValue => {
    setSelectedButton(buttonValue);
  };

  // 댓글 수정 기능
  const submitEdit = async (e, commentId, text) => {
    e.preventDefault();

    const body = {
      boardComment_id: commentId,
      user_id: userId,
      text: EditComment,
    };

    if (text === EditComment) {
      alert('댓글 내용을 변경해주세요');
    } else {
      try {
        await commentHttp.patchCommentEdit(body);
        window.location.reload();
      } catch (err) {
        console.log(err);
        alert(err.response.data.message);
      }
    }
  };

  //켜기 기능
  const onItem = (id, item) => {
    const copyList = [...Comments];
    copyList.find(comment => comment.comment_id === id)[
      item + '_selected'
    ] = true;
    setComments(copyList);
    console.log('Page', Page.length);
  };

  //닫기 기능
  const offItem = (id, item) => {
    const copyList = [...Comments];
    copyList.find(comment => comment.comment_id === id)[
      item + '_selected'
    ] = false;
    setComments(copyList);
  };

  //대댓글 창 켜기 기능
  const onReply = id => {
    const copyList = [...Comments];
    copyList.find(comment => comment.comment_id === id).reply_selected = true;
    copyList.find(comment => comment.comment_id === id).icon_selected = false;
    setComments(copyList);
  };

  //대댓글 창 켜기 기능
  const offReply = id => {
    const copyList = [...Comments];
    copyList.find(comment => comment.comment_id === id).reply_selected = false;
    copyList.find(comment => comment.comment_id === id).icon_selected = false;
    setComments(copyList);
  };

  //댓글 수정창 켜기 기능
  const onEdit = (id, text) => {
    const copyList = [...Comments];
    copyList.find(comment => comment.comment_id === id).edit_selected = true;
    copyList.find(comment => comment.comment_id === id).icon_selected = false;
    setComments(copyList);
    setEditComment(text);
  };

  //오늘 날짜 구하기
  const currentDate = new Date();

  const year = currentDate.getFullYear(); // 년도
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 월 (0부터 시작하므로 +1 필요)
  const day = String(currentDate.getDate()).padStart(2, '0'); // 일

  const formattedDate = `${year}.${month}.${day}`;

  return (
    <>
      <CommentTitle>{`댓글 (${Count})`}</CommentTitle>
      {Comments?.map(comment => (
        <CommentWrap
          key={comment.comment_id}
          backColor={username === comment.user_name}
        >
          <Profile>
            <Img src={comment.user_image} />
          </Profile>
          <CommentBlock>
            {/* 상단 작성자 이름 */}
            <UserNameWrap>
              <UsernameText
                onClick={() => navigate(`/written/${comment.user_id}`)}
              >
                {comment.user_name}
              </UsernameText>
              {props.userName === comment.user_name && <Author>작성자</Author>}
            </UserNameWrap>
            {formattedDate === comment.create_date ? (
              <TimeStyled>{comment.create_time}</TimeStyled>
            ) : (
              <TimeStyled>{comment.create_date}</TimeStyled>
            )}
            <ContentBlock>
              <ContentTextWrap>
                {username === comment.user_name ? (
                  <ContentText backColor>{comment.text}</ContentText>
                ) : (
                  <ContentText>{comment.text}</ContentText>
                )}
                <EditButton
                  src='/image/edit-icon.png'
                  alt='edit-button'
                  onClick={() => onItem(comment.comment_id, 'icon')}
                />

                {comment.icon_selected && (
                  <>
                    {userId === comment.user_id ? (
                      <>
                        <EditBox ref={modalRef}>
                          {comment.reply_selected ? (
                            <div
                              onClick={() => {
                                offReply(comment.comment_id);
                              }}
                            >
                              답글 닫기
                            </div>
                          ) : (
                            <div
                              onClick={() => {
                                onReply(comment.comment_id);
                              }}
                            >
                              답글 달기
                            </div>
                          )}

                          <CopyToClipboard
                            text={comment.text}
                            onCopy={() => alert('댓글이 복사되었습니다.')}
                          >
                            <div>복사하기</div>
                          </CopyToClipboard>
                          <div
                            onClick={() => {
                              navigate(`/written/${comment.user_id}`);
                            }}
                          >
                            작성글 보기
                          </div>
                          <div
                            onClick={() =>
                              onEdit(comment.comment_id, comment.text)
                            }
                          >
                            수정하기
                          </div>
                          {/* <div onClick={e => onDelete(e, comment.comment_id)}> */}
                          <div
                            onClick={() => onItem(comment.comment_id, 'modal')}
                          >
                            삭제하기
                          </div>
                        </EditBox>
                        <EditBoxBack
                          onClick={() => offItem(comment.comment_id, 'icon')}
                        />
                      </>
                    ) : (
                      <>
                        <EditBox ref={modalRef}>
                          {comment.reply_selected ? (
                            <div
                              onClick={() => {
                                offReply(comment.comment_id);
                              }}
                            >
                              답글 닫기
                            </div>
                          ) : (
                            <div
                              onClick={() => {
                                onReply(comment.comment_id);
                              }}
                            >
                              답글 달기
                            </div>
                          )}
                          <CopyToClipboard
                            text={comment.text}
                            onCopy={() => alert('댓글이 복사되었습니다.')}
                          >
                            <div>복사하기</div>
                          </CopyToClipboard>
                          <div
                            onClick={() => {
                              navigate(`/written/${comment.user_id}`);
                            }}
                          >
                            작성글 보기
                          </div>
                        </EditBox>
                        <EditBoxBack
                          onClick={() => offItem(comment.comment_id, 'icon')}
                        />
                      </>
                    )}
                  </>
                )}
              </ContentTextWrap>

              {comment.edit_selected && (
                <>
                  <EditBlock
                    value={EditComment}
                    type='text'
                    onChange={e => setEditComment(e.currentTarget.value)}
                  />
                  <Edit1Button
                    onClick={e =>
                      submitEdit(e, comment.comment_id, comment.text)
                    }
                  >
                    확인
                  </Edit1Button>
                  <Edit2Button
                    onClick={() => offItem(comment.comment_id, 'edit')}
                  >
                    취소
                  </Edit2Button>
                </>
              )}
            </ContentBlock>

            {/* {comment.reply_selected ? (
              <ReplyText onClick={() => offItem(comment.comment_id, 'reply')}>
                {`대댓글 닫기 (${comment.replyCount})`}
              </ReplyText>
            ) : (
              <ReplyText onClick={() => onItem(comment.comment_id, 'reply')}>
                {`대댓글 보기 (${comment.replyCount})`}
              </ReplyText>
            )} */}

            {comment.reply_selected && (
              <ReplyUpload commentId={comment.comment_id} />
            )}
            <ReplyWrap>
              <ReplyList
                commentId={comment.comment_id}
                userName={props.userName}
              />
            </ReplyWrap>
          </CommentBlock>
          {comment.modal_selected && (
            <CommentDelete
              offItem={offItem}
              commentId={comment.comment_id}
              userId={userId}
            />
          )}
        </CommentWrap>
      ))}
      {isMobile ? (
        ''
      ) : (
        <>
          {Comments.length !== 0 && (
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

      {/* 댓글 작성 컴포넌트 */}
      {isMobile ? '' : <Line />}

      {isMobile ? (
        <>
          {Total > 1 && (
            <SeeMoreButton
              onClick={() => navigate(`/category/comment/${props.boardId}`)}
            >
              전체 댓글 보기
            </SeeMoreButton>
          )}
        </>
      ) : (
        <></>
      )}
      <CommentUploadWrap>
        <CommentUpload boardId={props.boardId} />
      </CommentUploadWrap>
    </>
  );
};

export const CommentTitle = styled.div`
  color: #ff4122;
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 34.5px;

  @media screen and (max-width: 1020px) {
    margin: 0 auto 34.5px auto;
    width: 740px;
  }

  @media screen and (max-width: 760px) {
    margin: 0 auto 10px auto;
    width: 350px;
    font-size: 18px;
  }
`;

export const CommentWrap = styled.div`
  width: 1440px;
  height: auto;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 6% 93%;
  justify-content: space-between;
  margin: 20px 0;

  @media screen and (max-width: 1700px) {
    width: 1300px;
  }

  @media screen and (max-width: 1020px) {
    margin: 20px auto 40px auto;
    width: 740px;
    grid-template-columns: 8% 88%;
  }

  @media screen and (max-width: 760px) {
    width: 350px;
    grid-template-columns: 5% 88%;
    margin: 0 auto;
    padding: 25px 0 0 0;
    box-sizing: border-box;
    background-color: ${props => (props.backColor ? '#F0F0F0' : '')};
    border-bottom: 1px solid #dddddd;
  }
`;

export const Profile = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 70px;
  background-color: #ced4da;
  position: relative;
  overflow: hidden;
  top: 25px;

  @media screen and (max-width: 1020px) {
    top: 20px;
  }

  @media screen and (max-width: 760px) {
    width: 30px;
    height: 30px;
    top: -7px;
    left: 5px;
  }
`;

export const Img = styled.img`
  height: 70px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media screen and (max-width: 760px) {
    height: 30px;
  }
`;

export const CommentBlock = styled.div`
  width: 100%;
  height: auto;
  box-sizing: border-box;
`;

export const UserNameWrap = styled.div`
  display: flex;
`;

export const UsernameText = styled.div`
  font-size: 17px;
  font-weight: 700;
  color: black;
  display: inline;
  margin-right: 6px;
  cursor: pointer;

  @media screen and (max-width: 760px) {
    font-size: 14px;
  }
`;

export const Author = styled.div`
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

  @media screen and (max-width: 760px) {
    position: relative;
    top: -3px;
  }
`;

export const TimeStyled = styled.div`
  font-size: 12px;
  color: #cbcbcb;
  font-weight: 400;
  margin: 6px 0 9px 0;

  @media screen and (max-width: 760px) {
    margin: 2px 0 9px 0;
  }
`;

export const ContentBlock = styled.div`
  height: auto;
  position: relative;
  display: block;
  width: 100%;
  padding-bottom: 10px;
`;

export const ContentTextWrap = styled.div`
  display: grid;
  grid-template-columns: 98% 1%;
  justify-content: space-between;
  position: relative;
`;

export const ContentText = styled.div`
  font-size: 15px;
  display: block;
  border: 2px solid #f0f0f0;
  padding: 24px 16px;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: ${props => (props.backColor ? '#F8F9FA' : 'white')};

  @media screen and (max-width: 760px) {
    border: none;
    padding: 0;
    margin-bottom: 15px;
    background-color: rgba(0, 0, 0, 0);
  }
`;

export const EditButton = styled.img`
  margin-left: 10px;
  margin-top: 3px;
  cursor: pointer;

  @media screen and (max-width: 760px) {
    height: 15px;
    position: relative;
    top: -45px;
    left: -10px;
  }
`;

export const EditBoxBack = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  left: 0;
  top: 0;
  z-index: 100;

  @media screen and (max-width: 1020px) {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

export const EditBox = styled.div`
  height: auto;
  width: 100px;
  border: 1px solid #ff4122;
  border-radius: 5px;
  position: absolute;
  top: 0;
  left: 101%;
  display: grid;
  justify-content: center;
  align-items: center;
  padding: 5px 0;
  box-sizing: border-box;
  background-color: white;
  z-index: 130;

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

  @media screen and (max-width: 1020px) {
    width: 100vw;
    left: 0;
    top: 100%;
    transform: translate(0, -100%);
    position: fixed;
    padding: 20px 0;
    border: none;
    border-radius: 0;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;

    div {
      font-size: 18px;
      color: #ff4122;
      font-weight: 600;
      text-align: center;
      height: 55px;

      &:hover {
        background-color: white;
        color: #ff4122;
      }
    }
  }

  @media screen and (max-width: 760px) {
    div {
      font-size: 16px;
      height: 45px;
    }
  }
`;

export const ReplyText = styled.div`
  font-size: 11px;
  margin-left: 4px;
  color: #878787;
  display: block;
  cursor: pointer;
`;

export const EditBlock = styled.input`
  position: absolute;
  top: 1px;
  left: 0;
  border-radius: 10px;
  border: 1px solid #ff4122;
  font-size: 15px;
  padding: 24px 16px;
  box-sizing: border-box;
  font-family: 400;
  background-color: white;
  width: 1313px;

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
    width: 1184px;
  }

  @media screen and (max-width: 1020px) {
    width: 640px;
  }
`;

export const Edit1Button = styled.div`
  background-color: #ff4122;
  width: 20px;
  color: #ffffff;
  font-size: 11px;
  font-weight: 500;
  position: absolute;
  top: 49%;
  left: 88%;
  padding: 5px 14px;
  border-radius: 5px;
  transition: 0.2s;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    top: 45%;
  }

  @media screen and (max-width: 1020px) {
    left: 78%;
  }
`;

export const Edit2Button = styled.div`
  background-color: #ff4122;
  width: 20px;
  color: #ffffff;
  font-size: 11px;
  font-weight: 500;
  position: absolute;
  top: 49%;
  left: 92.3%;
  padding: 5px 14px;
  border-radius: 5px;
  transition: 0.2s;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    top: 45%;
  }

  @media screen and (max-width: 1020px) {
    left: 87%;
  }
`;

export const ReplyWrap = styled.div`
  width: 100%;
  padding-left: 40px;
  box-sizing: border-box;

  @media screen and (max-width: 1020px) {
    width: 680px;
    position: relative;
    padding-left: 0;
    left: -40px;
  }

  @media screen and (max-width: 760px) {
    width: 300px;
    position: relative;
    padding-left: 0;
    left: -40px;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 0.1px;
  background-color: #ffa590;
  margin: 40px 0;

  @media screen and (max-width: 1020px) {
    width: 100%;
  }

  @media screen and (max-width: 760px) {
    width: 90%;
  }
`;

const SeeMoreButton = styled.div`
  @media screen and (max-width: 760px) {
    width: 350px;
    height: 43px;
    border-radius: 5px;
    border: 1px solid #ff4122;
    color: #ff4122;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    margin: 30px auto 0 auto;
  }
`;

const CommentUploadWrap = styled.div`
  @media screen and (max-width: 760px) {
    margin: 30px 0;
  }
`;

export default CommentList;
