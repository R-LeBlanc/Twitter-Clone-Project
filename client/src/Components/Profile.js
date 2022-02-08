import React from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { profileId } = useParams();
  return (
    <>
      <div>{profileId}</div>
      <div>Profile</div>
    </>
  );
};

export default Profile;
