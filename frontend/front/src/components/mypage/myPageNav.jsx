import styled from '@emotion/styled';
import { useState } from 'react';

const MypageNav = (props) => {

    const[userInfo, serUserInfo] = useState([]);

    return (
        <Wrap>
            <UserWrap>
                <UserImg />
                <UserInfo>
                    <div><span>닉네임</span>닉네임이 들어올자리</div>
                    <div><span>닉네임</span>{props.userName}</div>
                    <div><span>닉네임</span>{props.userEmail}</div>
                </UserInfo>
            </UserWrap>
            <Box>
                <BoxIcon url='/image/mypage-alarm.png' />
                <BoxText>댓글 알림</BoxText>
            </Box>
            <Box>
                <BoxIcon url='/image/mypage-written.png' />
                <BoxText>내가 작성한 글</BoxText>
            </Box>
            <Box>
                <BoxIcon url='/image/mypage-like.png' />
                <BoxText>내가 좋아요한 글</BoxText>
            </Box>
            <Box>
                <BoxIcon url='/image/mypage-comment.png' />
                <BoxText>내가 댓글단 글</BoxText>
            </Box>
            <Box>
                <BoxIcon url='/image/mypage-account.png' />
                <BoxText>설정</BoxText>
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
    width: 100px;
    height: 100px;
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
    height: 12%;
    display: flex;
    align-items: center;
    justify-content: center;
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
`

const BoxText = styled.div`
    color: #B0B0B0;
    font-size: 18px;
    font-weight: 500;
`

export default MypageNav;