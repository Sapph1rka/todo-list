<template>
  <div class="todo-item">
    <p>{{ todo.name }}</p>
    <p>{{ todo.description }}</p>
  </div>
</template>

<script>
export default {
  name: 'ToDoItem',
  props: {
    todo: Object
  }
};
</script>