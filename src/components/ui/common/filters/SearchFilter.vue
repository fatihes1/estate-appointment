<script setup lang="ts">

import {onUnmounted, ref, watch} from 'vue';
const searchValue = ref<string>('');
import {useAppointmentStore} from "@/stores/AppointmentStore.ts";
const appointmentStore = useAppointmentStore();
import {MagnifyingGlassIcon} from "@heroicons/vue/24/outline";
import { debounce } from 'lodash-es';


const debouncedSetSearchValue = debounce((value: string) => {
  appointmentStore.setSearchText(value);
  console.log("SEARCH VALUE", value);
}, 700);

// searchValue'yu takip et ve değiştiğinde debounce fonksiyonunu çağır
watch(searchValue, (newValue) => {
  if (newValue.length > 2) {
    debouncedSetSearchValue(newValue);
  }
});

// Bileşen yok edildiğinde bekleyen debounce çağrılarını iptal et
onUnmounted(() => {
  debouncedSetSearchValue.cancel();
});

</script>

<template>
  <a-input v-model:value="searchValue" placeholder="Basic usage">
    <template #suffix>
      <a-tooltip title="You can search via contact name, contact email, contact phone or appointment location.">
        <magnifying-glass-icon class="w-4 h-4 text-black" />
      </a-tooltip>
    </template>
  </a-input>
</template>

<style scoped>

</style>