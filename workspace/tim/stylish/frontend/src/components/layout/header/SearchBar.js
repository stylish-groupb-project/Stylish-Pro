import styled from 'styled-components';
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import SearchImage from "../../../assets/images/search.png";
import HoveredSearchImage from "../../../assets/images/search-hover.png";

const Form = styled.form``;

const Label = styled.label`
  position: relative;
`;

const Input = styled.input`
  border-radius: 1.25rem;
  border: 1px solid #979797;
  padding: 0.625rem 0.75rem;
  font-size: 1.25rem;
  color: #8B572A;
  font-family: sans-serif;
  width: 100%;
  max-width: 13.375rem; /* for larger screens */
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  position: absolute;
  right: 0.25rem;
  cursor: pointer;
  border: none;
  background: none;
`;

const SearchIcon = styled.img`
  display: block;
`;

const HoveredSearchIcon = styled(SearchIcon)`
  display: none;
  ${Button}:hover & {
    display: block;
  }
`;

function SearchBar() {
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  const productSearchHandler = (event) => {
    event.preventDefault();
    navigate(`/?search=${searchInputRef.current.value}`);
  };

  return (
    <Form onSubmit={productSearchHandler}>
      <Label htmlFor="searchInput">
        <Input
          ref={searchInputRef}
          placeholder="搜尋"
          type="text"
          name="search"
          required
        />
        <Button type="submit" data-testid="search-button">
          <SearchIcon src={SearchImage} alt="search-icon" />
          <HoveredSearchIcon src={HoveredSearchImage} alt="hover-search-icon" />
        </Button>
      </Label>
    </Form>
  );
}

export default SearchBar;
