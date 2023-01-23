import styled from "@emotion/styled";
const Wrap = styled.div`
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
`;
function IsNonData({ text }) {
    return <Wrap>{text}</Wrap>;
}
export default IsNonData;
