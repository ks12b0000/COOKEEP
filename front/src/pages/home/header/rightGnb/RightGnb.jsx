import styled from "@emotion/styled";
import { Link } from "react-router-dom";

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
    return (
        <>
            <GnbContainer>
                <li>
                    <Link to="/myPage">마이페이지</Link>
                </li>
                <li>
                    <Link to="/login"> 로그인</Link>
                </li>
                <li>
                    <Link to="/sign">회원가입</Link>
                </li>
            </GnbContainer>
        </>
    );
}

export default RightGnb;
