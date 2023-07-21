import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CommentHttp from '../../http/commentHttp';
import styled from '@emotion/styled';
import ReplyDelete from './ReplyDelete';
import { useMediaQuery } from 'react-responsive';
import { useInView } from 'react-intersection-observer';

const commentHttp = new CommentHttp();

const ReplyList = props => {
  const modalRef = useRef();
  const { ref, inView } = useInView();
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

  const [Replys, setReplys] = useState([]);
  const [EditComment, setEditComment] = useState('');

  //모바일 인피니트 스크롤
  const [MoreData, setMoreData] = useState(0);

  // useEffect(() => {
  //   getList();
  // }, [SelectedButton]);

  // const getList = async () => {
  //   try {
  //     const res = await commentHttp.getReplyList(
  //       props.commentId,
  //       SelectedButton
  //     );
  //     console.log(res);
  //     setReplys(res.data.result.list);
  //     const arrayLength = res.data.result.total;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // 페이지 네이션 함수
  // const handlePagination = buttonValue => {
  //   setSelectedButton(buttonValue);
  // };

  // 인피니트 스크롤
  useEffect(() => {
    getList();
  }, [inView]);

  // 인피니트 스크롤로 리스트 얻기
  const getList = async () => {
    try {
      const res = await commentHttp.getReplyList(props.commentId, MoreData);
      const newReplys = [...Replys, ...res.data.result.list];
      setReplys(newReplys);
      if (MoreData < res.data.result.total) {
        setMoreData(prev => prev + 1);
      }
    } catch (err) {
      console.log(err);
    }
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
    copyList.find(reply => reply.reply_id === id).icon_selected = false;
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
      {Replys?.map(reply => (
        <div key={reply.reply_id}>
          {isMobile && <BorderLine />}
          <CommentWrap>
            <ReplyArrow src='/image/reply-arrow.png' Length={Replys.length} />
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
                            <div
                              onClick={() => onItem(reply.reply_id, 'modal')}
                            >
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
                    <Edit2Button
                      onClick={() => offItem(reply.reply_id, 'edit')}
                    >
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
        </div>
      ))}

      {Replys.length !== 0 && <div ref={ref}></div>}

      {/* 페이지 네이션 */}
      {/* {Replys.length !== 0 && (
        <>
          <Pagination
            handlePagination={handlePagination}
            Page={Page}
            SelectedButton={SelectedButton}
          />
        </>
      )}

      {Replys.length !== 0 && <Line />} */}
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 1270px;
  height: auto;
  position: relative;

  @media screen and (max-width: 1020px) {
    width: 600px;
  }

  @media screen and (max-width: 760px) {
    width: 300px;
  }
`;

const CommentWrap = styled.div`
  position: relative;
  left: -60px;
  width: 1330px;
  height: auto;
  display: grid;
  grid-template-columns: 8% 92%;
  justify-content: space-between;

  @media screen and (max-width: 1700px) {
    width: 1190px;
  }

  @media screen and (max-width: 1020px) {
    width: 600px;
    left: 20px;
    grid-template-columns: 12% 85%;
  }

  @media screen and (max-width: 760px) {
    width: 290px;
    left: 35px;
    grid-template-columns: 12% 86%;
  }
`;

const BorderLine = styled.div`
  width: 350px;
  height: 0.1px;
  background-color: #dddddd;
`;

const ReplyArrow = styled.img`
  position: absolute;
  top: 60px;
  left: -70px;

  @media screen and (max-width: 1020px) {
    left: -60px;
    top: 50px;
  }

  @media screen and (max-width: 760px) {
    scale: 0.5;
    left: -40px;
    top: 30px;
  }
`;

const Profile = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 70px;
  background-color: #ced4da;
  position: relative;
  overflow: hidden;
  top: 40px;

  @media screen and (max-width: 1020px) {
    top: 35px;
  }

  @media screen and (max-width: 760px) {
    width: 30px;
    height: 30px;
    top: 18px;
  }
`;

const Img = styled.img`
  height: 70px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media screen and (max-width: 760px) {
    height: 30px;
  }
`;

const CommentBlock = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 0;
  box-sizing: border-box;
  margin: 5px 0;

  @media screen and (max-width: 760px) {
    padding: 20px 0 15px 0;
  }
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

  @media screen and (max-width: 760px) {
    font-size: 14px;
  }
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

  @media screen and (max-width: 760px) {
    position: relative;
    top: -3px;
  }
`;

const TimeStyled = styled.div`
  font-size: 12px;
  color: #cbcbcb;
  font-weight: 400;
  margin: 6px 0 9px 0;

  @media screen and (max-width: 760px) {
    margin: 2px 0 9px 0;
  }
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
  width: 1254px;
  grid-template-columns: 98% 1%;
  justify-content: space-between;
  position: relative;

  @media screen and (max-width: 1700px) {
    width: 1135px;
  }

  @media screen and (max-width: 1020px) {
    width: 590px;
    grid-template-columns: 97% 1%;
  }

  @media screen and (max-width: 760px) {
    width: 280px;
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

  @media screen and (max-width: 760px) {
    border: none;
    padding: 0;
    font-size: 14px;
  }
`;

const EditButton = styled.img`
  margin-left: 10px;
  margin-top: 3px;
  cursor: pointer;
  margin-left: auto;
  position: absolute;
  left: 100%;

  @media screen and (max-width: 760px) {
    height: 15px;
    position: relative;
    top: -45px;
    left: -10px;
  }
`;

const EditBoxBack = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 100;

  @media screen and (max-width: 1020px) {
    background-color: rgba(0, 0, 0, 0.5);
  }
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
  z-index: 200;

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

const EditBlock = styled.input`
  position: absolute;
  top: 1px;
  left: 0;
  border-radius: 10px;
  border: 1px solid #ff4122;
  font-size: 15px;
  padding: 24px 16px;
  box-sizing: border-box;
  width: 1230px;
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
    width: 1114px;
  }

  @media screen and (max-width: 1020px) {
    width: 570px;
  }

  @media screen and (max-width: 760px) {
    width: 280px;
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
  left: 89%;
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

  @media screen and (max-width: 1020px) {
    left: 86.5%;
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
  left: 93.8%;
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

  @media screen and (max-width: 1020px) {
    left: 98%;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 0.1px;
  background-color: #ffa590;
`;

export default ReplyList;
