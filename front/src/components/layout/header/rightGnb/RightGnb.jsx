import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginUser } from "../../../../redux/reducer/userSlice";
import { removeCookie } from "../../../../until/cookie";

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
function RightGnb() {
    const { isLoggedIn } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    useEffect(() => {}, [isLoggedIn]);
    const logout = () => {
        dispatch(loginUser({ isLoggedIn: false }));
        removeCookie("accesstoken");
    };
    return (
        <>
            <GnbContainer>
                {isLoggedIn === false ? (
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
                            <Link to="/myPage">마이페이지</Link>
                        </li>
                        <li>
                            <a onClick={logout}>로그아웃</a>
                        </li>
                    </>
                )}
            </GnbContainer>
        </>
    );
}

export default RightGnb;
