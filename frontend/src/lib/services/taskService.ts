import axios from "axios";
import toast from "react-hot-toast";
import getAccessToken from "../cookies/getAccessToken";
const baseURL = "https://centric-africa-task.onrender.com/v1/api/tasks";

export type TaskDataType = {
  _id: string;
  title: string;
  description: string;
  budget: number;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
  assignedTo: string | null;
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

export const createTask = async (taskData: TaskDataType) => {
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
