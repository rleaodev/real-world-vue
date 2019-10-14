<template>
  <div class="user">
    <h1>This is the {{ username }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    username: {
      type: String,
      default: null
    }
  }
};
</script>

<style></style>
