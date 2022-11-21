import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    div {
        a {
            font-size: 16px;
        }
    }
`;
function Logo() {
    return (
        <LogoContainer>
            <div>
                <Link to="/">프로젝트이름</Link>
            </div>
        </LogoContainer>
    );
}
export default Logo;
