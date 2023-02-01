import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CommentHttp from "../../http/commentHttp";
import styled from "@emotion/styled";
import ReplyList from "./ReplyList";
import ReplyUpload from "./ReplyUpload";

const commentHttp = new CommentHttp();

const CommentList = (props) => {
    const username = useSelector((state) => state.persistedReducer.userReducer.username);
    const userId = useSelector((state) => state.persistedReducer.userReducer.userId);

    const [Comments, setComments] = useState([]);
    const [EditComment, setEditComment] = useState("");

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
            text: EditComment
        };

        if (text === EditComment) {
            alert("댓글 내용을 변경해주세요");
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
    const onReply = (id) => {
        const copyList = [...Comments];
        copyList.find((comment) => comment.comment_id === id).reply_selected = true;
        setComments(copyList);
    };

    //답글창 닫기 기능
    const offReply = (id) => {
        const copyList = [...Comments];
        copyList.find((comment) => comment.comment_id === id).reply_selected = false;
        setComments(copyList);
    };

    //댓글 수정창 켜기 기능
    const onEdit = (id, text) => {
        const copyList = [...Comments];
        copyList.find((comment) => comment.comment_id === id).edit_selected = true;
        setComments(copyList);
        setEditComment(text);
    };

    //댓글 수정창 닫기 기능
    const offEdit = (id) => {
        const copyList = [...Comments];
        copyList.find((comment) => comment.comment_id === id).edit_selected = false;
        setComments(copyList);
    };

    //댓글 삭제 기능
    const onDelete = async (e, commentId) => {
        e.preventDefault();

        if (window.confirm("정말 댓글을 삭제하겠습니까?")) {
            try {
                await commentHttp.deleteComment(commentId, userId);
                alert("댓글이 삭제되었습니다.");
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
            {Comments?.map((comment) => (
                <CommentWrap key={comment.comment_id}>
                    <CommentBlock>
                        <TextWrap>
                            <TextBlock>
                                <UsernameText>{comment.user_name}</UsernameText>
                                <DateText>{comment.create_date}</DateText>
                            </TextBlock>
                            {username === comment.user_name ? (
                                <TextBlock>
                                    <ButtonText onClick={() => onEdit(comment.comment_id, comment.text)}>수정</ButtonText>
                                    <ButtonText marginLeft onClick={(e) => onDelete(e, comment.comment_id)}>
                                        삭제
                                    </ButtonText>
                                </TextBlock>
                            ) : (
                                <></>
                            )}
                        </TextWrap>
                        <ContentBlock>
                            <ContentText>{comment.text}</ContentText>
                            {comment.edit_selected ? (
                                <>
                                    <EditBlock value={EditComment} type="text" onChange={(e) => setEditComment(e.currentTarget.value)} />
                                    <EditButton left="91%" onClick={(e) => submitEdit(e, comment.comment_id, comment.text)}>
                                        확인
                                    </EditButton>
                                    <EditButton left="95%" onClick={() => offEdit(comment.comment_id)}>
                                        취소
                                    </EditButton>
                                </>
                            ) : (
                                <></>
                            )}
                        </ContentBlock>
                        {comment.reply_selected ? (
                            <ReplyText onClick={() => offReply(comment.comment_id)}>답글 닫기</ReplyText>
                        ) : (
                            <ReplyText onClick={() => onReply(comment.comment_id)}>답글 보기</ReplyText>
                        )}
                    </CommentBlock>
                    {comment.reply_selected ? (
                        <ReplyWrap>
                            <ReplyList commentId={comment.comment_id} />
                            <ReplyUpload commentId={comment.comment_id} />
                        </ReplyWrap>
                    ) : (
                        <></>
                    )}
                </CommentWrap>
            ))}
        </>
    );
};

const CommentWrap = styled.div`
    width: 1100px;
    height: auto;
    margin: 0 auto;
`;

const CommentBlock = styled.div`
    width: 100%;
    height: auto;
    padding: 20px 0;
    box-sizing: border-box;
    margin: 10px 0;
    border-bottom: 0.5px solid #929292;
`;

const UsernameText = styled.div`
    font-size: 17px;
    font-weight: 700;
    color: black;
    display: inline;
`;

const TextWrap = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
`;

const TextBlock = styled.div`
    display: flex;
`;

const DateText = styled.div`
    font-size: 11px;
    color: #878787;
    margin-left: 10px;
    margin-top: auto;
`;

const ButtonText = styled.div`
    font-size: 12px;
    color: #878787;
    margin-left: ${(props) => (props.marginLeft ? "10px" : "")};
    cursor: pointer;

    &:hover {
        color: #35c5f0;
    }
`;

const ContentBlock = styled.div`
    width: 100%;
    height: auto;
    position: relative;
    padding: 20px 0;
`;

const ContentText = styled.div`
    font-size: 15px;
    margin-top: 10px;
    display: block;
`;

const ReplyText = styled.div`
    font-size: 11px;
    margin-left: 1px;
    color: #878787;
    display: block;
    cursor: pointer;
`;

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
    left: ${(props) => props.left};
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

export default CommentList;
