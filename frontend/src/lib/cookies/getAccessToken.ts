import Cookies from "js-cookie";

const getAccessToken = () => {
  const token = Cookies.get("applicationToken");
  return token;
};



export default getAccessToken;
