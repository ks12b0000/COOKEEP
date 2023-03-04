import styled from '@emotion/styled';

function Pagination({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);

  return (
    <>
      <Nav>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          <Arrow url='/image/arrow-left.png' />
        </Button>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? 'page' : null}
            >
              {i + 1}
            </Button>
          ))}
        <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          <Arrow url='/image/arrow-right.png' />
        </Button>
      </Nav>
    </>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  border: 1px solid #CBCBCB;
  position: relative;
  top: 0;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  background: white;
  color: #CBCBCB;
  font-size: 1rem;
  transition: 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
    transform: translateY(-3px);
  }

  &[disabled] {
    background: white;
    border: 1px solid #CBCBCB;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: #FF4122;
    border: 1px solid #FF4122;
    color: white;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

const Arrow = styled.div`
  width: 8px;
  height: 14px;
  background: url(${props=>props.url});
  background-size: 8px;
`



export default Pagination;
