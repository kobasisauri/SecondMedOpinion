import { create } from "zustand";

const useStore = create((set) => ({
  theme: "light",
  setTheme: (theme) => {
    set(() => ({ theme: theme }));
  },
  loading: false,
  setLoading: (load) => {
    set(() => ({ loading: load }));
  },
}));

export default useStore;
