import styled from "styled-components";
import InputBasic from "../../inputComponents/InputBasic";
import InputSelect from "../../inputComponents/InputSelect";
import { useDispatch, useSelector } from "react-redux";
import { handleChange } from "../../../features/user/searchUserSlice";
const SearchUser = () => {
  const dispatch = useDispatch();
  const {
    role1,
    searchTypeOptions,
    sortOptions,
    roleOptions,
    searchType,
    sort,
    search,
  } = useSelector((store) => store.searchUser);
  const handleSearch = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };
  return (
    <Wrapper>
      <form className="form">
        <h4>Search User</h4>
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
            id="role"
            labelText="Roles"
            name="role1"
            value={role1}
            handleChange={handleSearch}
            list={["All", ...roleOptions]}
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
            // disabled={isLoading}
            // onClick={handleSubmit}
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
export default SearchUser;
