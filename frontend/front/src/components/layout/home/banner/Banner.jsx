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

  height: 350px;
  background:#D9D9D9;

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

