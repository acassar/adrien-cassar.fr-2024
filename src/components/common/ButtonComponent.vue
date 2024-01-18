<script setup lang="ts">
import { computed } from 'vue';

const emit = defineEmits(['click']);
type ButtonType = 'primary' | 'secondary'

const props = withDefaults(defineProps<{
	visible?: boolean
	type?: ButtonType
}>(), {type: 'primary', visible: true});

const getTypeClass = computed(() => props.type);

</script>

<template>
  <div :style="`display: ${visible ? 'block' : 'none'}`">
    <button
      :class="`${getTypeClass}`"
      @click="() => emit('click')"
    >
      <slot />
    </button>
  </div>
</template>

<style scoped>

.primary {
    background-color: var(--primary);
}

.secondary {
    background-color: var(--secondary);
}

button {
    padding: 10px 30px 10px 30px ;
    border-radius: 6px;
    min-width: 100px;
    text-decoration: none;
    font-size: 16px;
    border: unset;
    margin: 0.2rem;
}

button:hover {
    cursor: pointer;
    background-color: var(--primary-hover);
}
</style>