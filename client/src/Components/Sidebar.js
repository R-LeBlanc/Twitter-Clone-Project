import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { FiBell } from "react-icons/fi";
import { FiHome } from "react-icons/fi";
import { FiBookmark } from "react-icons/fi";
import { FiUser } from "react-icons/fi";

import { ReactComponent as Logo } from "../assets/logo.svg";
import { COLORS } from "../constants";

const Sidebar = () => {
  return (
    <Wrapper>
      <LogoWrapper>
        <LogoComponent />
      </LogoWrapper>

      <LinkComponent to="/">
        <FiHome style={{ marginRight: "20px" }} /> Home
      </LinkComponent>

      <LinkComponent to="/profile/abc">
        <FiUser style={{ marginRight: "20px" }} />
        Profile
      </LinkComponent>

      <LinkComponent to="/notifications">
        <FiBell style={{ marginRight: "20px" }} />
        Notifications
      </LinkComponent>

      <LinkComponent to="Bookmarks">
        <FiBookmark style={{ marginRight: "20px" }} /> Bookmarks
      </LinkComponent>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: lightblue;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 200px;
  margin: 0 20px 0 100px;
`;

const LogoWrapper = styled.div`
  padding: 30px 0 15px;
`;

const LogoComponent = styled(Logo)`
  height: 45px;
  position: relative;
  right: 15px;
`;

const LinkComponent = styled(NavLink)`
  border-radius: 30px;
  display: flex;
  font-weight: bold;
  padding: 15px 0 15px 15px;

  &:first-child {
    padding-right: 50px;
  }

  &:hover {
    background-color: #e8deff;
    color: ${COLORS.primary};
  }

  &.active {
    color: ${COLORS.primary};
  }
`;

export default Sidebar;
