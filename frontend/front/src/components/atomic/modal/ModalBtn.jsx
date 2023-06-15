import styled from '@emotion/styled';

function ModalBtn({ btn }) {
  return (
    <ModalFooter btn={btn}>
      {btn.map((item, index) => (
        <button key={index} onClick={item.onClick}>
          {' '}
          {item.text}
        </button>
      ))}
    </ModalFooter>
  );
}
export default ModalBtn;

const ModalFooter = styled.div`
  width: 100%;
  border-top: 1px solid #ced4da;
  display: flex;
  height: 56px;
  justify-content: center;
  align-items: center;
  position: relative;

  &:before {
    display: ${props => (props.btn.length === 1 ? 'none' : 'block')};
    width: 1px;
    height: 56px;
    background: #ced4da;
    position: absolute;
    top: 0;
    left: 50%;
    content: '';
  }
  button {
    width: ${props => (props.btn.length === 1 ? '100%' : '50%')};
    height: 100%;
    border: none;
    background: white;
    border-radius: 10px;
    color: #5a5c5f;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    &:hover {
      color: #ff4122;
    }
  }

  @media screen and (max-width: 768px) {
    height: 50px;

    &:before {
      height: 47px;
    }
  }
`;
