import styled from "@emotion/styled";
import {
    mq} from '../../../media/media'
function Search() {
    return(
        <SearchWrap>
            <SearchInput type="text" placeholder="검색"/>
             <SearchImage><img  src={`${process.env.PUBLIC_URL}/image/search.png`} alt ="검색아이콘"/></SearchImage>
        </SearchWrap>
    )
}
export default Search;
const SearchWrap = styled.div`
  position: relative;
  ${mq[0]} {
    display: none;
  }
`
const SearchInput = styled.input`
  width: 580px;
  height: 36px;
  padding:0 10px;
  font-size: 16px !important;
  border:none;
  background: #FFFFFF;
  border-bottom: 1px solid #000000;
  &:focus{
    outline:none;
  }
`
const SearchImage = styled.div  `
  cursor: pointer;
   position:absolute;
   right:0;
   top:50%;
   transform: translateY(-50%);
`