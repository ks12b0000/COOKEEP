import styled from "@emotion/styled";
import {color} from "../../../../constants/color";
import {mq} from "../../../media/media";

function Banner() {
    return(
        <BannerWrap>


        </BannerWrap>
    )
}
export default Banner;

const BannerWrap = styled.section`
  position: relative;
  width:100%;
  height: 420px;
  img{
    position: absolute;
    z-index: -1;
    width:100%;
    height: 100%;
    object-fit: contain;
    ${mq[0]} {
      object-fit: cover;
    }
  }
`
const TextWrap = styled.div`
   width:1200px;
   height:420px;   
   margin:0 auto;
   display: flex;
   align-items: center;
  ${mq[0]}{
    width:100vw;
  }
     span{
       display: block;
       font-weight: 400;
       font-size: 32px;
       line-height: 50px;
       color:${color.main}
     }
  
`
