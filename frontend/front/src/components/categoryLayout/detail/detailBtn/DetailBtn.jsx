import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import styled from '@emotion/styled';
import * as React from "react";
import {useState} from "react";
import Alert from "../../../atomic/modal/Alert";

import {useSelector} from "react-redux";
import {useNavigate} from "react-router";
import categoryHttp from "../../../../http/categoryHttp";
import {useMediaQuery} from "react-responsive";
import ModalBody from "../../../atomic/modal/ModalBody";
import ModalBtn from "../../../atomic/modal/ModalBtn";


const CategoryHttp = new categoryHttp();

function DetailBtn({board_id}) {

    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const {userId} = useSelector(state => state.persistedReducer.userReducer);
    const isMobile = useMediaQuery({
        query: "(max-width:768px)"
    });
    const navigation = useNavigate();
    const handleClick = () => {
        setOpen(!open)
    }
    const deleteModal = () => {
        setOpenModal(true);
    }
    const handelModal = () => {
        setOpenModal(!openModal)
    }
    const deletePost = async () => {
        try {
            await CategoryHttp.deleteCategoryList(board_id, userId);
            navigation(-1)

        } catch (err) {
            alert('잘못된 서버요청입니다.')
        }

    }

    const Props = {
        setOpenModal: handelModal,
        body: {
            text: '정말로 해당 게시글을 삭제하시겠습니까?',
            icon: (
                <img src={`${process.env.PUBLIC_URL}/image/modal-icon.png`} alt=""/>
            ),
            subText: (
                <>
                    글쓰기 등록을 취소하시면 작성하시면 <br/>
                    작성하신 내용이 전부 삭제됩니다.
                </>
            ),

        },

        buttons: {
            btn: [
                {
                    text: '확인',
                    onClick: deletePost,
                },
                {
                    text: '취소',
                    onClick: handelModal
                }
            ]
        }
    }


    return !isMobile ? (
        <div>
            <IconWrap>
                <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}>
                    <MoreVertIcon/>
                </IconButton>

            </IconWrap>
            {open &&
                <MenuList>
                    <li onClick={() => navigation(`/${board_id}/edit`)}>수정하기</li>
                    <li onClick={deleteModal}>삭제하기</li>
                </MenuList>
            }

            {openModal && <Alert {...Props} />}


        </div>
    ) : (
        <div>
            <IconWrap>
                <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}>
                    <MoreVertIcon/>
                </IconButton>

            </IconWrap>
            {open && (
                <>
                    <ModalBackground onClick={handleClick}/>
                    <ModalContainer>
                        <ul>
                            <li onClick={() => navigation(`/${board_id}/edit`)}>수정하기</li>
                            <li onClick={deletePost}>삭제하기</li>
                            <li onClick={handleClick}>취소</li>
                        </ul>

                    </ModalContainer>
                </>
            )
            }


        </div>
    )
}

export default DetailBtn;


const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 900;
`;

const ModalContainer = styled.div`
  position: fixed;
  bottom:0;
  left:0;
  width: 100%;
  height: 144px;
  border-radius: 10px;
  border-bottom: 1px solid #ced4da;
  background-color: white;
  display: flex;
  flex-direction: column;
  z-index: 1000;
   padding-top:16px;
  ul{
 
    li{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 48px;
      color:  #FF4122;
      /* Button */
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
  }
`;

const IconWrap = styled.div`
  text-align: right;

  > button {
    width: 30px;
    height: 30px;

    &:hover {
      background: #FF4122;
      color: #ffffff;
    }
  }
`
const MenuList = styled.ul`
  position: absolute;
  margin-top: 10px;
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid #FF4122;
  justify-content: center;
  display: flex;
  padding: 5px;
  gap: 5px;
  align-items: center;
  flex-direction: column;
  text-align: center;

  li {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 33px;
    cursor: pointer;
    font-size: 16px;
    line-height: 23px;
    color: #000000;

    &:hover {
      background: #FF4122;
      color: #ffffff;
      border-radius: 5px;
    }

  }

`