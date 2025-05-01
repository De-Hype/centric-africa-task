
//@ts-nocheck
import { create } from 'zustand';
import { fetchTasks, createTask, claimTask, unclaimTask } from '../services/taskService';
import ITask from '../../interfaces/ITask';
import { useUserStore } from './userStore';


interface TaskStore {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  availableTasks: any[];
  myTasks: ITask[];
  loading: boolean;
  error: string | null;
  refreshTasks: () => Promise<void>;
  addTask: (taskData: Omit<ITask, 'id' | 'createdBy' | 'createdAt' | 'assignedTo'>) => Promise<ITask>;
  claimTaskById: (taskId: string) => Promise<ITask>;
  unclaimTaskById: (taskId: string) => Promise<ITask>;
}
const { user } = useUserStore.getState();

const userId = user?._id; // Replace this with a real user context or auth logic

export const useTaskStore = create<TaskStore>((set) => ({
  availableTasks: [],
  myTasks: [],
  loading: false,
  error: null,

  refreshTasks: async () => {
    try {
      set({ loading: true });
      const {data }=await fetchTasks();
      console.log(data,"We are here")
      const tasks:ITask[] = data
      console.log(tasks,"We are here too")
      console.log(userId)
      set({
        availableTasks: tasks.filter(task => !task.assignedTo),
        myTasks: tasks.filter(task => task?.assignedTo?._id === userId),
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
      const {data} = await createTask({
        ...taskData,
        createdBy: userId,
        createdAt: new Date().toISOString(),
        assignedTo: null,
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
      const {data } = await claimTask(taskId);
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
      const {data } = await unclaimTask(taskId);
      const updatedTask = data
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
