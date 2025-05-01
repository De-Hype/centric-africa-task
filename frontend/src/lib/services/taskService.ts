import axios from "axios";
import toast from "react-hot-toast";
import getAccessToken from "../cookies/getAccessToken";
import APP_URI from "./AppURI";
const baseURL =   `${APP_URI}/v1/api/tasks`;

export type TaskDataType = {
  _id: string |null;
  title: string;
  description: string;
  budget: number;
 
  createdAt?: Date | string | undefined;
  updatedAt?: Date;
  assignedTo: string | null;
};
type CreateTaskInput = {
  title: string;
  description: string;
  budget: number;
};


export const fetchTasks = async () => {
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
    const url = `${baseURL}/`;
    const response = await axios.get(
      url,

      { headers }
    );
    toast.success("Fetched task successfully");
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch tasks");
    console.error("Failed to fetch tasks:", error);
    throw error;
  }
};

export const createTask = async (taskData: CreateTaskInput) => {
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
    const url = `${baseURL}/`;
    const response = await axios.post(
      url,
      {
        name: taskData.title,
        description: taskData.description,
        budget: String(taskData.budget),
      },
      { headers }
    );
    toast.success("Created a task successfully");
    return response.data;
  } catch (error) {
    console.error("Account creation failed:", error);
    toast.error("Error creating a task");
    throw error;
  }
};

export const claimTask = async (taskId: string) => {
  const token = getAccessToken();

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  try {
    const url = `${baseURL}/${taskId}/claim`;

    const response = await axios.patch(url, {}, { headers });

    toast.success("Task claimed successfully");
    return response.data;
  } catch (error) {
    toast.error("Error occured while claiming task");
    console.error("Account fetching failed:", error);
    throw error;
  }
};

export const unclaimTask = async (taskId: string) => {
  const token = getAccessToken();

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  try {
    const url = `${baseURL}/${taskId}/unclaim`;

    const response = await axios.patch(url, {}, { headers });
    toast.success("Unclaimed task successfully")
    return response.data;
  } catch (error) {
    toast.error("Error occured while claiming task");
    console.error("Error occured while claiming task:", error);
    throw error;
  }
};
