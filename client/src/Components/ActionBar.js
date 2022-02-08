import React from "react";
import styled from "styled-components";

import { FiMessageCircle } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
import { FiShare } from "react-icons/fi";
import { FiRepeat } from "react-icons/fi";

const ActionBar = () => {
  return (
    <Wrapper>
      <FiMessageCircle />
      <FiRepeat />
      <FiHeart />
      <FiShare />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 35px;
`;

export default ActionBar;
