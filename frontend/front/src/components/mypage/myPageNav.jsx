import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const MypageNav = (props) => {

    const navigate = useNavigate();
    const[userInfo, serUserInfo] = useState([]);

    return (
        <Wrap>
            <UserWrap>
                <UserImg />
                <UserInfo>
                    <div><span>닉네임</span>{props.userNickName}</div>
                    <div><span>아이디</span>{props.userName}</div>
                    <div><span>이메일</span>{props.userEmail}</div>
                </UserInfo>
            </UserWrap>
            <Box className={props.categoryName === 'alarms' ? 'active' : null} onClick={() => navigate(`/mypage/alarms/${props.userId}`)}>
                {props.categoryName === 'alarms'
                    ? 
                    <BoxIcon url='/image/mypage-alarm-w.png' />
                    :
                    <BoxIcon url='/image/mypage-alarm.png' />
                }
                <BoxText className={props.categoryName === 'alarms' ? 'active' : null}>댓글 알림</BoxText>
            </Box>
            <Box className={props.categoryName === 'posts' ? 'active' : null} onClick={() => navigate(`/mypage/posts/${props.userId}`)} >
            {props.categoryName === 'posts'
                    ? 
                    <BoxIcon url='/image/mypage-written-w.png' />
                    :
                    <BoxIcon url='/image/mypage-written.png' />
                }       
                <BoxText className={props.categoryName === 'posts' ? 'active' : null}>내가 작성한 글</BoxText>
            </Box>
            <Box className={props.categoryName === 'likes' ? 'active' : null} onClick={() => navigate(`/mypage/likes/${props.userId}`)}>
            {props.categoryName === 'likes'
                    ? 
                    <BoxIcon url='/image/mypage-like-w.png' marginTop='3px'/>
                    :
                    <BoxIcon url='/image/mypage-like.png' marginTop='3px'/>
                }   
                <BoxText className={props.categoryName === 'likes' ? 'active' : null}>내가 좋아요한 글</BoxText>
            </Box>
            <Box className={props.categoryName === 'comments' ? 'active' : null} onClick={() => navigate(`/mypage/comments/${props.userId}`)}>
            {props.categoryName === 'comments'
                    ? 
                    <BoxIcon url='/image/mypage-comment-w.png' marginTop='3px'/>
                    :
                    <BoxIcon url='/image/mypage-comment.png' marginTop='3px'/>
                }   
                <BoxText className={props.categoryName === 'comments' ? 'active' : null}>내가 댓글단 글</BoxText>
            </Box>
            <Box className={props.categoryName === 'account' ? 'active' : null} onClick={() => navigate(`/mypage/account/${props.userId}`)}>
            {props.categoryName === 'account'
                    ? 
                    <BoxIcon url='/image/mypage-account-w.png' />
                    :
                    <BoxIcon url='/image/mypage-account.png' />
                }
                <BoxText className={props.categoryName === 'account' ? 'active' : null}>설정</BoxText>
            </Box>
        </Wrap>
    )
}

const Wrap = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid #FF6242;
    border-radius: 10px;
`
const UserWrap = styled.div`
    display: flex;
    width: 87%;
    margin: 30px auto;
    align-items: center;
    margin-bottom: 50px;
` 

const UserImg = styled.div`
    width:80px;
    height: 80px;
    border-radius: 50px;
    background-color: #D9D9D9;
    margin-right: 24px;
`

const UserInfo = styled.div`
    div{
        color: #5A5C5F;
        font-size: 14px;
        font-weight: 400;
        margin-bottom: 9px;
    }

    span{
        color: #000000;
        font-weight: 700;
        margin-right: 8px;
    }
`

const Box = styled.div`
    width: 87%;
    margin: 15px auto;
    border: 1px solid #FF6242;
    border-radius: 10px;
    height: 11.3%;
    display: flex;
    align-items: center;
    justify-content: center;
    &.active {
           background-color: #FF6242;
        }
`

const BoxIcon = styled.div`
    width: 22px;
    height: 22px;
    background-repeat: no-repeat;
    margin-right: 6px;
    background-image: url(${props => props.url});
    &.active {
           font-weight: 700;
        }
    margin-top: ${props=>props.marginTop};
`

const BoxText = styled.div`
    color: #B0B0B0;
    font-size: 18px;
    font-weight: 500;
    &.active {
            color: white;
        }
`

export default MypageNav;