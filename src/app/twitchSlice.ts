import { createSlice } from '@reduxjs/toolkit';
import { fetchFollowedStreams, fetchTwitchUserInfo } from '../api/twitchService';

type CurrentlyLiveStreams = {
  streams: TwitchStream[];
}
export type TwitchStream = {
  userName: string;
  title: string;
  startedAt: string;
  tags: string[];
  gameName?: string;
  viewerCount?: string;
  thumbnailUrl?: string;
}

export const twitchSlice = createSlice({
  name: 'twitch',
  initialState: {
    twitchData: {} as CurrentlyLiveStreams,
    error: undefined,
    loading: false,
    loaded: false,
  },
  reducers: {
    setTwitchData: (state, action) => {
      state.twitchData = action.payload;
      state.error = undefined;
      state.loading = false;
      state.loaded = true;
    },
    setError: (state, action) => {
      state.twitchData = {} as CurrentlyLiveStreams;
      state.error = action.payload;
      state.loaded = false;
      state.loading = false;
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = undefined;
      state.loaded = false;
      state.twitchData = {} as CurrentlyLiveStreams;
    },
  },
})

export const { setTwitchData, setError, setLoading } = twitchSlice.actions

export default twitchSlice.reducer

// thunk for fetching twitch data and setting app state with fetched data
export const getCurrentlyLiveStreamsFromTwitch = () => {
  return async (dispatch, getState) => {
    dispatch(setLoading);
    try {
      const accessToken = new URLSearchParams(document.location.hash?.substring(1)).get('access_token');
      if (accessToken) {
        const userInfoReponse = await fetchTwitchUserInfo(accessToken);
        const userId = userInfoReponse?.data?.[0]?.id;
        const twitchFetchResponse = await fetchFollowedStreams(accessToken, userId);
        const twitchData: CurrentlyLiveStreams = {
          streams: twitchFetchResponse?.data?.map((streamData) => {
            return {
              userName: streamData.user_name,
              title: streamData.title,
              startedAt: streamData.started_at,
              tags: streamData.tags,
              gameName: streamData.game_name,
              viewerCount: streamData.viewer_count,
            }
          })
        };
        console.log('Twitch data transformed ', twitchData );
        dispatch(setTwitchData(twitchData));  
      } else {
        throw new Error('No Access Token');
      }
    }
    catch (e: any) {
      dispatch(setError);
    }
  };
};