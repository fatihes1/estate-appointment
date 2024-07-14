<script setup lang="ts">
import {FILTER_OPTIONS, ALL_STATUSES} from "@/enums/status-filter-enums.ts";
import {ref, watch} from "vue";
import {useAppointmentStore} from "@/stores/AppointmentStore.ts";
const appointmentStore = useAppointmentStore();
const selectedStatus = ref<number>(ALL_STATUSES);


watch(selectedStatus, (newValue) => {
  appointmentStore.setSelectedStatus(newValue);
});

</script>

<template>
  <a-select
      ref="select"
      v-model:value="selectedStatus"
      class="w-44"
  >
    <a-select-option v-for="status in FILTER_OPTIONS" :value="status.value">{{ status.label }}</a-select-option>
  </a-select>
</template>

<style scoped>

</style>