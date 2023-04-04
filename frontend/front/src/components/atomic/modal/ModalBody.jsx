import styled from "@emotion/styled";

function ModalBody({icon,text,subText}) {
    return (
        <>
            <ModalContents>
                <ModalIcon>{icon}</ModalIcon>
                <p>{text}</p>
                <SubText>
                    {subText}
                </SubText>
            </ModalContents>
        </>
    )
}
export default ModalBody;



const ModalContents = styled.div`
  display: flex;
  height: 200px;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 120px;
  >p {
    color: #000000;
    font-weight: 700;
    font-size: 16px;
  }
`
const ModalIcon = styled.p`
    img{
      margin-bottom: 17px;
    }
`
const SubText = styled.p`
  padding-top:8px;
  font-weight: 400 !important;
  font-size: 16px;
  line-height: 23px;
  
  color: #838485 !important;


`