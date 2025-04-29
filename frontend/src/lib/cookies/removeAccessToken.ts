import Cookies from "js-cookie";

const removeAccessToken = () => {
  Cookies.remove("applicationToken");
};

export default removeAccessToken;
