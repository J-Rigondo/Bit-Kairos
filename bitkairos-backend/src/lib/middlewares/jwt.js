import * as token from '../token';

export const tokenCheck = async (ctx, next) => {
  const accessToken = ctx.cookies.get('access_token');

  if (!accessToken) {
    ctx.request.user = null;
    return next(); // if there is no token, skip it.
  }

  try {
    const decoded = await token.decodeToken(accessToken);
    const { user } = decoded;

    //re-issue token, when its age is over 3 days
    if (Date.now() / 1000 - decoded.iat > 60 * 60 * 24 * 3) {
      const freshToken = token.generateToken({ user }, 'user');
      ctx.cookies.set('access_token', freshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7
      });
    }
    ctx.request.user = user;
  } catch (e) {
    ctx.request.user = null;
  }
  return next();
};
