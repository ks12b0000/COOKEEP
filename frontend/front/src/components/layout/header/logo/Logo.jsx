import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import {mq} from "../../../media/media";

const LogoContainer = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    max-width: 280px;
    div {
      width: 100%;
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
                <Link to="/" ><img  src={`${process.env.PUBLIC_URL}/image/LOGO.png`} alt ="로고"/></Link>
            </div>
        </LogoContainer>
    );
}
export default Logo;
