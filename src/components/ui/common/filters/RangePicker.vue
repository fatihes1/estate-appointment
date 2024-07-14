<script setup lang="ts">
import {ref, watch} from 'vue';
import type { Dayjs } from 'dayjs';
type RangeValue = [Dayjs, Dayjs];
const selectedRange = ref<RangeValue>();

import {useAppointmentStore} from "@/stores/AppointmentStore.ts";
const appointmentStore = useAppointmentStore();

const onChange = (value: RangeValue, dateString: [string, string]) => {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
  appointmentStore.setDateRange(new Date(dateString[0]), new Date(dateString[1]))
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