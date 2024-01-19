<script setup lang="ts">
import ButtonComponent from '@/components/common/ButtonComponent.vue';
import { isMobile } from '@/services/utils';
import { useI18n } from 'vue-i18n';

const i18n = useI18n();
const changeLocale = (locale: string) => {
	i18n.locale.value = locale;
};

</script>

<template>
  <main>
    <div class="d-flex flex-column align-center container">
      <div class="d-flex locales">
        <h3 @click="() => changeLocale('fr')">
          Français
        </h3>
        <h3 @click="() => changeLocale('en')">
          English
        </h3>
      </div>
      <h1>{{ $t("home.title") }}</h1>
      <h2>{{ $t("home.description") }}</h2>
      <h3
        v-if="isMobile()"
        class="warning"
      >
        ❗
        {{ $t("home.mobile_warning") }}
        ❗
      </h3>
      <router-link
        :to="{ name: 'pong' }"
      >
        <ButtonComponent>Pong</ButtonComponent>
      </router-link>
    </div>
  </main>
</template>

<style scoped>
.container {
  margin: 1rem;
  gap: 1rem;
}

.locales {
  gap: 1rem;
  text-decoration: underline;
  cursor: pointer;
}
</style>
