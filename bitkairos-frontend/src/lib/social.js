import hello from 'hellojs';

hello.init(
  {
    google:
      '511827557355-8l78kn3q703338ro106gk3b6b1aqchua.apps.googleusercontent.com'
  },
  { redirect_uri: '/redirect.html' }
);

export default (function() {
  return {
    google: async () => {
      try {
        const auth = await hello.login('google', { scope: 'email' });
        const token = auth.authResponse.access_token;
        return token;
      } catch (e) {
        console.log(e);
      }
    }
  };
})();
