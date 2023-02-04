import styled from "@emotion/styled";
function Alert({ setOpenModal,onClick,text }) {
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
  border-radius: 12px;
  background-color: white;
  box-shadow:0 5px 15px rgba(0, 0, 0, 0.35) ;
  display: flex;
  flex-direction: column;
  padding: 0 25px 25px ;
  z-index: 1000;
`

const  Title =styled.div`
 padding:15px 0;
  display: inline-block;
  text-align: left;
 border-bottom: 1px solid  #ccc;
  
  h1{
    font-size: 18px;
  }
`

const TitleCloseBtn = styled.div`
  position: absolute;
  right:25px;
  top:13px;
  button{
    background-color: transparent;
    border: none;
    font-size: 22px;
    cursor: pointer;
  }
`
const ModalBody = styled.div`
  flex: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 150px;
  >p {
  
    font-size: 18px;
  }
`

const ModalFooter = styled.div`
  flex: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  
  button{
    width: 120px;
    height: 50px;
    margin: 10px;
    background-color: white;
    color:#222;
    border:1px solid #ccc;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    
    &:hover{
      background:black;
      color:#ffffff;
    }
  }
  
  `