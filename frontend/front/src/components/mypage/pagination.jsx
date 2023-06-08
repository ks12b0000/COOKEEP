import styled from '@emotion/styled';
import { useState } from 'react';

const Pagination = ({ handlePagination, Page, SelectedButton }) => {
  //넘버 버튼으로 페이지 불러오기
  const pageList = pageNum => {
    handlePagination(pageNum);
  };

  //left arrow 버튼으로 페이지 불러오기
  const leftList = () => {
    if (SelectedButton > 0) {
      handlePagination(prev => prev - 1);
    }
  };

  //right arrow 버튼으로 페이지 불러오기
  const rightList = () => {
    if (SelectedButton < Page.length - 1) {
      handlePagination(prev => prev + 1);
    }
  };

  //첫 페이지로 이동
  const firstList = () => {
    if (SelectedButton > 0) {
      handlePagination(0);
    }
  };

  //마지막 페이지로 이동
  const lastList = () => {
    if (SelectedButton < Page.length - 1) {
      handlePagination(Page.length - 1);
    }
  };

  return (
    <Nav>
      {SelectedButton > 0 && (
        <Button onClick={() => firstList()}>
          <DoubleArrow url='/image/double-arrow-left.png' />
        </Button>
      )}
      <Button onClick={() => leftList()}>
        <Arrow url='/image/arrow-left.png' />
      </Button>
      {Page.map((page, i) => (
        <Button
          key={i}
          onClick={() => pageList(page)}
          aria-current={page === SelectedButton ? 'true' : null}
        >
          {page + 1}
        </Button>
      ))}
      <Button onClick={() => rightList()}>
        <Arrow url='/image/arrow-right.png' />
      </Button>
      {SelectedButton < Page.length - 1 && (
        <Button onClick={() => lastList()}>
          <DoubleArrow url='/image/double-arrow-right.png' />
        </Button>
      )}
    </Nav>
  );
};

//페이지네이션
const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  border: 1px solid #cbcbcb;
  position: relative;
  top: 0;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  background: white;
  color: #cbcbcb;
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
    border: 1px solid #cbcbcb;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: #ff4122;
    border: 1px solid #ff4122;
    color: white;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

const Arrow = styled.div`
  width: 8px;
  height: 14px;
  background: url(${props => props.url});
  background-size: 8px;
`;

const DoubleArrow = styled.div`
  width: 14px;
  height: 12px;
  background: url(${props => props.url});
  background-size: 14px;
`;

export default Pagination;
