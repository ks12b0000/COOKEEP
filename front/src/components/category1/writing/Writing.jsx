import Header from "../../layout/header/Header";
import styled from "@emotion/styled";
import WritingForm from "./writingForm/WritingForm";

const Container = styled.div`
    display: flex;
    width: 1200px;
    height: 100%;
    margin: 50px auto 0 auto;
`;
const Contents = styled.div`
    width: 100%;
    padding:30px 50px 50px;


`

function Writing(){


    return(
        <>
            <Header/>
            <Container>
                <Contents>
                    <WritingForm />
                </Contents>
            </Container>
        </>
    )
}
export default Writing;