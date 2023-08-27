import styled from '@emotion/styled';
import { color } from '../../../constants/color';
import {mobile} from "../../../constants/media/media";

function Footer() {
  return (
    <FooterContainer>
      <ContentsWrap>
        <Logo src='/image/LOGO.png' />
        <LinkWrap>
          <Text>피드백 문의</Text>
          <Text thin className='name'>ks12b0000@gmail.com</Text>
          <a href='https://night-triangle-fdc.notion.site/COOKEEP-9d7eebcdacde4859bfd7dc428a052aea'>
            <Text pointer underline className='pro'>
              프로젝트 소개
            </Text>
          </a>
        </LinkWrap>
      </ContentsWrap>
    </FooterContainer>
  );
}
export default Footer;

const FooterContainer = styled.footer`
  margin-top: 70px;
  height: 70px;
  background: #f0f0f0;
  width: 100%;
   
  ${mobile}{
    height: 85px;
  }
  @media screen and (max-width: 768px) {
    margin-top: 0;
 
  }
`;

const ContentsWrap = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1440px;
  display: flex;
  height: 70px;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  
  ${mobile} {
    padding:8px 16px 0;
    box-sizing: border-box;

    display: block;
  }

  @media screen and (max-width: 1700px) {
    width: 1300px;
  }

  @media screen and (max-width: 1024px) {
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    overflow: hidden;
    
  }
`;

const Logo = styled.img`
  width: 133px;
  
  ${mobile} {
    
    width: 70px;
  }
`;

const LinkWrap = styled.div`
  width: 400px;
  display: flex;
  height: 70px;
  justify-content: space-between;
  align-items: center;
  
  ${mobile}{
    margin-top:21px;
    width: 95vw;
    gap:0;
    height: auto;
  }
`;

const Text = styled.div`
  font-size: 16px;
  color: #3e4145;
  font-weight: ${props => (props.thin ? '300' : '600')};
  cursor: ${props => (props.pointer ? 'pointer' : '')};
  text-decoration: ${props => (props.underline ? 'underline' : '')};
   &.name{
     ${mobile}{
       padding-right: 13vw;
     }
   }
  
  &.pro{
    ${mobile}{
      padding-right: 10px;
    }
  }
  ${mobile} {
    font-size: 14px;
  }
`;
