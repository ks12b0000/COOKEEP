
import styled from "@emotion/styled";
import Layout from "../../layout/Layout";
import EditForm from "./edit-form/EditForm";

const Container = styled.article`
    width: 1100px;
    margin: 100px auto 0;
`;
function Edit() {





    return (
        <>
          <Layout>
            <Container>
                <EditForm/>
            </Container>
          </Layout>
        </>
    );
}
export default Edit;
