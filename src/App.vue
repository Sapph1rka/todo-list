<template>
  <div id="app">
    <div class="todo-container">
      <h1 v-if="isAuthenticated">To-Do List</h1>

      <form @submit.prevent="handleAddTodo" class="todo-form" v-if="isAuthenticated">
        <input type="text" v-model="newTodo" placeholder="Add new task" />
        <button type="submit" class="add-button">Add</button>
      </form>

      <ul class="todo-list" v-if="isAuthenticated">
        <ToDoItem
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
          @toggle-complete="toggleComplete"
          @delete-item="deleteItem"
        />
      </ul>
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTodoStore } from './stores/todoStore';
import router from './router';

const newTodo = ref('');
const todoStore = useTodoStore();
const isAuthenticated = !!localStorage.getItem('authToken');

if (!isAuthenticated) {
  router.push('/register');
}

const handleAddTodo = () => {
  todoStore.addTodo(newTodo.value);
  newTodo.value = '';
};
</script>
