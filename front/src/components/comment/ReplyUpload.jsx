import styled from "@emotion/styled";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import CommentHttp from "../../http/commentHttp";

const commentHttp = new CommentHttp();

const ReplyUpload = (props) => {
    const [Text, setText] = useState("");
    const userId = useSelector((state) => state.persistedReducer.userReducer.userId);

    const onSubmit = async (e) => {
        e.preventDefault();

        const body = {
            comment_id: props.commentId,
            user_id: userId,
            text: Text
        };

        if (!Text) {
            alert("댓글 내용을 입력해주세요");
        } else {
            try {
                const res = await commentHttp.postReplyUpload(body);
                console.log(res);
            } catch (err) {
                console.log(err);
                alert(err.response.data.message);
            }
        }
        return window.location.reload();
    };

    return (
        <RepleWrap>
            <RepleTextarea
                placeholder="대댓글을 입력해 주세요"
                value={Text}
                onChange={(e) => {
                    setText(e.currentTarget.value);
                }}
            />
            <RepleButton onClick={(e) => onSubmit(e)}>대댓글 쓰기</RepleButton>
        </RepleWrap>
    );
};

const RepleWrap = styled.div`
    width: 100%;
    height: auto;
    margin: 40px 0 40px 0;
    display: block;
`;

const RepleTextarea = styled.textarea`
    padding: 15px;
    width: 100%;
    height: 50px;
    border-radius: 15px;
    border: 1px solid #8b8b8b;
    box-sizing: border-box;
    font-size: 15px;

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

const RepleButton = styled.div`
    width: 100px;
    height: 40px;
    background-color: #9e9e9e;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    margin-left: auto;
    color: white;
    font-weight: 600;
    cursor: pointer;
    margin-top: 10px;
`;

export default ReplyUpload;
