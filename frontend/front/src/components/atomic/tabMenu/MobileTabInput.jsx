import styled from "@emotion/styled";
import {useState} from "react";
import {useNavigate} from "react-router";

function MobileTabInput({contents,tagContents,  setOpen,
                            navSetOpen,}) {

    const [value,setValue] =useState(contents ? contents : tagContents ? tagContents : "");
    const [isTag, setIsTag] = useState(false);
    const navigation = useNavigate();
    const handleInput = (e) => {
        setValue(e.target.value);
    }
    const TagChange = () => {
        setIsTag(!isTag);
    }

    const SearchClick = (tag,value ) => {
        if(tag && value) {
            setOpen(false);
            navSetOpen(false);
            navigation(`/searchTag${value? '/'+ value : '/null' }`)
        }
        else if (!tag && value ){
            setOpen(false);
            navSetOpen(false);
            navigation(`/search${value ?  '/'+ value : '/null' }`)
        }

        return false;

    }

    return (
        <>
            <input type="text" placeholder={!isTag ? '검색어를 입력하세요' : '태그를 입력하세요'} onChange={handleInput}/>
            {isTag && <IsTag>#</IsTag> }
            <ul>
                <li onClick={TagChange} ><Tag isTag={isTag}>#</Tag></li>
                <li onClick={()=> SearchClick(isTag,value)}><img src={`${process.env.PUBLIC_URL}/image/search.png`} alt=""/></li>
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
  top:50%;
  transform: translateY(-50%);
  left:15px;
`