import styled from "styled-components";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { changePage } from "../../features/quiz/searchQuizSlice";
const Pagination = () => {
  const { totalPages, currentPage } = useSelector((store) => store.searchQuiz);

  const dispatch = useDispatch();
  const pages = Array.from({ length: totalPages }, (_, index) => {
    return index + 1;
  });
  const nextPage = () => {
    let newPage = currentPage + 1;
    if (newPage > totalPages) {
      newPage = 1;
    }
    dispatch(changePage(newPage));
  };
  const prevPage = () => {
    let newPage = currentPage - 1;
    if (newPage < 1) {
      newPage = totalPages;
    }
    dispatch(changePage(newPage));
    return (
      <Wrapper>
        <button type="button" className="prev-btn" onClick={prevPage}>
          <HiChevronDoubleLeft />
          prev
        </button>
        <div className="btn-container">
          {pages.map((pageNumber) => {
            return (
              <button
                type="button"
                key={pageNumber}
                className={
                  pageNumber === currentPage ? "pageBtn active" : "pageBtn"
                }
                onClick={() => dispatch(changePage(pageNumber))}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>
        <button type="button" className="next-btn" onClick={nextPage}>
          next
          <HiChevronDoubleRight />
        </button>
      </Wrapper>
    );
  };
};

const Wrapper = styled.section`
  height: 6rem;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: end;
  flex-wrap: wrap;
  gap: 1rem;
  .btn-container {
    background: #dbeafe;
    border-radius: 0.25rem;
  }
  .pageBtn {
    background: transparent;
    border-color: transparent;
    width: 50px;
    height: 40px;
    font-weight: 700;
    font-size: 1.25rem;
    color: #627d98;
    transition: 0.3s ease-in-out all;
    border-radius: 0.25rem;
    cursor: pointer;
  }
  .active {
    background: #627d98;
    color: #fff;
  }
  .prev-btn,
  .next-btn {
    width: 100px;
    height: 40px;
    background: #fff;
    border-color: transparent;
    border-radius: 0.25rem;
    color: #3b82f6;
    text-transform: capitalize;
    letter-spacing: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: 0.3s ease-in-out all;
  }
  .prev-btn:hover,
  .next-btn:hover {
    background: var(--primary-500);
    color: var(--white);
  }
`;
export default Pagination;
