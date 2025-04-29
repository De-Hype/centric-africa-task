import { create } from "zustand";
import IUser from "../../interfaces/IUser";

interface UserState {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
