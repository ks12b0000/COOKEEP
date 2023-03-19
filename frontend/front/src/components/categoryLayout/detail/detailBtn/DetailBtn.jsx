import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import styled from '@emotion/styled';
import * as React from "react";
import {useState} from "react";
import Alert from "../../../atomic/modal/Alert";

import {useSelector} from "react-redux";
import {useNavigate} from "react-router";
import categoryHttp from "../../../../http/categoryHttp";



const CategoryHttp = new categoryHttp();
function DetailBtn({board_id}) {

    const [open, setOpen] = useState(false);
    const [openModal,setOpenModal] = useState(false);
    const {userId} = useSelector(state => state.persistedReducer.userReducer);

    const navigation = useNavigate();
    const handleClick = () => {
        setOpen(!open)
    }
    const deleteModal = () => {
        setOpenModal(true);
    }
    const handelModal =() =>{
        setOpenModal(!openModal)
    }
    const deletePost = async () =>{
        try {
            await CategoryHttp.deleteCategoryList(board_id,userId);
            navigation(-1)

        }catch (err){
            alert('잘못된 서버요청입니다.')
        }

    }
    const Props = {
        onClick:deletePost,
        setOpenModal:handelModal,
        text:'정말로 해당 게시글을 삭제하시겠습니까?'
    }
    return(
        <div>
            <IconWrap >
              <IconButton
                aria-label="more"
                id="long-button"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>
                  <MoreVertIcon />
              </IconButton>
            </IconWrap>
            {open &&
                <MenuList>
                    <li onClick={() => console.log('hhhh')}>수정하기</li>
                    <li onClick={deleteModal}>삭제하기</li>
                </MenuList>
            }

            {openModal && <Alert {...Props} />}


        </div>
    )
}

export  default DetailBtn;
const IconWrap = styled.div`
 text-align: right;
  >button{
    width: 30px;
    height: 30px;
    &:hover{
      background:#FF4122;
      color:#ffffff;
    }
  }
`
const MenuList = styled.ul`
  margin-top:10px;
  border-radius: 5px;
  border:1px solid #FF4122;
  justify-content: center;
  display: flex;
  padding:5px;
  gap:5px;
  align-items: center;
  flex-direction: column;
  text-align: center;

  li{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 33px;
    cursor: pointer;
    font-size: 16px;
    line-height: 23px;
    color: #000000;
    &:hover{
      background:#FF4122;
      color:#ffffff;
      border-radius: 5px;
    }
 
  }
  
`