import React from "react";
import styled from "styled-components";
import Header from "./Header";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      {" "}
      <Header />
      <PageDiv>
        <InputSection>
          <PageTitle>View Recommendations for stocks on the:</PageTitle>
          <Links>
            <StyledLink to="/tsx">TSX</StyledLink>
            <StyledLink to="/nyse">NYSE</StyledLink>
          </Links>
        </InputSection>
      </PageDiv>
    </>
  );
};

const InputSection = styled.div`
  border: 1px solid var(--lavender);
  border-radius: 20px;
  padding: 20px;
  margin: 10px 0;
  box-shadow: 2px 2px 5px 2px var(--mint-green);
`;

const Links = styled.div`
  margin: 20px;
  display: flex;
  justify-content: center;
`;

const PageDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 100px);
`;

const PageTitle = styled.h2`
  margin-bottom: 10px;
  text-align: center;
`;

const StyledLink = styled(Link)`
  margin: 10px;
  padding: 20px;
  background-color: var(--forest-green);
  color: white;
  border: none;
  outline: none;
  border-radius: 5px;
  &:hover {
    background-color: var(--mint-green);
    color: var(--forest-green);
    cursor: pointer;
    transform: scale(1.05);
  }
  &:focus {
    border: 1px solid var(--lavender);
    background-color: var(--mint-green);
    color: var(--forest-green);
  }
`;

export default Home;
