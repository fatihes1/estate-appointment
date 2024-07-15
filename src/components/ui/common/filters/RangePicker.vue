<script setup lang="ts">
import {ref, watch} from 'vue';
import type { Dayjs } from 'dayjs';
type RangeValue = [Dayjs, Dayjs];
const selectedRange = ref<RangeValue>();

import {useAppointmentStore} from "@/stores/AppointmentStore.ts";
const appointmentStore = useAppointmentStore();

const onChange = (value: RangeValue, dateString: [string, string]) => {
  if (value) {
    appointmentStore.setDateRange(new Date(dateString[0]).toISOString(), new Date(dateString[1]).toISOString())
    return;
  }
  appointmentStore.setDateRange('', '');
};

</script>

<template>
  <a-range-picker
      v-model:value="selectedRange"
      show-time
      format="YYYY-MM-DD HH:mm"
      :placeholder="['From', 'To']"
      @change="onChange"
  />
</template>

<style scoped>

</style>