import styled from "@emotion/styled";
import {useState} from "react";
import { NavLink } from "react-router-dom";
import GoodsList from "./GoodsList";
import Popularity from "./Popularity";
import TagSearchList from "./TagSearchList";

function MainSearch({onFocus,isFocus,onClick}) {
   const dummy = [{id:1,text:"추천 검색어"},{id:2,text:"인기 검색어"},{id:3,text:"태그 검색어"}]
    let [btnActive, setBtnActive] = useState("");
    const [goods,setGoods] = useState(true);
    const [popularity,setPopularity] = useState(false);
    const [tags,setTags] = useState(false);


    const toggleActive = (e) => {
        e.target.value === 0 ? setGoods(true) : setGoods(false);
        e.target.value === 1 ? setPopularity(true) : setPopularity(false);
        e.target.value === 2 ? setTags(true) : setTags(false);
        setBtnActive(e.target.value);
    };
    return (
        <>
        <Container>
           <select >
               <option value="1">태그</option>
               <option value="2">제목</option>
           </select>
            <InputBox>
            <input type="text" placeholder="내용을 입력해주세요" onFocus={onFocus}/>
            </InputBox>
            <button>검색</button>
            {isFocus &&

                <ListBox>
                    <nav>
                        {dummy.map((item,idx) => {
                            return (
                                <li key={item.id} value={idx} onClick={toggleActive} className={(idx == btnActive ? " active" : "")}>{item.text}</li>
                            )
                        })}
                    </nav>

                    {goods && <GoodsList />}
                    {popularity && <Popularity />}
                    {tags && <TagSearchList />}

                    <button onClick={onClick}>닫기</button>
                </ListBox>

            }



        </Container>
        </>
    )
}
export default MainSearch;

const Container = styled.div`

  display: flex;
  margin: 45px auto 0 auto;
  background:#ffffff;
  height: 50px;
  width: 738px;
  border: 2px solid #ff7100;
  border-radius: 80px;
  overflow: hidden;
  select{
    width: 150px;
    height: 50px;
    border:none;
    
    text-align: center;
    &:focus{
      outline: none;
    }
  }
  input{
    width: 450px;
    height: 50px;
    padding:0 20px;
    border:none;
    &:focus{
      outline: none;
    }
  }

  button{
    width: 130px;
    height: 100%;
    background:#ff7100;
    border:none;
    color:#ffffff;
    cursor: pointer;
    font-size: 16px !important;
  }
`

const InputBox = styled.div``

const ListBox = styled.div`
  position: absolute;
  
  top:188px;
  left:150px;
  padding:1rem;
  box-sizing: border-box;
  width: 475px;
  height: 300px;
  background:#ffffff;
  box-shadow: 4px 4px 16px rgba(0,0,0,0.2);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  z-index: 10;
  
  
  /*리스트 css 시작*/
  nav {
    display: flex;
    justify-content:center ;
    border-bottom: 1px solid #ccc;
     >li{
      flex-grow: 1;
      height: 30px;
      text-align: center;
      font-size: 16px !important;
      cursor: pointer;
       &.active {
         color: #35c5f0;
         font-weight: 600;

       }
       a{
         color:red;
     
       }
    }
  }
  button{
    position: absolute;
    width: 50px;
    height: 30px;
    right:0;
    bottom:0;
    &:hover {
      background: #222222;
    }
  }
  

`
