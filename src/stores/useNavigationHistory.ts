import { defineStore } from "pinia";

export const useNavigationHistory = defineStore({
  id: "navigationHistory",
  state: () => ({
    previous: "",
    next: "",
  }),
  actions: {
    setPreviousRoute(path: string) {
      this.previous = path;
    },
    setNextRoute(path: string) {
      this.next = path;
    },
  },
});