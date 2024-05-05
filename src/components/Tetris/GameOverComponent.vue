<script setup lang="ts">
import ButtonComponent from '../common/ButtonComponent.vue';

const {isGameOver} = defineProps<{
	isGameOver: boolean
}>();

defineEmits<{
	(e: 'reset'): void
}>();

</script>

<template>
  <div
    class="d-flex flex-column align-center flex game-over-container"
  >
    <div
      v-if="isGameOver"
    >
      <h1 class="">
        {{ $t('tetris.game_over') }}
      </h1>
      <ButtonComponent @click="$emit('reset')">
        {{ $t('tetris.play_again') }}
      </ButtonComponent>
    </div>
  </div>
</template>

<style scoped>
.game-over-container {
    gap: 1rem;
}
</style>