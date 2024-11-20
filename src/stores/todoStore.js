import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    tasks: []
  }),
  actions: {
    loadTasks(tasks) {
      this.tasks = tasks;
    },
    addTask(task) {
      this.tasks.push(task);
    },
    removeTask(taskId) {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    }
  }
});
