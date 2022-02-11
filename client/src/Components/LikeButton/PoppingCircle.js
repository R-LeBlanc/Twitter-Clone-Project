import React from "react";
import styled, { keyframes } from "styled-components";

// Created keyframes that will be use in the styled component
const opacity = keyframes`
from{
    opacity: 1
}
to {
    opacity: 0
}
`;
const scale = keyframes`
from{
    transform: scale(0)
}
to{
    transform: scale(100%)
}
`;

const PoppingCircle = ({ size, color }) => {
  return <Wrapper></Wrapper>;
};

const Wrapper = styled.div`
  /* can only hav one animation effect, if there's more
it'll only use the last one */
  animation: ${scale} 300ms forwards, ${opacity} 500ms forwards;
  background-color: #e790f7;
  border-radius: 100%;
  display: inline-block;
  position: absolute;
  height: 100%;
  width: 100%;
`;

export default PoppingCircle;
