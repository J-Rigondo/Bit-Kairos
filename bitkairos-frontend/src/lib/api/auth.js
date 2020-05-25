import axios from 'axios';

export const realEmail = (email) =>
  axios.get('http://localhost:4000/api/v1.0/auth/real-email/' + email);

export const findPwd = (email) =>
  axios.get('http://localhost:4000/api/v1.0/auth/find-password/' + email);

export const checkEmail = (email) =>
  axios.get('/api/v1.0/auth/email-check/' + email);

export const checkDisplayName = (displayName) =>
  axios.get('/api/v1.0/auth/displayName-check/' + displayName);

export const register = ({
  displayName,
  email,
  password,
  initialMoney: { currency, index }
}) =>
  axios.post('/api/v1.0/auth/register/local', {
    displayName,
    email,
    password,
    initialMoney: {
      currency,
      index
    }
  });

export const localLogin = ({ email, password }) =>
  axios.post('/api/v1.0/auth/login/local', { email, password });

export const checkLoginStatus = () => axios.get('/api/v1.0/auth/check');

export const logout = () => axios.get('/api/v1.0/auth/logout');

export const socialLogin = (provider, accessToken) =>
  axios.post('/api/v1.0/auth/login/' + provider, {
    accessToken
  });

export const socialRegister = ({
  displayName,
  accessToken,
  initialMoney,
  provider
}) =>
  axios.post('/api/v1.0/auth/register/' + provider, {
    displayName,
    accessToken,
    initialMoney
  });
