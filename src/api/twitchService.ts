export const TWITCH_AUTH_URL =
  "https://id.twitch.tv/oauth2/authorize?" +
  new URLSearchParams({
    client_id: process.env.REACT_APP_TWITCH_CLIENT_ID || "",
    redirect_uri: "http://localhost:3000",
    response_type: "token",
    scope: "user:read:follows user:read:follows",
  }).toString();

const getTwitchRequestHeaders = (accessToken: string) => {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Client-Id": process.env.REACT_APP_TWITCH_CLIENT_ID || "",
    },
  };
};

export const fetchTwitchUserInfo = async (accessToken: string) => {
  const url = "https://api.twitch.tv/helix/users";
  const response = await fetch(url, getTwitchRequestHeaders(accessToken));
  return await response.json();
};

export const fetchFollowedStreams = async (
  accessToken: string,
  userId: string,
) => {
  const url = "https://api.twitch.tv/helix/streams/followed";
  const queryParams = new URLSearchParams({
    user_id: userId,
  }).toString();
  const response = await fetch(
    `${url}?${queryParams}`,
    getTwitchRequestHeaders(accessToken),
  );
  return await response.json();
};
