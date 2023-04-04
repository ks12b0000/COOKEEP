import styled from "@emotion/styled";
import ModalBtn from "./ModalBtn";
import ModalBody from "./ModalBody";
function Alert({ setOpenModal,buttons,body }) {

    return (
        <>
        <ModalBackground  onClick={setOpenModal} />
            <ModalContainer>
                <ModalBody {...body} />
                {buttons && <ModalBtn  {...buttons} /> }
            </ModalContainer>
        </>

    );
}
export default Alert;

const ModalBackground = styled.div`
  top:0;
  left:0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0,.3);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`
const ModalContainer = styled.div`
  position: fixed;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  width: 500px;
  height: 256px;
  border-radius: 10px;
  border-bottom: 1px solid #CED4DA;
  background-color: white;
  display: flex;
  flex-direction: column;

  z-index: 1000;
`



