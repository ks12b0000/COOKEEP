import { useCallback, useMemo } from "react";
import styled from "@emotion/styled";

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
                <li key={num} aria-current={currentPage === idx + 1 ? "page" : null}>
                    <a onClick={() => paginate(num)}>{num}</a>
                </li>
            ))}
            {pageCount.length !== currentPage && (
                <li>
                    <button onClick={() => nextPage()}>{">"}</button>
                </li>
            )}
        </PaginationNav>
    );
};

const PaginationNav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3px;
    li {
        &[aria-current] {
            border: 1px solid #35c5f0;
            font-weight: bold;
            cursor: revert;
            transform: revert;
        }
    }
    button {
        width: 40px;
        height: 40px;
        background: #35c5f0;
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
        font-size: 18px;
        &:hover {
            border: 1px solid #35c5f0;
        }
    }
`;
export default Pagination;