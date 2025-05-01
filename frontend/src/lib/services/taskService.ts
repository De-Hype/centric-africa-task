import axios from "axios";
import toast from "react-hot-toast";
import getAccessToken from "../cookies/getAccessToken";
import ITask from "../../interfaces/ITask";
const baseURL = "http://localhost:8200/v1/api/tasks";

const getStoredTasks = () => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
};

// Helper to save tasks to localStorage
const saveTasks = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Generate a unique ID (in a real app, this would come from the backend)
const generateId = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

// Fetch all tasks
export const fetchTasks = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return getStoredTasks();
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
export const claimTask = async (taskId, userId) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const tasks = getStoredTasks();
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    throw new Error("Task not found");
  }

  // Check if task is already claimed (handle concurrency)
  if (tasks[taskIndex].claimedBy) {
    throw new Error("Task already claimed by another user");
  }

  // Claim the task
  tasks[taskIndex].claimedBy = userId;
  tasks[taskIndex].claimedAt = new Date().toISOString();

  saveTasks(tasks);

  return tasks[taskIndex];
};

// Unclaim a task
export const unclaimTask = async (taskId) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const tasks = getStoredTasks();
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    throw new Error("Task not found");
  }

  // Unclaim the task
  tasks[taskIndex].claimedBy = null;
  tasks[taskIndex].claimedAt = null;

  saveTasks(tasks);

  return tasks[taskIndex];
};
