import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import {mq} from "../../../media/media";

const LogoContainer = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    width: 300px;
    div {
      width: 180px;
      text-align: center;
      ${mq[0]}{
        text-align: left;
      }
        a {
          font-weight: 500;
          font-size: 20px;
          line-height: 24px;
          ${mq[0]}{
            font-size: 5vw;
          }
        }
    }
`;
function Logo() {
    return (
        <LogoContainer>
            <div>
                <Link to="/">오늘 뭐 먹지</Link>
            </div>
        </LogoContainer>
    );
}
export default Logo;
