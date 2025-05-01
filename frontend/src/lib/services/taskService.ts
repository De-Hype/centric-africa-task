import axios from "axios";
import toast from "react-hot-toast";
import getAccessToken from "../cookies/getAccessToken";
import ITask from "../../interfaces/ITask";
const baseURL = "http://localhost:8200/v1/api/tasks";

// Fetch all tasks
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
    console.log(response, "This is the response")
    return response.data;
  } catch (error) {
    console.error("Account fetching failed:", error);
    throw error;
  }
};

export const createTask = async (taskData) => {
  const token = getAccessToken();
  const headers = token
    ? {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    : {
        "Content-Type": "application/json",
      };
  console.log(taskData);

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
    return response.data;
  } catch (error) {
    console.error("Account creation failed:", error);
    toast.error("Error creating a task");
    throw error;
  }
};

// Claim a task
export const claimTask = async (taskId) => {
  const token = getAccessToken();

  const headers = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
  };


  try {
    const url = `${baseURL}/${taskId}/claim`;

    const response = await axios.patch(
      url,
      {}, 
      { headers }
    );

    return response.data;
  } catch (error) {
    toast.error("Error occured while claiming task")
    console.error("Account fetching failed:", error);
    throw error;
  }
};

export const unclaimTask  = async (taskId) => {
  const token = getAccessToken();

  const headers = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
  };


  try {
    const url = `${baseURL}/${taskId}/unclaim`;

    const response = await axios.patch(
      url,
      {}, 
      { headers }
    );

    return response.data;
  } catch (error) {
    toast.error("Error occured while claiming task")
    console.error("Account fetching failed:", error);
    throw error;
  }
};


// Unclaim a task
// export const unclaimTask = async (taskId) => {
//   // Simulate API delay
//   await new Promise((resolve) => setTimeout(resolve, 500));

//   const tasks = getStoredTasks();
//   const taskIndex = tasks.findIndex((task) => task.id === taskId);

//   if (taskIndex === -1) {
//     throw new Error("Task not found");
//   }

//   // Unclaim the task
//   tasks[taskIndex].claimedBy = null;
//   tasks[taskIndex].claimedAt = null;

//   saveTasks(tasks);

//   return tasks[taskIndex];
// };
