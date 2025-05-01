import { create } from 'zustand';
import { fetchTasks, createTask, claimTask, unclaimTask } from '../services/taskService';
import { useUserStore } from './userStore';

export default interface ITask {
  _id: string;
  name: string;
  description: string;
  budget: number;
  createdAt:  Date | undefined;
  updatedAt: string;
  creator: {
    _id: string;
    email: string;
    username: string;
  };
  assignedTo?: {
    _id: string;
    email: string;
    username: string;
  } | null;
  __v?: number;
}


interface TaskStore {
  availableTasks: ITask[];
  myTasks: ITask[];
  loading: boolean;
  error: string | null;
  refreshTasks: () => Promise<void>;
  addTask: (taskData: Omit<ITask, '_id' | 'creator' | 'createdAt' | 'assignedTo' | 'updatedAt' >) => Promise<ITask>;
  claimTaskById: (taskId: string) => Promise<ITask>;
  unclaimTaskById: (taskId: string) => Promise<ITask>;
}

const { user } = useUserStore.getState();
const userId = user?._id;

export const useTaskStore = create<TaskStore>((set) => ({
  availableTasks: [],
  myTasks: [],
  loading: false,
  error: null,

  refreshTasks: async () => {
    try {
      set({ loading: true });
      const { data } = await fetchTasks();
      const tasks: ITask[] = data;  
      set({
        availableTasks: tasks.filter(task => !task.assignedTo),
        myTasks: tasks.filter(
          task => task.assignedTo && task.assignedTo._id === userId
        ),      
        error: null,
      });
    } catch (err) {
      console.error(err);
      set({ error: 'Failed to load tasks' });
    } finally {
      set({ loading: false });
    }
  },
  

  addTask: async (taskData) => {
    try {
      set({ loading: true });
      const { data } = await createTask({
        title:taskData.name, 
        budget:taskData.budget,
        description:taskData.description
      });
      const newTask = data;
      set((state) => ({
        availableTasks: [...state.availableTasks, newTask],
      }));
      return newTask;
    } catch (err) {
      console.error(err);
      set({ error: 'Failed to create task' });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  claimTaskById: async (taskId) => {
    try {
      set({ loading: true });
      const { data } = await claimTask(taskId);
      const updatedTask = data;
      set((state) => ({
        availableTasks: state.availableTasks.filter(task => task._id !== taskId),
        myTasks: [...state.myTasks, updatedTask],
      }));
      return updatedTask;
    } catch (err) {
      console.error(err);
      set({ error: 'Failed to claim task. It may have been claimed by someone else.' });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  unclaimTaskById: async (taskId) => {
    try {
      set({ loading: true });
      const { data } = await unclaimTask(taskId);
      const updatedTask = data;
      set((state) => ({
        myTasks: state.myTasks.filter(task => task._id !== taskId),
        availableTasks: [...state.availableTasks, updatedTask],
      }));
      return updatedTask;
    } catch (err) {
      console.error(err);
      set({ error: 'Failed to unclaim task' });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));
