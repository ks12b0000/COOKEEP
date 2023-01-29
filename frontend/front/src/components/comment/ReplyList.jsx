import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CommentHttp from "../../http/commentHttp";
import styled from "@emotion/styled";

const commentHttp = new CommentHttp();

const ReplyList = (props) => {
    const username = useSelector((state) => state.persistedReducer.userReducer.username);
    const userId = useSelector((state) => state.persistedReducer.userReducer.userId);

    const [Replys, setReplys] = useState([]);
    const [EditComment, setEditComment] = useState("");

    useEffect(() => {
        getList();
    }, []);

    const getList = async () => {
        try {
            const res = await commentHttp.getReplyList(props.commentId);
            setReplys(res.data.result);
            console.log(res.data.result);
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
            text: EditComment
        };

        if (text === EditComment) {
            alert("댓글 내용을 변경해주세요");
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

    //대댓글 수정창 켜기 기능
    const onEdit = (id, text) => {
        const copyList = [...Replys];
        copyList.find((reply) => reply.reply_id === id).edit_selected = true;
        setReplys(copyList);
        setEditComment(text);
    };

    //대댓글 수정창 닫기 기능
    const offEdit = (id) => {
        const copyList = [...Replys];
        copyList.find((reply) => reply.reply_id === id).edit_selected = false;
        setReplys(copyList);
    };

    //대댓글 삭제 기능
    const onDelete = async (e, replyId) => {
        e.preventDefault();

        if (window.confirm("정말 댓글을 삭제하겠습니까?")) {
            try {
                await commentHttp.deleteReply(replyId, userId);
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
            {Replys?.map((reply) => (
                <CommentWrap key={reply.reply_id}>
                    <CommentBlock>
                        <TextWrap>
                            <TextBlock>
                                <UsernameText>{reply.user_name}</UsernameText>
                                <DateText>{reply.create_date}</DateText>
                            </TextBlock>
                            {username === reply.user_name ? (
                                <TextBlock>
                                    <ButtonText onClick={() => onEdit(reply.reply_id, reply.text)}>수정</ButtonText>
                                    <ButtonText marginLeft onClick={(e) => onDelete(e, reply.reply_id)}>
                                        삭제
                                    </ButtonText>
                                </TextBlock>
                            ) : (
                                <></>
                            )}
                        </TextWrap>
                        <ContentBlock>
                            <ContentText>{reply.text}</ContentText>
                            {reply.edit_selected ? (
                                <>
                                    <EditBlock value={EditComment} type="text" onChange={(e) => setEditComment(e.currentTarget.value)} />
                                    <EditButton left="91%" onClick={(e) => submitEdit(e, reply.reply_id, reply.text)}>
                                        확인
                                    </EditButton>
                                    <EditButton left="95%" onClick={() => offEdit(reply.reply_id)}>
                                        취소
                                    </EditButton>
                                </>
                            ) : (
                                <></>
                            )}
                        </ContentBlock>
                    </CommentBlock>
                </CommentWrap>
            ))}
        </>
    );
};

const CommentWrap = styled.div`
    width: 100%;
    height: auto;
    margin: 0 auto;
    box-sizing: border-box;
`;

const CommentBlock = styled.div`
    width: 100%;
    height: auto;
    padding: 10px 0;
    box-sizing: border-box;
    margin: 5px 0;
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

const EditBlock = styled.input`
    width: 100%;
    height: 80%;
    position: absolute;
    top: 17%;
    left: 0;
    border-radius: 15px;
    border: 1px solid #8b8b8b;
    font-size: 15px;
    padding: 0 20px;
    box-sizing: border-box;

    :focus {
        outline: none;
        border: 2px solid #949494;
    }

    ::placeholder {
        font-size: 15px;
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

export default ReplyList;