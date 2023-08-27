import styled from "@emotion/styled";
import {mobile} from "../../constants/media/media";

const Button = styled.button`
    cursor: pointer;
    min-width: 90px;
    padding: 10px;
    width: 130px;
    height: 48px;
    background: #FF4122;
    border-radius: 5px;
    border: none;
   
    ${mobile}{
      width:90px;
      height: 48px;
      box-sizing: border-box;
    }

    &:hover {
      background: #ff2704;
    
       
    }
    span {
        color: #ffffff;
        font-size: 16px;
        font-weight: 600;
        letter-spacing: 0.7px;
        font-family: "Pretendard";
    }
`;
function Buttons({ text ,event}) {
    return (
        <>
            <Button onClick={event}>
                <span>{text}</span>
            </Button>
        </>
    );
}
export default Buttons;
