import styled from "@emotion/styled";
import {Button} from "@mui/material";
import {useEffect, useState} from "react";
import SearchHttp from "../../http/searchHttp";

const SearchContainer = styled.div`
  width: 1400px;
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
  span{
    position: absolute;
    right:16px;
    top:50%;
    transform: translateY(-50%);
    color: #FFC9BB;
    cursor: pointer;
  }
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
const client = new SearchHttp();
function SearchView() {
    const [data,setData] = useState();
    const body ={   keyword: "김치"}
    useEffect(() => {
        ( async () =>{
            try {
                const res = await client.getTopList();
                console.log(res);

            }
            catch (err){
                throw err;
            }
        })()
    })
    return (
        <>
            <SearchContainer>
                <InputWrap>
                    <input type="text"/>
                    <span>#</span>
                </InputWrap>
                <button>검색</button>
            </SearchContainer>
        </>
    )
}
export default SearchView