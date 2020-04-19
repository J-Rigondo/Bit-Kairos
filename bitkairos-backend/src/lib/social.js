import { google } from 'googleapis';

const oauth2 = google.oauth2('v2');
const OAuth2 = google.auth.OAuth2;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

const getGoogleProfile = async (accessToken) => {
  try {
    const authClient = new OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);
    authClient.setCredentials({
      access_token: accessToken,
    });
    const profile = await oauth2.userinfo.get({
      auth: authClient,
    });

    return profile.data;
  } catch (e) {
    console.log(e);
  }
};

export const getProfile = (provider, accessToken) => {
  const getters = {
    google: getGoogleProfile,
  };

  return getters[provider](accessToken);
};
