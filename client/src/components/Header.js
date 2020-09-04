import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <HeaderWrapper>
        <Link to="/">
          <PageTitle>SOCIAL INDEX</PageTitle>
        </Link>
        <PageLinks>
          <StyledLink to="/tsx">TSX</StyledLink>
          <StyledLink to="/nyse">NYSE</StyledLink>
        </PageLinks>
      </HeaderWrapper>
      <SpacerDiv />
    </>
  );
};

const HeaderWrapper = styled.div`
  position: fixed;
  height: 100px;
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  background-image: linear-gradient(
    to bottom right,
    var(--lavender),
    var(--mint-green)
  );
`;
const PageLinks = styled.div``;

const PageTitle = styled.h1`
  color: white;
`;

const SpacerDiv = styled.div`
  height: 100px;
  width: 100%;
`;

const StyledLink = styled(Link)`
  margin-left: 20px;
  color: white;
  font-size: 20px;
`;

export default Header;
