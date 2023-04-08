import styled from "@emotion/styled";
import WritingForm from "./writingForm/WritingForm";
import Layout from "../../layout/Layout";

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

function Writing(){


    return(
        <>
          <Layout>
            <Container>
              <Contents>
                <WritingForm />
              </Contents>
            </Container>
          </Layout>
        </>
    )
}
export default Writing;