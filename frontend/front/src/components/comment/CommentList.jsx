import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CommentHttp from '../../http/commentHttp';
import styled from '@emotion/styled';
import ReplyList from './ReplyList';
import ReplyUpload from './ReplyUpload';
import Pagination from './Pagination';
import CommentUpload from './CommentUpload';

const commentHttp = new CommentHttp();

const CommentList = props => {
  const username = useSelector(
    state => state.persistedReducer.userReducer.username
  );
  const userId = useSelector(
    state => state.persistedReducer.userReducer.userId
  );

  const [Comments, setComments] = useState([]);
  const [EditComment, setEditComment] = useState('');

  //페이지 네이션 용 state
  const [Limit, setLimit] = useState(5);
  const [Page, setPage] = useState(1);
  const offset = (Page - 1) * Limit;

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    try {
      const res = await commentHttp.getCommentList(props.boardId);
      setComments(res.data.result);
      console.log(res);
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
      <CommentTitle>{`댓글 (${Comments.length})`}</CommentTitle>
      {Comments.slice(offset, offset + Limit)?.map(comment => (
        <CommentWrap key={comment.comment_id}>
          <Profile />
          <CommentBlock>
            {/* 상단 작성자 이름 */}
            <UserNameWrap>
              <UsernameText>{comment.user_name}</UsernameText>
              <Author>작성자</Author>
            </UserNameWrap>

            {/* {username === comment.user_name && (
              <>
                <ButtonText
                  onClick={() => onEdit(comment.comment_id, comment.text)}
                >
                  수정
                </ButtonText>
                <ButtonText
                  marginLeft
                  onClick={e => onDelete(e, comment.comment_id)}
                >
                  삭제
                </ButtonText>
              </>
            )} */}

            <ContentBlock>
              <ContentText>{comment.text}</ContentText>

              {comment.edit_selected && (
                <>
                  <EditBlock
                    value={EditComment}
                    type='text'
                    onChange={e => setEditComment(e.currentTarget.value)}
                  />
                  <EditButton
                    left='91%'
                    onClick={e =>
                      submitEdit(e, comment.comment_id, comment.text)
                    }
                  >
                    확인
                  </EditButton>
                  <EditButton
                    left='95%'
                    onClick={() => offEdit(comment.comment_id)}
                  >
                    취소
                  </EditButton>
                </>
              )}
            </ContentBlock>
            {comment.reply_selected ? (
              <ReplyText onClick={() => offReply(comment.comment_id)}>
                대댓글 닫기
              </ReplyText>
            ) : (
              <ReplyText onClick={() => onReply(comment.comment_id)}>
                대댓글 보기
              </ReplyText>
            )}

            {comment.reply_selected && (
              <ReplyWrap>
                <ReplyList commentId={comment.comment_id} />
                <ReplyUpload commentId={comment.comment_id} />
              </ReplyWrap>
            )}
          </CommentBlock>
        </CommentWrap>
      ))}

      <Line />
      <CommentUpload boardId={props.boardId} />

      <footer>
        <Pagination
          total={Comments.length}
          limit={Limit}
          page={Page}
          setPage={setPage}
        />
      </footer>
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
  margin: 20px 0;
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

const ContentBlock = styled.div`
  height: auto;
  position: relative;
  padding: 20px 0;
  display: block;
  width: 100%;
`;

const ContentText = styled.div`
  font-size: 15px;
  display: block;
  border: 2px solid #f0f0f0;
  width: 100%;
  padding: 24px 16px;
  border-radius: 10px;
  box-sizing: border-box;
`;

const ReplyText = styled.div`
  font-size: 11px;
  margin-left: 1px;
  color: #878787;
  display: block;
  cursor: pointer;
`;

const ButtonText = styled.div``;

const EditBlock = styled.input`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 15px;
  border: 1px solid #8b8b8b;
  font-size: 16px;
  padding: 0 20px;
  box-sizing: border-box;

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

const EditButton = styled.div`
  background-color: #949494;
  color: white;
  font-size: 11px;
  font-weight: 500;
  position: absolute;
  top: 58%;
  left: ${props => props.left};
  padding: 3px 10px;
  border-radius: 5px;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #35c5f0;
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

export default CommentList;
