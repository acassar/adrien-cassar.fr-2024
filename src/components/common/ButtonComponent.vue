<script setup lang="ts">
const emit = defineEmits(['click']);
defineProps({
	visible: {
		type: Boolean,
		default: true
	}
});
</script>

<template>
  <div :style="`display: ${visible ? 'block' : 'none'}`">
    <button @click="() => emit('click')">
      <slot />
    </button>
  </div>
</template>

<style scoped>

button {
    padding: 10px 30px 10px 30px ;
    border-radius: 6px;
    min-width: 100px;
    background-color: var(--primary);
    text-decoration: none;
    font-size: 16px;
}

button:hover {
    cursor: pointer;
    background-color: var(--primary-hover);
}
</style>