import InputBasic from "../input/InputBasic";
import InputSelect from "../input/InputSelect";
import styled from "styled-components";
import { Zoom } from "react-toastify";
const SearchContainer = () => {
  const handleSearch = () => {};

  return (
    <Wrapper>
      <form className="form">
        <h4>Search form</h4>
        <div className="form-center">
          <InputSelect
            labelText="Type"
            name="searchStatus"
            value="haha"
            handleChange={handleSearch}
            list={[1, 3, 4, 5, 6]}
          />
          <InputSelect
            labelText="Sort"
            name="searchStatus"
            value="haha"
            handleChange={handleSearch}
            list={["A - Z", "Z - A"]}
          />
          <InputBasic
            type="text"
            name="search"
            value="huhu"
            handleChange={handleSearch}
          />
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
