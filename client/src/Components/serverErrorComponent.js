import React from "react";
import styled from "styled-components";
import { COLORS } from "../constants";

import { GiBoltBomb } from "react-icons/gi";
import { GiTrashCan } from "react-icons/gi";

const ServerError = () => {
  return (
    <Wrapper>
      <Image />
      <ErrorWrapper>
        <ErrorMessage>An unknown error has occured.</ErrorMessage>
        <SecondaryMessage>
          Please try refreshing the page, or you can speak to our complaint
          department if the problem persists. It's a trash can!
        </SecondaryMessage>
        <TrashImg />
      </ErrorWrapper>
    </Wrapper>
  );
};

export default ServerError;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
`;

const Image = styled(GiBoltBomb)`
  color: ${COLORS.primary};
  font-size: 4rem;
`;

const ErrorWrapper = styled.div`
  padding-top: 50px;
  text-align: center;
`;

const ErrorMessage = styled.div`
  font-size: 2rem;
  padding-bottom: 25px;
`;

const SecondaryMessage = styled.div`
  font-size: 1.5rem;
`;

const TrashImg = styled(GiTrashCan)`
  color: ${COLORS.secondary};
  font-size: 4rem;
  margin-top: 30px;
`;
