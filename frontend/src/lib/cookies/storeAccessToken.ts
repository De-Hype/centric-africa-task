import Cookies from "js-cookie";
const storeAccessToken = (token: string) => {
  Cookies.set("applicationToken", token, { expires: 7 });
};



export default storeAccessToken;
