import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todoStore', {
  state: () => ({
    todos: [],
  }),
  actions: {
    addTodo(text) {
      if (text.trim()) {
        this.todos.push({
          id: Date.now(),
          text,
          completed: false,
        });
      }
    },
    toggleComplete(id) {
      const todo = this.todos.find(todo => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteItem(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
    },
  },
});
