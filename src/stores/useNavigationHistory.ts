import { defineStore } from "pinia";

export const useDashboardHistory = defineStore({
  id: "navigationHistory",
  state: () => ({
    previous: "",
  }),
  actions: {
    setPreviousView(path: string) {
      this.previous = path;
    }
  },
});