<template>
    <li :class="['todo-item', { completed: isCompleted }]">
      <input type="checkbox" v-model="isCompleted" @change="toggleComplete" />
      <span>{{ todo.text }}</span>
      <button @click="deleteItem">Delete</button>
    </li>
  </template>
  
  <script>
  export default {
    props: ['todo'],
    data() {
      return {
        isCompleted: this.todo.completed,
      };
    },
    methods: {
      toggleComplete() {
        this.isCompleted = !this.isCompleted;
        this.$emit('toggle-complete', this.todo.id);
      },
      deleteItem() {
        this.$emit('delete-item', this.todo.id);
      },
    },
    watch: {
      todo: {
        handler(newVal) {
          this.isCompleted = newVal.completed;
        },
        deep: true,
      },
    },
  };
  </script>
  