import Cookies from "js-cookie";

export const removeUserId = () => {
  Cookies.remove("userId");
};
export const storeUserId = (id: string) => {
  Cookies.set("userId", id, { expires: 7 });
};
export const getUserId = () => {
  const token = Cookies.get("userId");
  return token;
};
