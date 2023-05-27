import styled from '@emotion/styled';

const AlarmModal = () => {
  return (
    <ModalWrap>
      <ContentsBox>
        <RedRound />
        <TextWrap>
          <TitleWrap>
            <WelcomeImg src='/image/welcome.png' />
            <Title>회원가입을 환영합니다!</Title>
          </TitleWrap>
          <SubTitle>지금 닉네임을 변경하고 활동을 시작해 보세요!</SubTitle>
          <Time>00:00</Time>
        </TextWrap>
        {/* <ArrowWrap> */}
        <Arrow src='/image/alarm-arrow.png' />
        {/* </ArrowWrap> */}
      </ContentsBox>
    </ModalWrap>
  );
};

const ModalWrap = styled.div`
  position: absolute;
  top: 60px;
  z-index: 1000;
  left: -300px;
  width: 400px;
  height: auto;
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid #ff4122;
  justify-content: center;
  display: flex;
  padding: 22px 0px;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

const ContentsBox = styled.div`
  width: 370px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 5% 80% 5%;
  justify-content: space-between;
  align-items: center;
`;

const RedRound = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: #ff4122;
`;

const TextWrap = styled.div`
  display: block;
`;

const TitleWrap = styled.div`
  margin-bottom: 5px;
  display: flex;
`;

const WelcomeImg = styled.img`
  margin-right: 10px;
  width: 20px !important ;
  height: 20px !important ;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const SubTitle = styled.div`
  font-size: 12px;
  color: #838485;
  margin-bottom: 16px;
  text-align: left;
`;

const Time = styled.div`
  font-size: 12px;
  color: #838485;
  text-align: left;
`;

const Arrow = styled.img`
  width: 8px !important ;
  height: 14px !important ;
`;

export default AlarmModal;
