import { create } from 'zustand';
import { fetchTasks, createTask, claimTask, unclaimTask } from '../services/taskService';
import ITask from '../../interfaces/ITask';


interface TaskStore {
  availableTasks: ITask[];
  myTasks: ITask[];
  loading: boolean;
  error: string | null;
  refreshTasks: () => Promise<void>;
  addTask: (taskData: Omit<ITask, 'id' | 'createdBy' | 'createdAt' | 'assignedTo'>) => Promise<ITask>;
  claimTaskById: (taskId: string) => Promise<ITask>;
  unclaimTaskById: (taskId: string) => Promise<ITask>;
}

const userId = "user123"; // Replace this with a real user context or auth logic

export const useTaskStore = create<TaskStore>((set, get) => ({
  availableTasks: [],
  myTasks: [],
  loading: false,
  error: null,

  refreshTasks: async () => {
    try {
      set({ loading: true });
      const tasks:ITask[] = await fetchTasks();
      console.log(get)
      set({
        availableTasks: tasks.filter(task => !task.assignedTo),
        myTasks: tasks.filter(task => task.assignedTo === userId),
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
      const newTask = await createTask({
        ...taskData,
        createdBy: userId,
        createdAt: new Date().toISOString(),
        assignedTo: null,
      });
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
      const updatedTask = await claimTask(taskId, userId);
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
      const updatedTask = await unclaimTask(taskId);
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
