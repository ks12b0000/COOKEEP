import styled from "@emotion/styled";
import{ color} from "../../../constants/color";

function Footer() {
    return(
        <FooterContainer>
            <div>
                <ul>
                    <li>프로젝트 소개</li>
                    <li>이용약관</li>
                    <li>개인정보처리방침</li>
                    <li>사이트맵</li>
                </ul>
            </div>
        </FooterContainer>
    )
}
export default Footer;

const FooterContainer = styled.footer`
    height: 60px;
    background:#777777;
    width: 100%;
    overflow-x: hidden;
    >div{
      width: 1200px;
      margin:0 auto;
  
      ul{
        display: flex;
        gap:20px;
        li{
          display: flex;
          align-items: center;
          height: 60px;
          color:#ffffff;
        }
     
      }
    }
`