import styled from "@emotion/styled";
import {useState} from "react";

function MobileTabInput() {

    const [isTag, setIsTag] = useState(false);

    const TagChange = () => {
        setIsTag(!isTag);
    }

    return (
        <>
            <input type="text" placeholder={!isTag ? '검색어를 입력하세요' : '태그를 입력하세요'}/>
            <IsTag>#</IsTag>
            <ul>
                <li onClick={TagChange} ><Tag isTag={isTag}>#</Tag></li>
                <li><img src={`${process.env.PUBLIC_URL}/image/search.png`} alt=""/></li>
            </ul>
        </>
    )

}
export default  MobileTabInput;

const Tag = styled.span`
  display: block;
  font-size: 20px;
  color: ${props => props.isTag ?'#FF4122':'#FFC9BB' };
  cursor: pointer;
`
const IsTag = styled.div`
  position: absolute;
  top:40px;
  left:0;
`