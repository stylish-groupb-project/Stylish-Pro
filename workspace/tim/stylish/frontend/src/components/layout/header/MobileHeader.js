import styled from 'styled-components';
import { useState } from "react";
import SearchBar from "./SearchBar";

import Logo from "../../../assets/images/logo.png";
import Search from "../../../assets/images/search.png";

const Header = styled.header`
  position: fixed;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: column;
  background-color: white;
`;

const LogoContainer = styled.div`
  padding: 0.875rem 0;
  display: flex;
  align-items: center;
`;

const LogoLink = styled.a`
  margin: auto;
`;

const SearchButton = styled.button`
  position: fixed;
  border: none;
  background: none;
  right: 3%;
  top: 0.25rem;
`;

const SearchContainer = styled.div`
  padding: 0.625rem;
  background-color: white;
`;

const NavLink = styled.a`
  width: 33.3333%;
  font-size: 1.25rem;
  font-family: sans-serif;
  text-align: center;
  color: #828282;
  font-weight: normal;
  text-decoration: none;
  border-right: 1px solid #808080;
  &:hover {
    color: brown;
  }
  &:active {
    color: white;
  }

  &:last-child {
    border-right: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  width: 100%;
  background-color: #313538;
  padding: 0.75rem 0;
`;

function MobileHeader() {
  const [searching, setSearching] = useState(false);

  return (
    <Header>
      <LogoContainer>
        <LogoLink href="/">
          <img src={Logo} alt="logo" width={129} height={24} />
        </LogoLink>
        <SearchButton onClick={() => setSearching(!searching)}>
          <img src={Search} alt="search-icon" width={40} height={40} />
        </SearchButton>
      </LogoContainer>
      {searching && (
        <SearchContainer>
          <SearchBar />
        </SearchContainer>
      )}
      <Nav>
        <NavLink href="/women">女裝</NavLink>
        <NavLink href="/men">男裝</NavLink>
        <NavLink href="/accessories" style={{ borderRight: 'none' }}>配件</NavLink>
      </Nav>
    </Header>
  );
}

export default MobileHeader;
