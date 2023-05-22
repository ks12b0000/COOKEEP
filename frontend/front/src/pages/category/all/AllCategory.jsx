
import Layout from "../../../components/layout/Layout";
import {useState} from "react";
import {Link} from "react-router-dom";
import Buttons from "../../../components/atomic/Buttons";
import styled from "@emotion/styled";
import {color} from "../../../constants/color";
import CateItemAll from "./CateItemAll";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";
const Container = styled.section`
  width: 1440px;
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
function AllCategory() {
    const {isLoggedIn} = useSelector(state => state.persistedReducer.userReducer);
    const navigation = useNavigate()

    const Writing =() => {
        if(!isLoggedIn){
            alert('로그인유저가아닙니다');
            navigation('/login');
            return false;
        }
        navigation('writing');

    }
    return (
        <>
            <Layout>
                <Container>
                    <Category1Title>
                        <h1>전체</h1>
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
        </>
    );
}
export  default AllCategory;