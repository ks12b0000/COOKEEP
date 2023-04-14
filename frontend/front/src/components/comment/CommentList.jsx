import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import CommentHttp from '../../http/commentHttp';
import styled from '@emotion/styled';
import ReplyList from './ReplyList';
import ReplyUpload from './ReplyUpload';
import CommentUpload from './CommentUpload';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const commentHttp = new CommentHttp();

const CommentList = props => {
  const modalRef = useRef();
  const navigate = useNavigate();

  const username = useSelector(
    state => state.persistedReducer.userReducer.username
  );
  const userId = useSelector(
    state => state.persistedReducer.userReducer.userId
  );

  const [Comments, setComments] = useState([]);
  const [EditComment, setEditComment] = useState('');
  const [Page, setPage] = useState([]);
  const [SelectedButton, setSelectedButton] = useState(0);
  const [Count, setCount] = useState(0);

  useEffect(() => {
    getList();
  }, [SelectedButton]);

  const getList = async () => {
    try {
      const res = await commentHttp.getCommentList(
        props.boardId,
        SelectedButton
      );
      console.log('댓글', res );
      setComments(res.data.result.list);
      setCount(res.data.result.cnt);
      const arrayLength = res.data.result.total;
      const newArray = new Array(arrayLength).fill(0).map((_, index) => index);
      setPage(newArray);
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

  //아이콘창 켜기 기능
  const onIcon = (e, id) => {
    e.stopPropagation();
    const copyList = [...Comments];
    copyList.find(comment => comment.comment_id === id).icon_selected = true;
    setComments(copyList);
    console.log('Page', Page.length);
  };

  //아이콘창 닫기 기능
  const offIcon = id => {
    const copyList = [...Comments];
    copyList.find(comment => comment.comment_id === id).icon_selected = false;
    setComments(copyList);
  };

  //답글창 켜기 기능
  const onReply = id => {
    const copyList = [...Comments];
    copyList.find(comment => comment.comment_id === id).reply_selected = true;
    setComments(copyList);
  };

  //답글창 닫기 기능
  const offReply = id => {
    const copyList = [...Comments];
    copyList.find(comment => comment.comment_id === id).reply_selected = false;
    setComments(copyList);
  };

  //댓글 수정창 켜기 기능
  const onEdit = (id, text) => {
    const copyList = [...Comments];
    copyList.find(comment => comment.comment_id === id).edit_selected = true;
    setComments(copyList);
    setEditComment(text);
  };

  //댓글 수정창 닫기 기능
  const offEdit = id => {
    const copyList = [...Comments];
    copyList.find(comment => comment.comment_id === id).edit_selected = false;
    setComments(copyList);
  };

  //댓글 삭제 기능
  const onDelete = async (e, commentId) => {
    e.preventDefault();

    if (window.confirm('정말 댓글을 삭제하겠습니까?')) {
      try {
        await commentHttp.deleteComment(commentId, userId);
        alert('댓글이 삭제되었습니다.');
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    } else {
      return;
    }
  };

  return (
    <>
      <CommentTitle>{`댓글 (${Count})`}</CommentTitle>
      {Comments?.map(comment => (
        <CommentWrap key={comment.comment_id}>
          <Profile />
          <CommentBlock>
            {/* 상단 작성자 이름 */}
            <UserNameWrap>
              <UsernameText>{comment.user_name}</UsernameText>
              {props.userName === comment.user_name && <Author>작성자</Author>}
            </UserNameWrap>
            <Time>{comment.create_date}</Time>

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
                  onClick={e => onIcon(e, comment.comment_id)}
                />

                {comment.icon_selected && (
                  <>
                    {userId === comment.user_id ? (
                      <>
                        <EditBox ref={modalRef}>
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
                          <div onClick={e => onDelete(e, comment.comment_id)}>
                            삭제하기
                          </div>
                        </EditBox>
                        <EditBoxBack
                          onClick={() => offIcon(comment.comment_id)}
                        />
                      </>
                    ) : (
                      <>
                        <EditBox ref={modalRef}>
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
                          onClick={() => offIcon(comment.comment_id)}
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
                  <Edit2Button
                    left='86.5%'
                    onClick={e =>
                      submitEdit(e, comment.comment_id, comment.text)
                    }
                  >
                    확인
                  </Edit2Button>
                  <Edit2Button
                    left='91%'
                    onClick={() => offEdit(comment.comment_id)}
                  >
                    취소
                  </Edit2Button>
                </>
              )}
            </ContentBlock>

            {comment.reply_selected ? (
              <ReplyText onClick={() => offReply(comment.comment_id)}>
                {`대댓글 닫기 (${comment.replyCount})`}
              </ReplyText>
            ) : (
              <ReplyText onClick={() => onReply(comment.comment_id)}>
                {`대댓글 보기 (${comment.replyCount})`}
              </ReplyText>
            )}

            {comment.reply_selected && (
              <ReplyWrap>
                <ReplyList
                  commentId={comment.comment_id}
                  userName={props.userName}
                />
                <ReplyUpload commentId={comment.comment_id} />
              </ReplyWrap>
            )}
          </CommentBlock>
        </CommentWrap>
      ))}

    
      {/* 페이지 네이션 */}
      {Comments.length !== 0
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
      

      {/* 댓글 작성 컴포넌트 */}
      <Line />
      <CommentUpload boardId={props.boardId} />
    </>
  );
};

const CommentTitle = styled.div`
  color: #ff4122;
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 34.5px;
`;

const CommentWrap = styled.div`
  width: 1440px;
  height: auto;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 6% 93%;
  justify-content: space-between;
  margin: 20px 0 40px 0;
`;

const Profile = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 70px;
  background-color: #ced4da;
`;

const CommentBlock = styled.div`
  width: 100%;
  height: auto;
  box-sizing: border-box;
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

const Time = styled.div`
  font-size: 12px;
  color: #cbcbcb;
  font-weight: 400;
  margin: 6px 0 9px 0;
`;

const ContentBlock = styled.div`
  height: auto;
  position: relative;
  display: block;
  width: 100%;
  padding-bottom: 10px;
`;

const ContentTextWrap = styled.div`
  display: grid;
  grid-template-columns: 98% 1%;
  justify-content: space-between;
  position: relative;
`;

const ContentText = styled.div`
  font-size: 15px;
  display: block;
  border: 2px solid #f0f0f0;
  width: 1286px;
  padding: 24px 16px;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: ${props => (props.backColor ? '#F8F9FA' : 'white')};
`;

const EditButton = styled.img`
  margin-left: 10px;
  margin-top: 3px;
  cursor: pointer;
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
  left: 101%;
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

const ReplyText = styled.div`
  font-size: 11px;
  margin-left: 4px;
  color: #878787;
  display: block;
  cursor: pointer;
`;

const EditBlock = styled.input`
  width: 100%;
  position: absolute;
  top: 1px;
  left: 0;
  border-radius: 10px;
  border: 1px solid #ff4122;
  font-size: 15px;
  padding: 24px 16px;
  box-sizing: border-box;
  width: 1286px;
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
`;

const Edit2Button = styled.div`
  background-color: #ff4122;
  width: 20px;
  color: #ffffff;
  font-size: 11px;
  font-weight: 500;
  position: absolute;
  top: 49%;
  left: ${props => props.left};
  padding: 5px 14px;
  border-radius: 5px;
  transition: 0.2s;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    top: 45%;
  }
`;

const ReplyWrap = styled.div`
  width: 100%;
  padding-left: 40px;
  box-sizing: border-box;
`;

const Line = styled.div`
  width: 100%;
  height: 0.1px;
  background-color: #ffa590;
  margin: 40px 0;
`;

//페이지 네이션
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

export default CommentList;
