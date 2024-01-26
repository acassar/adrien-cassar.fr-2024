<script setup lang="ts">
import { computed } from 'vue';

const emit = defineEmits(['click']);
type ButtonType = 'default' | 'outline'

const props = withDefaults(defineProps<{
	visible?: boolean
	type?: ButtonType
}>(), {type: 'default', visible: true});

const getTypeClass = computed(() => `btn-${props.type}`);

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

.btn-default {
    background-color: var(--primary);
}

.btn-outline {
    background-color: transparent;
    border: 1px solid var(--primary);
    color: white;
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
}


.btn-default:hover {
    background-color: var(--primary-hover);
}

.btn-outline:hover {
  color: var(--primary);
}


</style>