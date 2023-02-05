import Oidc from "oidc-client";

const userManager = new Oidc.UserManager({
  authority: "https://localhost:44390",
  client_id: "Vue_App",
  client_secret: "secret_app",

  redirect_uri: "http://localhost:5173/callback",
  response_type: "id_token token",
  loadUserInfo: true,

  scope: "openid profile multitenancy NetApiCleanTemplate_Api", // "openid profile api1",
  post_logout_redirect_uri: "http://localhost:5173/about",
  userStore: new Oidc.WebStorageStateStore({ store: window.localStorage }),
});

Oidc.Log.logger = console;
Oidc.Log.level = Oidc.Log.INFO;

export default userManager;
