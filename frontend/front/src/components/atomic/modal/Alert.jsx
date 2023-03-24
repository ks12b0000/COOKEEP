import styled from "@emotion/styled";
function    Alert({ setOpenModal,onClick,text }) {
    return (
        <>
        <ModalBackground  onClick={setOpenModal}>
        </ModalBackground>
            <ModalContainer>
                <TitleCloseBtn>
                    <button
                        onClick={setOpenModal}
                    >
                        X
                    </button>
                </TitleCloseBtn>
                <Title>
                    <h1>알림창</h1>
                </Title>
                <ModalBody>
                    <p>{text}</p>
                </ModalBody>
                <ModalFooter>
                    <button
                        onClick={setOpenModal}
                        id="cancelBtn"
                    >
                        취소
                    </button>
                    <button onClick={onClick}>확인</button>
                </ModalFooter>
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
`
const ModalContainer = styled.div`
  position: fixed;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  width: 400px;
  max-height: 500px;
  border-radius: 5px;
  border: 1px solid  #FF4122;
  background-color: white;
  box-shadow: 0px 4px 12px  rgba(255,65,34,.15);
  display: flex;
  flex-direction: column;
  padding: 0 25px 15px ;
  z-index: 1000;
`

const  Title =styled.div`
 padding:15px 0;
  display: inline-block;
  text-align: left;
  border-bottom: 1px solid #FF4122;
  
  h1{
    font-size: 18px;
  }
`

const TitleCloseBtn = styled.div`
  position: absolute;
  right:20px;
  top:15px;
  button{
    width: 25px;
    height: 25px;   
    background-color: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color:#FF4122;

    &:hover{
      display: block;
      width: 25px;
      height: 25px;
      color:#222222;
   
    }
  }
`
const ModalBody = styled.div`
  flex: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 120px;
  >p {
    color: #FF4122;
    font-size: 16px;
  }
`

const ModalFooter = styled.div`
  flex: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  
  button{
    width: 100px;
    height: 40px;
    margin: 10px;
    background-color: white;
    color: #FF4122;
    border:1px solid  #FF4122;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    
    &:hover{
      background: #FF4122;
      color:#ffffff;
    }
  }
  
  `