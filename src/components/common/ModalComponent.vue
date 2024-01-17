<script setup lang="ts">

</script>

<template>
  <div class="modal">
    <div class="flex-column justify-center align-center">
      <slot />
    </div>
  </div>
</template>

<style scoped>

.modal {
    --minHeight: 200px;
    --minWidth: 300px;

    position: fixed;

    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    min-width: 300px;
    min-height: 200px;
    border-radius: 10px;
    background-color: #22181C;
    z-index: 1000;
    box-shadow: 0px 5px 10px black;

    padding: 20px;
}

</style>