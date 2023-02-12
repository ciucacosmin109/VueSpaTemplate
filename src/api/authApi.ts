import Oidc from "oidc-client";

const appBaseUrl = import.meta.env.VITE_FRONTEND_URL;
const appCallbacktUrl = "callback";
const appLogoutRedirectUrl = "about";

const authority = import.meta.env.VITE_LOGIN_AUTHORITY_URL;
const clientId = "Vue_App";

function buildUserManager(requestIdToken: boolean = true, requestUserInfo: boolean = true): Oidc.UserManager {
  return new Oidc.UserManager({
    userStore: new Oidc.WebStorageStateStore({ store: window.localStorage }),

    authority: authority,
    client_id: clientId,

    response_type: requestIdToken ? "token id_token" : "token",
    loadUserInfo: requestUserInfo,

    scope:
      (requestIdToken ? "openid profile tenant " : "") + // openid is mandatory
      "NetApiCleanTemplate_Api",

    redirect_uri: new URL(appCallbacktUrl, appBaseUrl).href,
    post_logout_redirect_uri: new URL(appLogoutRedirectUrl, appBaseUrl).href,
  });
}

const userManager = buildUserManager();

// Debug
Oidc.Log.logger = console;
Oidc.Log.level = Oidc.Log.INFO;

export default userManager;
