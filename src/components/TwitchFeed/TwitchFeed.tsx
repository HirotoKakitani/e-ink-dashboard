import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { getCurrentlyLiveStreamsFromTwitch } from "../../app/twitchSlice";
import { useSelector } from "react-redux";
import {
  selectIsTwitchDataLoaded,
  selectTwitchStreams,
} from "../../app/selectors";
import TwitchStreamInfo from "./TwitchStreamInfo";
import styled from "styled-components";

const TwitchFeed = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCurrentlyLiveStreamsFromTwitch());
  }, [dispatch]);

  const isTwitchDataLoaded = useSelector(selectIsTwitchDataLoaded);
  const streamList = useSelector(selectTwitchStreams);
  const [streamIndicies, setStreamIndicies] = useState([0, 0]);
  const pageNumberRef = useRef(0);
  const MAX_PAGE_SIZE = 5; // maximum number of streams to display on screen at a time
  const TIME_PER_PAGE = 10000; // how long to wait before changing pages (in milliseconds)

  // splits up stream list into pages to display at most 5 at a time.
  useEffect(() => {
    if (streamList?.length > 0) {
      const getNewIndicies = () => {
        const numberOfPages = Math.ceil(streamList.length / MAX_PAGE_SIZE);
        const pageLength =
          pageNumberRef.current === numberOfPages - 1
            ? MAX_PAGE_SIZE -
              (numberOfPages * MAX_PAGE_SIZE - streamList.length)
            : MAX_PAGE_SIZE;
        setStreamIndicies([
          pageNumberRef.current * MAX_PAGE_SIZE,
          pageNumberRef.current * MAX_PAGE_SIZE + pageLength,
        ]);
        pageNumberRef.current = ++pageNumberRef.current % numberOfPages;
      };

      getNewIndicies();
      const timer = setInterval(getNewIndicies, TIME_PER_PAGE);
      return () => clearInterval(timer);
    }
  }, [streamList]);

  return (
    <TwitchFeedContainer>
      {!isTwitchDataLoaded && (
        <LoginMessage>
          {" "}
          No Twitch data found! Please refresh or log in to your Twitch account.
        </LoginMessage>
      )}
      <StreamList>
        {streamList
          ?.slice(streamIndicies[0], streamIndicies[1])
          .map((streamData, key) => (
            <TwitchStreamInfo streamData={streamData} key={`stream-${key}`} />
          ))}
      </StreamList>
    </TwitchFeedContainer>
  );
};

export default TwitchFeed;

const TwitchFeedContainer = styled.div`
  padding: 25px 15px;
  grid-area: twitch;
  background: white;
`;

const LoginMessage = styled.p`
  text-align: center;
`;

const StreamList = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
