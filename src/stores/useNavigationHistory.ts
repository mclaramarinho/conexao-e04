import { defineStore } from "pinia";

export const useDashboardHistory = defineStore({
  id: "dashboardHistory",
  state: () => ({
    previous: "",
  }),
  actions: {
    setPreviousView(path: string) {
      this.previous = path;
    }
  },
});