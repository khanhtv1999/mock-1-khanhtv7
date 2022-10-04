import InputBasic from "../input/InputBasic";
import InputSelect from "../input/InputSelect";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  handleChange,
  clearFilters,
} from "../../features/quiz/searchQuizSlice";
const SearchContainer = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    searchTypeOptions,
    sortOptions,
    searchType,
    sort,
    search,
  } = useSelector((store) => store.searchQuiz);

  const handleSearch = (e) => {
    if (isLoading) return;
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearFilters());
  };

  return (
    <Wrapper>
      <form className="form">
        <h4>Search form</h4>
        <div className="form-center">
          <InputSelect
            id="type"
            labelText="searchType"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={[...searchTypeOptions]}
          />
          <InputSelect
            id="sort"
            labelText="Sort"
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={[...sortOptions]}
          />
          <InputBasic
            type="text"
            name="search"
            value={search}
            handleChange={handleSearch}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .form {
    width: 100%;
    max-width: 100%;
  }
  .form-input,
  .form-select,
  .btn-block {
    height: 35px;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2rem;
    row-gap: 0.5rem;
  }
  h5 {
    font-weight: 700;
  }
  .btn-block {
    align-self: end;
    margin-top: 1rem;
  }
  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .btn-block {
      margin-top: 0;
    }
  }
`;
export default SearchContainer;
