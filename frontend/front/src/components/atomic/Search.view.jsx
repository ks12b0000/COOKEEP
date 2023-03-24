import styled from "@emotion/styled";

import TabMenu from "./tabMenu/TabMenu";
import OnChangeMenu from "./tabMenu/OnChageMenu";

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
    padding:12px 16px;
    width: 534px;
    height: 48px;
    background: #FFFFFF;
    border: 1px solid #FF4122;
    border-radius: 5px;
    box-sizing: border-box;
  }
 
 

`

const Tag = styled.span`

    position: absolute;
    right:16px;
    top:50%;
    transform: translateY(-50%);
    color: #FFC9BB;
    cursor: pointer;
  `

function SearchView({bottom,onFocus}) {

    return (
        <>
            <SearchContainer>
                <InputWrap>
                    <input type="text" onFocus={onFocus}/>
                    <Tag>#</Tag>
                    {bottom && <TabMenu /> }
                    <OnChangeMenu />
                </InputWrap>
                <button>검색</button>

            </SearchContainer>
        </>
    )
}
export default SearchView