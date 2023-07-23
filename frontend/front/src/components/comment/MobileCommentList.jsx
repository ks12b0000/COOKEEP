import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { useInView } from 'react-intersection-observer';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CommentHttp from '../../http/commentHttp';
import styled from '@emotion/styled';
import ReplyList from './ReplyList';
import ReplyUpload from './ReplyUpload';
import CommentUpload from './CommentUpload';
import CommentDelete from './CommentDelete';
import Header from '../layout/header/Header';
import {
  CommentTitle,
  CommentWrap,
  Profile,
  Img,
  CommentBlock,
  UserNameWrap,
  UsernameText,
  Author,
  TimeStyled,
  ContentBlock,
  ContentTextWrap,
  ContentText,
  EditButton,
  ReplyWrap,
  EditBox,
  EditBoxBack,
  EditBlock,
  Edit1Button,
  Edit2Button,
} from './CommentList';

const commentHttp = new CommentHttp();

const MobileCommentList = props => {
  const modalRef = useRef();
  const navigate = useNavigate();
  const { id } = useParams();
  const { ref, inView } = useInView();

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

  const [Count, setCount] = useState(0);

  //모바일 인피니트 스크롤
  const [MoreData, setMoreData] = useState(0);

  // 인피니트 스크롤
  useEffect(() => {
    getList();
  }, [inView]);

  // 인피니트 스크롤로 리스트 얻기
  const getList = async () => {
    try {
      const res = await commentHttp.getCommentList(id, MoreData);
      const newReplys = [...Comments, ...res.data.result.list];
      setCount(res.data.result.cnt);
      setComments(newReplys);
      if (MoreData < res.data.result.total) {
        setMoreData(prev => prev + 1);
      }
    } catch (err) {
      console.log(err);
    }
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
      <Header />
      <Wrap>
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
                {props.userName === comment.user_name && (
                  <Author>작성자</Author>
                )}
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
                              onClick={() =>
                                onItem(comment.comment_id, 'modal')
                              }
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
        {Comments.length !== 0 && <div ref={ref}></div>}
        <CommentUploadWrap>
          <CommentUpload boardId={props.boardId} />
        </CommentUploadWrap>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  margin: 80px 0 60px 0;
`;

const CommentUploadWrap = styled.div`
  position: fixed;
  width: 100vw;
  height: 62px;
  background-color: #ff8164;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default MobileCommentList;
