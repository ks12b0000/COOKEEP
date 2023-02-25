import styled from "@emotion/styled";
import Category from "../Category";
import Quill from "../../../components/categoryLayout/writing/Quill";


const Container = styled.section`
  width: 1200px;
  margin: 100px auto 0;


`;
const Category1Title = styled.div`
    padding: 50px;
    h1 {
        font-size: 24px;
        font-weight: 600;
    }
`;
const ButtonWrap = styled.div`
    display: flex;
    justify-content: end;
`;

function Vegan() {

    const Props ={
        title:'비건 컨텐츠',
        categoryName:'비건'
    }
    return (
        <>

            <Category {...Props} />
        </>
    );
}
export default Vegan;
