import styled from "@emotion/styled";

const Button = styled.button`
    cursor: pointer;
    min-width: 100px;
    width: auto;
    padding: 10px;
    height: 60px;
    border: 1px solid #222222;
    background: #fff;

    &:hover {
        background: #35c5f0;
        border: none;
        span {
            color: #fff;
        }
    }
    span {
        color: #222222;
        font-size: 16px;
        font-weight: 600;
        letter-spacing: 0.7px;
        font-family: "Pretendard";
    }
`;
function Buttons({ text }) {
    return (
        <>
            <Button>
                <span>{text}</span>
            </Button>
        </>
    );
}
export default Buttons;
