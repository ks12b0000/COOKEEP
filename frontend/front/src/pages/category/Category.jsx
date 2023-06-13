import Layout from "../../components/layout/Layout";

import {color} from "../../constants/color";
import CateItem from "../../components/categoryLayout/cateItem/CateItem";
import {Link} from "react-router-dom";
import Buttons from "../../components/atomic/Buttons";
import styled from "@emotion/styled";
import Banner from "../../components/layout/home/banner/Banner";
import {useSelector} from "react-redux";
import { useNavigate } from "react-router";
import {useState} from "react";
import AlertLogin from "../../components/categoryLayout/writing/popup/LoginPopup";
const Container = styled.section`
  width: 1440px;
  min-height: 800px;
  margin: 24px auto 16px;
  @media screen and (max-width: 1700px) {
       width: 1300px;
    }
`;
const Category1Title = styled.div`
  padding-top:10px;
    h1 {
      font-weight: 700;
      font-size: 24px;
      color: ${color.main}

    }
`;
const ButtonWrap = styled.div`
    display: flex;
    justify-content: end;
`;
function Category({title,categoryName}){

    const {isLoggedIn} = useSelector(state => state.persistedReducer.userReducer);
    const navigation = useNavigate()
    const [loginModal,setIsLoginModal] = useState(false);
    const Writing =() => {
        if(!isLoggedIn) {
            setIsLoginModal(true);
            return false;
        }
        navigation('writing');
    }


    const Props = {

        Cancel:{
            setOpenModal:() => setIsLoginModal(false),
            body:{
                text:'로그인 후 이용 가능합니다.',
                icon:(
                    <img src={`${process.env.PUBLIC_URL}/image/modal-icon.png`} alt=""/>
                ),

            },
            buttons:{
                btn:[
                    {
                        text:'취소',
                        onClick:() => setIsLoginModal(false)
                    },
                    {
                        text:'로그인',
                        onClick:() => {
                            navigation('/login');
                            return false;
                        }
                    },
                ]
            }
        },
    }
    return(
        <>
        <Layout>
            <Container>
                <Category1Title>
                    <h1>{title}</h1>
                    <CateItem cateItemName={categoryName}/>
                    <ButtonWrap>
                        <div onClick={Writing}>
                            <Link>
                                <Buttons text="글쓰기" />
                            </Link>
                        </div>
                    </ButtonWrap>
                </Category1Title>
            </Container>
        </Layout>
            {loginModal && <AlertLogin {...Props}/>}
        </>
    )
}
export default Category;