import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginUser } from "../../../../redux/reducer/userSlice";
import {mq} from '../../../media/media';

import UserHttp from "../../../../http/userHttp";
import List from "./List";




const userHttp = new UserHttp();

function RightGnb({color}) {

  const GnbContainer = styled.ul`
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  ${mq[0]} {
    display: none;
  }
  li {
    
    a {
      color:${color};
      cursor: pointer;
      font-size: 16px !important;
      &:hover{
        color:#ff7100;
      }
   
    }
  }
`;


    const userInfo = useSelector((state) => state.persistedReducer.userReducer);
    const dispatch = useDispatch();
    useEffect(() => {
    }, [userInfo]);

    const logout = async() => {
        //서버에 요청을 하여 accesstoken과 refreshtoken을 삭제시켜줌
        //현재는 서버에서 직접 토큰을 지워줄 수 없어서 통신여부만 체크함
        try{
            const res = await userHttp.getLogout();
            console.log(res);

        }catch(err){
            console.log(err);
        }

        dispatch(loginUser({
            userId: '',
            isLoggedIn: false,
        }));

        alert('로그아웃이 완료되었습니다.');
    };

    return (
        <>
            <GnbContainer>
                {userInfo.isLoggedIn === false ? (
                    <>
                        <List />
                        <li>
                                <Link to="/login" > 로그인</Link>
                        </li>
                        <li>
                            <Link to="/sign" >회원가입</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <List />
                        <li>
                            <Link to={`/mypage/${userInfo.userId}`}>마이페이지</Link>
                        </li>
                        <li>
                            <Link to="/" onClick={logout} >로그아웃</Link>
                        </li>
                    </>
                )}

            </GnbContainer>
            <MediaMenu>햄버거</MediaMenu>
        </>
    );
}

export default RightGnb;

const MediaMenu = styled.div`
   display: none;
   ${mq[0]}{
     display: block;
   }
`