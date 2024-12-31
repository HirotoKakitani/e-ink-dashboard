import React from "react";
import { TwitchStream } from "../../app/twitchSlice";
import styled from "styled-components";

type ITwitchStreamInfoProps = {
  streamData : TwitchStream;
};

const TwitchStreamInfo = (props: ITwitchStreamInfoProps) => {
  const {streamData} = {...props}; 

  return (
    <TwitchStreamInfoContainer>
      <UserName>{streamData.userName}</UserName>
      <StreamTitle>{streamData.title}</StreamTitle>
      <InfoRow>
        <GameName>{streamData.gameName}</GameName>
        <TagContainer>
          {streamData.tags.slice(0,3).map(tag => <StreamTag>{tag}</StreamTag>)}
        </TagContainer>
      </InfoRow>
      <InfoRow>
        <StartTime>Started at {new Date(streamData.startedAt).toLocaleTimeString()}</StartTime>
        <ViewerCount>{streamData.viewerCount}</ViewerCount>
      </InfoRow>
    </TwitchStreamInfoContainer>
  )
};

export default TwitchStreamInfo;

const TwitchStreamInfoContainer = styled.div`
  font-size: 12px;
`;

const UserName  = styled.p`
  font-size: 15px;
  font-weight: bold;
  margin:0;
`;

const StreamTitle = styled.p`
  margin:0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const GameName = styled.p`
  margin:0;
`;

const TagContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 2px;
  flex-wrap: wrap;
`;

const StreamTag = styled.p`
  margin: 0;
  background-color: black;
  border-radius: 5px;
  color:white;
  padding:2px;
  font-size: 10px;
`;

const StartTime = styled.p`
  margin:0;
`;

const ViewerCount = styled.p`
  margin:0;
`;
