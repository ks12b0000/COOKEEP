import Layout from "../../components/layout/Layout";

import {color} from "../../constants/color";
import CateItem from "../../components/categoryLayout/cateItem/CateItem";
import {Link} from "react-router-dom";
import Buttons from "../../components/atomic/Buttons";
import styled from "@emotion/styled";
import Banner from "../../components/layout/home/banner/Banner";
import {useSelector} from "react-redux";
import { useNavigate } from "react-router";
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

   const Writing =() => {
        if(!isLoggedIn){
        alert('로그인유저가아닙니다');
        navigation('/login');
        return false;
        }
        navigation('writing');

   }
    return(
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
    )
}
export default Category;