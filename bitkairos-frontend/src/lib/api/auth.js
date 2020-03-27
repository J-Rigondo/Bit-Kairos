import axios from 'axios';

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
