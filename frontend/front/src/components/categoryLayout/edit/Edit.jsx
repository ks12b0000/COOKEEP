
import styled from "@emotion/styled";
import Layout from "../../layout/Layout";
import EditForm from "./edit-form/EditForm";

const Container = styled.div`
  display: flex;
  width: 1440px;
  border:1px solid #FFA590;
  border-radius: 10px;
  height: 100%;
  margin: 24px auto ;
`;
const Contents = styled.div`
    width: 100%;
    padding:24px;


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
