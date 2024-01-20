<script setup lang="ts">
defineProps<{
	keyForUp: string,
	keyForDown: string,
	player: 1 | 2
}>();
</script>

<template>
  <div class="d-flex align-center justify-center keys-container">
    <span>P{{ player }}</span>
    <div class="flex-column justify-center">
      <div class="d-flex  align-center">
        <span class="icon">{{ keyForUp }}</span>
        <span>{{ $t("pong.arrow_up") }}</span>
      </div>
      <div class="d-flex  align-center">
        <span class="icon">{{ keyForDown }}</span>
        <span>{{ $t("pong.arrow_down") }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.icon {
	font-size: 40px;
	margin: 0.2rem;
}
.keys-container {
	gap: 1rem;
}


</style>