import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 110px;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 5px solid #f3f3f3;
  border-top-color: #ff4122;
  border-radius: 50%;
  animation: ${spinAnimation} 1s linear infinite;
`;

function LoadingAnimation() {
  return (
    <Container>
      <Spinner />
    </Container>
  );
}

export default LoadingAnimation;
