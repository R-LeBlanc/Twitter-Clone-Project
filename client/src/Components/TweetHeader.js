import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { format } from "date-fns";

const Header = ({ avatarSrc, displayName, userName, timeStamp }) => {
  //   console.log(format(new Date(timeStamp), "LLL do"));
  let navigate = useNavigate();

  const handleClickProfile = (userName) => {
    // console.log(userName);
    navigate(`/${userName}`);
  };

  return (
    <Wrapper>
      <Avatar src={avatarSrc} />
      <Name>
        <DisplayName
          tabIndex={0}
          onKeyPress={() => handleClickProfile(userName)}
          // might be able to us NavLink here insterad of the onClick
          onClick={() => handleClickProfile(userName)}
        >
          {displayName}
        </DisplayName>
        <Username>@{userName}</Username>
        <TimeStamp>{format(new Date(timeStamp), "LLL do")}</TimeStamp>
      </Name>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.header`
  display: flex;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

const Name = styled.div`
  align-items: center;
  /* background-color: lightpink; */
  flex: 1;
  display: flex;
  height: 50px;
  padding: 0px 10px;
`;

const DisplayName = styled.div`
  font-size: 15px;
  /* line-height: 20px; */
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`;

const LinkComponent = styled(NavLink)``;

const Username = styled.div`
  font-size: 0.8rem;
  /* line-height: 20px; */
  color: rgb(101, 119, 134);
  padding: 0 5px;
`;

const TimeStamp = styled.div`
  color: rgb(101, 119, 134);
  font-size: 0.8rem;
`;
