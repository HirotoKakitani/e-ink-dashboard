import React, { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { getCurrentlyLiveStreamsFromTwitch } from '../../app/twitchSlice';
import { useSelector } from 'react-redux';
import { selectIsTwitchDataLoaded, selectTwitchStreams } from '../../app/selectors';
import TwitchStreamInfo from './TwitchStreamInfo';
import styled from "styled-components";


const TwitchFeed = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCurrentlyLiveStreamsFromTwitch());
  }, [dispatch]);

  const isTwitchDataLoaded = useSelector(selectIsTwitchDataLoaded)
  const streamList = useSelector(selectTwitchStreams);

  return (
    <TwitchFeedContainer>
      {!isTwitchDataLoaded && 
        <div> Please log in to Twitch </div>
      }
      <StreamList>
        {streamList?.slice(0,10).map( streamData => <TwitchStreamInfo streamData={streamData} />)}
      </StreamList>
    </TwitchFeedContainer>
  )
};

export default TwitchFeed;

const TwitchFeedContainer = styled.div`
  padding: 10px;
`;

const StreamList = styled.div`
  display: grid;
  grid-template-rows: repeat(4, auto);
  grid-template-columns: 47.5% 47.5%;
  column-gap: 5%;
`