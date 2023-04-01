import styled from "@emotion/styled";

import TabMenu from "./tabMenu/TabMenu";
import OnChangeMenu from "./tabMenu/OnChageMenu";
import {useEffect, useState} from "react";
import SearchHttp from "../../http/searchHttp";

const SearchContainer = styled.div`
  margin:0 auto;
  display: flex;
  gap:10px;
  justify-content: center;
 
  
  button{
    width: 120px;
    height: 48px;
    border:none;
    cursor: pointer;
    color:#ffffff;
    background: #FF4122;
    border-radius: 5px;
  }
`
const InputWrap = styled.div`
  position: relative;
 
  input{
    padding:12px 28px;
    width: 534px;
    height: 48px;
    background: #FFFFFF;
    border: 1px solid #FF4122;
    border-radius: 5px;
    box-sizing: border-box;
  }
 
 

`


const TagSearch = styled.span`
    position: absolute;
    left:16px;
    top:50%;
    transform: translateY(-50%);
    color: #222;
  
  `
function SearchView({bottom,onFocus,onBlur}) {
    const [value,setValue] =useState("");
    const [tag,setTag] = useState(false);

    const handleTag = () => {
        setTag(!tag)
    }
    const handleInput = (e) => {
        setValue(e.target.value);
    }

    const Tag = styled.span`
    position: absolute;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
      align-items: center;
    right:5px;
    top:50%;
    transform: translateY(-50%);
    color:  ${!tag ? '#FFC9BB' : '#FF4122'}; 
    cursor: pointer;
    `

    return (
        <>
            <SearchContainer>
                <InputWrap>

                    <input type="text" onBlur={onBlur} onFocus={onFocus} value={value} onChange={handleInput} placeholder={tag ? "태그를 입력해주세요" : "검색어를 입력해주세요"} />
                    <Tag onClick={handleTag}>#</Tag>

                    {tag && <TagSearch>#</TagSearch> }
                    {bottom || value === "" &&  <TabMenu /> }
                    {value.length >= 1 && <OnChangeMenu value={value} tag={tag} /> }
                </InputWrap>
                <button>검색</button>

            </SearchContainer>
        </>
    )
}
export default SearchView