<template>
  <div id="app">
    <div class="todo-container">
      <h1>ToDo List</h1>
      <form @submit.prevent="addTodo" class="todo-form">
        <input type="text" v-model="newTodo" placeholder="Add new task" />
        <button type="submit" class="add-button">Add</button>
      </form>

      <ul class="todo-list">
        <ToDoItem
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
          @toggle-complete="toggleComplete"
          @delete-item="deleteItem"
        />
      </ul>
    </div>
  </div>
</template>
<script>

import ToDoItem from './components/ToDoItem.vue';

export default {
  components: {
    ToDoItem,
  },
  data() {
    return {
      newTodo: '',
      todos: [],
    };
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim()) {
        this.todos.push({
          id: Date.now(),
          text: this.newTodo,
          completed: false,
        });
        this.newTodo = '';
      }
    },
    toggleComplete(id) {
      const todo = this.todos.find(todo => todo.id === id);
      if (todo) todo.completed = !todo.completed;
    },
    deleteItem(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
    },
  },
};
</script>
