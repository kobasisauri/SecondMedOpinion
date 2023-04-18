import { create } from "zustand";

const useStore = create((set) => ({
  theme: "dark",
  setTheme: (theme) => {
    set(() => ({ theme: theme }));
  },
}));

export default useStore;
