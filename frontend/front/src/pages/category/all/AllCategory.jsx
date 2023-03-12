
import Layout from "../../../components/layout/Layout";
import {useState} from "react";
import {Link} from "react-router-dom";
import Buttons from "../../../components/atomic/Buttons";
import styled from "@emotion/styled";
import {color} from "../../../constants/color";
import CateItemAll from "./CateItemAll";
const Container = styled.section`
  width: 1440px;
  margin: 24px auto 16px;
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

    return (
        <>
            <Layout>
                <Container>
                    <Category1Title>
                        <h1>전체</h1>
                        <CateItemAll  />
                        <ButtonWrap>
                            <div>
                                <Link to="writing">
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