import styled from '@emotion/styled'




function ModalBtn({btn}) {

    return (
          <ModalFooter btn ={btn}>
              {btn.map((item,index) => (
                  <button key={index} onClick={item.onClick}> {item.text}</button>
              ))}
          </ModalFooter>
    )
}
export default  ModalBtn;

const ModalFooter = styled.div`
      width: 100%;
      border-top:1px solid #CED4DA;
      display: flex;
      height: 56px;
      justify-content: center;
      align-items: center;
      position: relative;

      &:before {
        display: ${props => props.btn.length === 1 ?  'none' : 'block'};
        width: 1px;
        height: 56px;
        background:#CED4DA;
        position: absolute;
        top:0;
        left:50%;
        content:"";
      }
      button{
        width: ${props=> props.btn.length === 1 ?  '100%' : '50%'};
        height: 100%;
        border:none;
        background:white;
        border-radius: 10px ;
        color:#5A5C5F;
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
        &:hover {
          color: #FF4122;
        }
      }
    `
