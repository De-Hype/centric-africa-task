import axios from "axios";
import getAccessToken from "../cookies/getAccessToken";
import { LoginInputType, RegisterInputType } from "../../interfaces/IUser";
import toast from "react-hot-toast";

const baseURL = "http://localhost:8200/v1/api/auth";

export const CreateAccountAPI = async (data: RegisterInputType) => {
  // const token = getAccessToken();
  // const headers = token
  //   ? {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     }
  //   : {
  //       "Content-Type": "application/json",
  //     };

  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const url = `${baseURL}/register`;
    const response = await axios.post(
      url,
      {
        email: data.email,
        password: data.password,
        username: data.username,
      },
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Account creation failed:", error);
    toast.error("Error creating account!");
    throw error;
  }
};

export const LoginAccountAPI = async (data: LoginInputType) => {
  // const token = getAccessToken();
  // const headers = token
  //   ? {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     }
  //   : {
  //       "Content-Type": "application/json",
  //     };

  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const url = `${baseURL}/sign-in`;
    const response = await axios.patch(
      url,
      {
        email: data.email,
        password: data.password,
      },
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Account creation failed:", error);
    toast.error("Invalid login credentials!");
    throw error;
  }
};

export const FetchMyAccountAPI = async () => {
  const token = getAccessToken();
  const headers = token
    ? {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    : {
        "Content-Type": "application/json",
      };

  try {
    const url = `${baseURL}/my-account`;
    const response = await axios.get(
      url,

      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Account fetching failed:", error);
    throw error;
  }
};
