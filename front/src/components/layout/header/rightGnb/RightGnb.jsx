import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logoutUser } from "../../../../redux/reducer/userSlice";

import UserHttp from "../../../../http/userHttp";

const GnbContainer = styled.ul`
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 20px;
    li {
        a {
            font-size: 16px !important;
            &:hover {
                color: #35c5f0;
            }
        }
    }
`;

const userHttp = new UserHttp();

function RightGnb() {
    const userInfo = useSelector((state) => state.persistedReducer.userReducer);
    const dispatch = useDispatch();
    useEffect(() => {}, [userInfo]);

    const logout = async () => {
        //서버에 요청을 하여 accesstoken과 refreshtoken을 삭제시켜줌
        //현재는 서버에서 직접 토큰을 지워줄 수 없어서 통신여부만 체크함
        try {
            const res = await userHttp.getLogout();
            console.log(res);
        } catch (err) {
            console.log(err);
        }

        dispatch(logoutUser());

        // //나중에 서버와 통신이 가능한 URL을 사용하게 된다면 지워도 되는 코드
        // removeCookie("accesstoken");
        // removeCookie("refreshtoken");
    };

    return (
        <>
            <GnbContainer>
                {userInfo.isLoggedIn === false ? (
                    <>
                        <li>
                            <Link to="/login"> 로그인</Link>
                        </li>
                        <li>
                            <Link to="/sign">회원가입</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to={`/myPage/${userInfo.userId}`}>마이페이지</Link>
                        </li>
                        <li>
                            <Link to="/" onClick={logout}>
                                로그아웃
                            </Link>
                        </li>
                    </>
                )}
            </GnbContainer>
        </>
    );
}

export default RightGnb;
