import { useCallback, useMemo } from "react";
import styled from "@emotion/styled";
import {color} from "../../../constants/color";

const Pagination = ({ showPost, totalPost, currentPage, prevPage, nextPage, paginate }) => {
    const numbersPage = Math.ceil(totalPost / showPost);

    const numberCalculator = useCallback(
        (numbersPage) => {
            const pageNumbers = [];
            for (let i = 1; i <= numbersPage; i++) {
                pageNumbers.push(i);
            }
            return pageNumbers;
        },
        [numbersPage]
    );
    const pageCount = useMemo(() => numberCalculator(numbersPage), [numbersPage]);

    return (
        <PaginationNav>
            {currentPage !== 1 && (
                <li>
                    <button onClick={() => prevPage()}>{"<"}</button>
                </li>
            )}
            {pageCount.map((num, idx) => (
                <Num key={num} aria-current={currentPage === idx + 1 ? "page" : null}>
                    <a onClick={() => paginate(num)}>{num}</a>
                </Num>
            ))}
            {pageCount.length !== currentPage && (
                <li>
                    <button onClick={() => nextPage()}>{">"}</button>
                </li>
            )}
        </PaginationNav>
    );
};
const Num = styled.li`
  border: 1px solid  #CBCBCB;

  border-radius: 5px;
  a{
    color: #CBCBCB;
  }
  
  
`

const PaginationNav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    padding:20px;
    gap: 3px;
    li {
        &[aria-current] {
            border: 1px solid ${color.main};
            font-weight: bold;
            cursor: revert;
            transform: revert;
            background: #FF4122;
            border-radius: 5px;
             a{
               color: #ffffff;
             }
        }
    }
    button {
        width: 40px;
        height: 40px;
        background: #FF4122;
        border-radius: 5px;
        color: #ffffff;
        border: none;
        cursor: pointer;
    }
    a {
        display: inline-block;
        width: 40px;
        height: 40px;
        cursor: pointer;
        text-align: center;
        line-height: 40px;
        font-size: 14px;
      
        &:hover {
          background: #FF4122;
          color:#ffffff;
        
        }
    }
`;
export default Pagination;