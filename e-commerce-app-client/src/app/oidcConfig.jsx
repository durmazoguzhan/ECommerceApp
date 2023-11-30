const oidcConfig = {
  authority: 'https://localhost:44365',
  clientId: 'inveshop',
  clientSecret: 'secret',
  redirectUri: 'http://localhost:3000/signin-oidc',
  postLogoutRedirectUri: 'http://localhost:3000/signout-callback-oidc',
  responseType: 'code',
  scope: 'inveshop openid',
  loadUserInfo: true,
  autoSignIn: false
};

export default oidcConfig;