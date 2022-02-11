import React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

const ScaleIn = ({ children }) => {
  const style = useSpring({
    transform: `scale(100%)`,
    from: {
      transform: `scale(1%)`,
    },
    config: {
      tension: 400,
      friction: 25,
      mass: 3,
    },
  });

  return <animated.div style={style}>{children}</animated.div>;
};

export default ScaleIn;
