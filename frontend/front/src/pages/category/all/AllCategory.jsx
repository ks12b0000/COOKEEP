
import Layout from "../../../components/layout/Layout";
import {useState} from "react";
import {Link} from "react-router-dom";
import Buttons from "../../../components/atomic/Buttons";
import {mobile} from "../../../constants/media/media";
import styled from "@emotion/styled";
import {color} from "../../../constants/color";
import CateItemAll from "./CateItemAll";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";
import AlertLogin from "../../../components/categoryLayout/writing/popup/LoginPopup";
const Container = styled.section`
  width: 1440px;
  margin: 24px auto 16px;

  @media screen and (max-width: 1700px) {
       width: 1300px;
  }
  
  ${mobile}{
    margin:89px auto 16px;
    width: 100vw;
    padding: 0 16px;
    box-sizing: border-box;
  }
  
  
`;
const Category1Title = styled.div`
    padding-top:10px;

    h1 {
      font-weight: 700;
      font-size: 24px;
      color: ${color.main};
      
      ${mobile}{
        font-size: 18px;
        line-height: 15px;

      }

    }
`;
const ButtonWrap = styled.div`
    display: flex;
    justify-content: end;
`;
function AllCategory() {
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
    return (
        <>
            <Layout>
                <Container>
                    <Category1Title>
                        <CateItemAll  />
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
    );
}
export  default AllCategory;