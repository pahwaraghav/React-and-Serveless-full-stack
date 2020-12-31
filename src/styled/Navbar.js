import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledNavbar = styled.nav`
  display: grid;
  @media (min-width: 601px) {
    grid-template-columns: 1fr auto;
  }
  @media (max-width: 600px) {
    grid-template-rows: 1fr 1fr;
    grid-gap: 1.5rem;
  }
  padding: 20px;
`;

export const StyledNavBrand = styled.div`
  font-size: 1.6rem;
  text-align: left;

  & > a {
    text-decoration: none;
  }
`;

export const StyledNavItems = styled.ul`
  list-style-type: none;
  padding-left: 0;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1.5rem;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 1.2rem;
  transition: color 200ms;
  &:hover {
    color: #e16365;
  }
`;

export const StyledButton = styled.button`
  border: none;
  background: inherit;
  font-size: 1.1rem;
  padding: 0;
  cursor: pointer;
  transition: color 200ms;
  &:hover {
    color: #e16365;
  }
`;
