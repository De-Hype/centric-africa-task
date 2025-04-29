// //@ts-nocheck
// import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
// import { fetchTasks, createTask, claimTask, unclaimTask } from '../services/taskService';
// import ITask from '../../interfaces/ITask';

// // Ensure the interface matches how you use it in code
// interface TaskContextType {
//   availableTasks: ITask[];
//   myTasks: ITask[];
//   loading: boolean;
//   error: string | null;
//   addTask: (taskData: Omit<ITask, 'id' | 'createdBy' | 'createdAt' | 'assignedTo'>) => Promise<ITask>;
//   claimTaskById: (taskId: string) => Promise<ITask>;
//   unclaimTaskById: (taskId: string) => Promise<ITask>;
//   refreshTasks: () => Promise<void>;
// }

// // Create context with default values
// const defaultContextValue: TaskContextType = {
//   availableTasks: [],
//   myTasks: [],
//   loading: false,
//   error: null,
//   addTask: async () => { throw new Error('TaskContext not initialized'); },
//   claimTaskById: async () => { throw new Error('TaskContext not initialized'); },
//   unclaimTaskById: async () => { throw new Error('TaskContext not initialized'); },
//   refreshTasks: async () => { throw new Error('TaskContext not initialized'); }
// };

// // Create the context
// const TaskContextInstance = createContext<TaskContextType>(defaultContextValue);

// // Export the context
// export const TaskContext = TaskContextInstance;

// // Create a custom hook for using this context
// export const useTaskContext = () => {
//   const context = useContext(TaskContext);
//   if (context === undefined) {
//     throw new Error('useTaskContext must be used within a TaskProvider');
//   }
//   return context;
// };

// interface TaskProviderProps {
//   children: ReactNode;
// }

// // Create and export the provider component
// export const TaskProvider = ({ children }: TaskProviderProps) => {
//   const [availableTasks, setAvailableTasks] = useState<ITask[]>([]);
//   const [myTasks, setMyTasks] = useState<ITask[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
  
//   // Mock user ID - In a real app, this would come from auth context
//   const userId: string = "user123";
  
//   const refreshTasks = async (): Promise<void> => {
//     try {
//       setLoading(true);
//       const tasks: ITask[] = await fetchTasks();
//       setAvailableTasks(tasks.filter(task => !task.assignedTo));
//       setMyTasks(tasks.filter(task => task.assignedTo === userId));
//       setError(null);
//     } catch (err) {
//       setError('Failed to load tasks');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   useEffect(() => {
//     refreshTasks();
//   }, []);
  
//   const addTask = async (
//     taskData: Omit<ITask, 'id' | 'createdBy' | 'createdAt' | 'assignedTo'>
//   ): Promise<ITask> => {
//     try {
//       setLoading(true);
//       const newTask: ITask = await createTask({
//         ...taskData,
//         createdBy: userId,
//         createdAt: new Date().toISOString(),
//         assignedTo: null
//       });
//       setAvailableTasks(prev => [...prev, newTask]);
//       return newTask;
//     } catch (err) {
//       setError('Failed to create task');
//       console.error(err);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const claimTaskById = async (taskId: string): Promise<ITask> => {
//     try {
//       setLoading(true);
//       const updatedTask: ITask = await claimTask(taskId, userId);
//       setAvailableTasks(prev => prev.filter(task => task._id !== taskId));
//       setMyTasks(prev => [...prev, updatedTask]);
//       return updatedTask;
//     } catch (err) {
//       setError('Failed to claim task. It may have been claimed by someone else.');
//       console.error(err);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const unclaimTaskById = async (taskId: string): Promise<ITask> => {
//     try {
//       setLoading(true);
//       const updatedTask: ITask = await unclaimTask(taskId);
//       setMyTasks(prev => prev.filter(task => task._id !== taskId));
//       setAvailableTasks(prev => [...prev, updatedTask]);
//       return updatedTask;
//     } catch (err) {
//       setError('Failed to unclaim task');
//       console.error(err);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const contextValue: TaskContextType = {
//     availableTasks,
//     myTasks,
//     loading,
//     error,
//     addTask,
//     claimTaskById,
//     unclaimTaskById,
//     refreshTasks
//   };
  
//   return (
//     <TaskContext.Provider value={contextValue}>
//       {children}
//     </TaskContext.Provider>
//   );
// };