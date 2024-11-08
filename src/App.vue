<template>
  <div id="app">
    <div class="todo-container">
      <h1>ToDo List</h1>
      <form @submit.prevent="handleAddTodo" class="todo-form">
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
import { ref } from 'vue';
import { useTodoStore } from './stores/todoStore';
import ToDoItem from './components/ToDoItem.vue';

export default {
  components: {
    ToDoItem,
  },
  setup() {
    const newTodo = ref('');
    const todoStore = useTodoStore();

    const handleAddTodo = () => {
      todoStore.addTodo(newTodo.value);
      newTodo.value = '';
    };

    return {
      newTodo,
      todos: todoStore.todos,
      handleAddTodo,
      toggleComplete: todoStore.toggleComplete,
      deleteItem: todoStore.deleteItem,
    };
  },
};
</script>
