
import styled from "@emotion/styled";
import Layout from "../../layout/Layout";
import EditForm from "./edit-form/EditForm";
import {mobile} from "../../../constants/media/media";

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1440px;
  border:1px solid #FFA590;
  border-radius: 10px;
  height: 100%;
  margin: 24px auto ;
 ${mobile} {
   margin:65px auto 20px;
   border:none;
 } 
`;
const Contents = styled.div`
    width: 100%;
    padding:24px;
  ${mobile} {
    padding:16px;
  }


`
function Edit() {





    return (
        <>
          <Layout>
            <Container>
                <Contents>
                <EditForm/>
                </Contents>
            </Container>
          </Layout>
        </>
    );
}
export default Edit;
