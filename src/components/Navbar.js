import React from "react";
import { Link } from "react-router-dom";
import {
  StyledNavbar,
  StyledNavBrand,
  StyledNavItems,
  StyledLink,
  StyledButton,
} from "../styled/Navbar";
import { Accent } from "../styled/Common";
import { useAuth0 } from "../auth";
export default function Navbar() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <StyledNavbar>
      <StyledNavBrand>
        <Link to="/">
          Learn.Build.<Accent>Type</Accent>
        </Link>
      </StyledNavBrand>
      <StyledNavItems>
        <li>
          <StyledLink to="/">Home</StyledLink>
        </li>
        <li>
          <StyledLink to="/highscores">High Scores</StyledLink>
        </li>
        {!isAuthenticated && (
          <li>
            <StyledButton onClick={loginWithRedirect}>Login</StyledButton>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <StyledButton onClick={logout}>Logout</StyledButton>
          </li>
        )}
      </StyledNavItems>
    </StyledNavbar>
  );
}
