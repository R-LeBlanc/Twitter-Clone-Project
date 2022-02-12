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
import { CurrentUserContext } from "./CurrentUserContext";

const Sidebar = () => {
  const {
    state,
    actions: { recieveUserInfoFromServer },
  } = React.useContext(CurrentUserContext);
  // console.log(state.currentUser.handle);

  return (
    <Wrapper>
      <SecondaryWrapper>
        <LogoWrapper>
          <LogoComponent />
        </LogoWrapper>

        <LinkComponent to="/">
          <FiHome style={{ marginRight: "20px" }} /> Home
        </LinkComponent>

        <LinkComponent to={`/${state.currentUser.handle}`}>
          <FiUser style={{ marginRight: "20px" }} />
          Profile
        </LinkComponent>

        <LinkComponent to="/notifications">
          <FiBell style={{ marginRight: "20px" }} />
          Notifications
        </LinkComponent>

        <LinkComponent to="bookmarks">
          <FiBookmark style={{ marginRight: "20px" }} /> Bookmarks
        </LinkComponent>

        <Meow>
          <p>Meow</p>
        </Meow>
      </SecondaryWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 200px;
  min-width: 200px;
  margin: 0 20px 0 100px;
  padding-right: 20px;
`;

const SecondaryWrapper = styled.div`
  position: fixed;
  width: 170px;
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
    background-color: ${COLORS.primaryLight};
    color: ${COLORS.primary};
  }

  &.active {
    color: ${COLORS.primary};
  }
`;

const Meow = styled.div`
  /* background-color: ${COLORS.primary}; */
  background-image: linear-gradient(
    45deg,
    ${COLORS.primary},
    ${COLORS.secondary}
  );
  border-radius: 30px;
  color: white;
  display: flex;
  font-weight: bold;
  justify-content: center;
  margin-top: 20px;
  padding: 15px 0;
`;

export default Sidebar;
