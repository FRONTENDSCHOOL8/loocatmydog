import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    devtools((set) => ({
      user: null,
      setUser: (userData: Object) => set({ user: userData }),
      clearUser: () => set({ user: null }),
    })),
    { name: 'userStore' }
  )
);
export default useUserStore;
