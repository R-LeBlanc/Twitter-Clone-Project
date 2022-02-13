import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import { COLORS } from "../constants";
import { ProfileContext } from "./ProfileContext";

import { TweetContext } from "./TweetContext";
import Header from "./TweetHeader";
import ActionBar from "./ActionBar";

import { FiMessageCircle } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
import { FiShare } from "react-icons/fi";
import { FiRepeat } from "react-icons/fi";
import { FiMapPin } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";
import { format } from "date-fns";
import { MdFavorite } from "react-icons/md";
import ScaleIn from "./LikeButton/ScaleIn";

const Profile = () => {
  const { profileId } = useParams();
  const {
    profileState,
    profileActions: {
      recieveProfileFromServer,
      recieveProfileTweetsFromServer,
    },
  } = React.useContext(ProfileContext);

  const [loading, setLoading] = React.useState(true);

  // Fetching the profile data from the server
  React.useEffect(() => {
    fetch(`/api/${profileId}/profile`)
      .then((res) => res.json())
      .then((data) => {
        recieveProfileFromServer(data);
      });
  }, [profileId]);

  // Fetching the profile owners tweets (including what they've retweeted)
  React.useEffect(() => {
    fetch(`/api/${profileId}/feed`)
      .then((res) => res.json())
      .then((data) => {
        recieveProfileTweetsFromServer(data);
        setLoading(false);
      });
  }, [profileId]);

  // console.log(profileState);
  // console.log(tweetState);
  // Set the profile to render when the data is loaded
  return (
    <Wrapper>
      {!loading && (
        <>
          <Banner src={profileState.profile.bannerSrc} />
          <ProfileHeader>
            <DisplayImg src={profileState.profile.avatarSrc} />
            {profileState.profile.isBeingFollowedByYou ? (
              <IsFollowingWraper>
                <DisplayName>{profileState.profile.displayName}</DisplayName>
                <IsFollowing>Following</IsFollowing>
              </IsFollowingWraper>
            ) : (
              <DisplayName>{profileState.profile.displayName}</DisplayName>
            )}
            {profileState.profile.isFollowingYou ? (
              <HandleWrapper>
                <Handle>@{profileState.profile.handle}</Handle>
                <FollowingYou>Follows you</FollowingYou>
              </HandleWrapper>
            ) : (
              <Handle>@{profileState.profile.handle}</Handle>
            )}

            <Bio>{profileState.profile.bio}</Bio>
            <LocationWrapper>
              <Location>
                <LocationImg /> {profileState.profile.location}
              </Location>
              <JoinedDate>
                {" "}
                <JoinedImg /> Joined{" "}
                {format(new Date(profileState.profile.joined), "LLLL yyyy")}
                {}
              </JoinedDate>
            </LocationWrapper>
            <FollowWrapper>
              <Following>
                <strong>{profileState.profile.numFollowing}</strong> Following
              </Following>
              <Followers>
                <strong>{profileState.profile.numFollowers}</strong> Followers
              </Followers>
            </FollowWrapper>
          </ProfileHeader>
          <Tabs>
            <TweetFeed>Tweets</TweetFeed>
            <MediaPage>Media</MediaPage>
            <Likes>Likes</Likes>
          </Tabs>
          <Feed>
            {profileState.tweetIds.map((id) => {
              return (
                <Tweet key={id}>
                  {profileState.tweets[id].retweetFrom ? (
                    <Retweet>
                      <FiRepeat />{" "}
                      {profileState.tweets[id].retweetFrom.displayName} Remeowed
                    </Retweet>
                  ) : (
                    ""
                  )}
                  <Header
                    avatarSrc={profileState.tweets[id].author.avatarSrc}
                    displayName={profileState.tweets[id].author.displayName}
                    userName={profileState.tweets[id].author.handle}
                    timeStamp={profileState.tweets[id].timestamp}
                  />

                  <Status>{profileState.tweets[id].status}</Status>
                  {profileState.tweets[id].media.length > 0 ? (
                    <Media src={profileState.tweets[id].media[0].url} />
                  ) : (
                    ""
                  )}
                  <ActionWrapper>
                    <FiMessageCircle />
                    <FiRepeat />
                    <LikeWrapper>
                      {profileState.tweets[id].isLiked ? (
                        <ScaleIn>
                          <HeartFull style={{ color: `${COLORS.tertiary}` }} />
                        </ScaleIn>
                      ) : (
                        <Heart />
                      )}
                    </LikeWrapper>
                    <FiShare />
                  </ActionWrapper>
                </Tweet>
              );
            })}
          </Feed>
        </>
      )}
    </Wrapper>
  );
};

export default Profile;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
  max-width: 80%;
  margin-right: 20%;
`;

const ProfileHeader = styled.div`
  /* max-width: 100%; */
  font-size: .9rem;
  display:flex
  position: relative;
  padding-left: 30px;
  padding-right: 5%;
  align-content: space-evenly;
`;

const Banner = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const DisplayImg = styled.img`
  border: 6px solid white;
  border-radius: 100%;
  height: 170px;
  position: relative;
  top: -85px;
  z-index: 5;
`;

const IsFollowingWraper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const IsFollowing = styled.div`
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
  padding: 15px 30px;
`;

const DisplayName = styled.div`
  color: black;
  font-size: 2rem;
`;

const HandleWrapper = styled.div`
  display: flex;
`;

const Handle = styled.div`
  color: darkgray;
  margin-right: 10px;
`;

const FollowingYou = styled.div`
  background-color: lightgray;
  border-radius: 10%;
  font-size: 0.8rem;
  padding: 1px 5px;
`;

const Bio = styled.div`
  margin-top: 15px;
  font-size: 1.3rem;
`;

const LocationWrapper = styled.div`
  display: flex;
  padding-top: 15px;
`;

const Location = styled.div`
  padding-right: 15px;
`;

const LocationImg = styled(FiMapPin)``;

const JoinedDate = styled.div``;

const JoinedImg = styled(FiCalendar)``;

const FollowWrapper = styled.div`
  display: flex;
  padding-top: 15px;
`;

const Following = styled.div`
  padding-right: 15px;
`;

const Followers = styled.div``;

const Tabs = styled.div`
  /* align-content: space-around; */
  border-bottom: 1px solid lightgray;
  display: flex;
  justify-content: space-around;
  font-weight: bold;
  margin-top: 25px;
  /* width: 100%; */

  div {
    padding: 0 50px 20px;
  }
`;

const TweetFeed = styled.div`
  border-bottom: 4px solid ${COLORS.primary};
`;

const MediaPage = styled.div``;

const Likes = styled.div``;

const Feed = styled.div``;

const Tweet = styled.div`
  border: 1px solid ${COLORS.tertiary}
  background-color: ${COLORS.primaryLight};
  margin: 50px 0;
  padding: 15px 30px;
  position: relative;
`;

const Retweet = styled.div`
  font-size: 0.7rem;
  padding-bottom: 15px;
`;

const Status = styled.div`
  padding: 0 0 25px 60px;
`;

const Media = styled.img`
  border-radius: 20px;
  max-width: 80%;
  position: relative;
  left: 60px;
`;

const ActionWrapper = styled.div`
  align-items: center;
  background-color: ${COLORS.secondary};
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  height: 50px;
  margin-top: 30px;
`;

const HeartFull = styled(MdFavorite)`
  font-size: 25px;
`;

const Heart = styled(FiHeart)``;

const LikeWrapper = styled.div``;
