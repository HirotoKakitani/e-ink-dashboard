import React, { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { getCurrentlyLiveStreamsFromTwitch } from '../../app/twitchSlice';
import { useSelector } from 'react-redux';
import { selectTwitchStreams } from '../../app/selectors';

const TwitchFeed = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCurrentlyLiveStreamsFromTwitch());
  }, [dispatch]);

  const streamList = useSelector(selectTwitchStreams);
  return (
    <div>
      test twitch feed
      <ul>
        {streamList?.map( stream => <li>{stream.userName}</li>)}
      </ul>
    </div>
  )
};

export default TwitchFeed;