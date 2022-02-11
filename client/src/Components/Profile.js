import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import { COLORS } from "../constants";
import { ProfileContext } from "./ProfileContext";

import { TweetContext } from "./TweetContext";
import Header from "./TweetHeader";
import ActionBar from "./ActionBar";
import { FiRepeat } from "react-icons/fi";

const Profile = () => {
  const { profileId } = useParams();
  const {
    profileState,
    profileActions: {
      recieveProfileFromServer,
      recieveProfileTweetsFromServer,
    },
  } = React.useContext(ProfileContext);

  // const {
  //   tweetState,
  //   tweetActions: { recieveTweetsFromServer },
  // } = React.useContext(TweetContext);
  const [loading, setLoading] = React.useState(true);

  // Fetching the profile data from the server
  React.useEffect(() => {
    fetch(`/api/${profileId}/profile`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        recieveProfileFromServer(data);
      });
  }, [profileId]);

  // Fetching the profile owners tweets (including what they've retweeted)
  React.useEffect(() => {
    fetch(`/api/${profileId}/feed`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
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
          <ProfileHeader>
            <Banner src={profileState.profile.bannerSrc} />
            <DisplayName>{profileState.profile.displayName}</DisplayName>
            <div>{profileState.profile.handle}</div>
            <div>Profile</div>
          </ProfileHeader>
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
                  <ActionBar />
                  {/* {tweetState.homeFeedTweets[id].author.displayName} */}
                  {/* {profileState.tweets[id].id} */}
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
  border-left: 1px solid ${COLORS.tertiary};
`;

const ProfileHeader = styled.div`
  max-width: 80%;
`;

const Banner = styled.img`
  max-width: 80%;
`;

const DisplayName = styled.div`
  font-size: 1rem;
`;

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
