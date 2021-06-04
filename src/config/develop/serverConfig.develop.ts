import env from "../../env";

export default {
  throwSystemError: true,
  urlPrefix: `localhost:${env.PORT}/`,
  urlPrefixImg: "https://firebasestorage.googleapis.com/v0/b/eat-with-friend.appspot.com/o/",
  shouldAuth: false,
  timeoutToken: 36000 // second
}