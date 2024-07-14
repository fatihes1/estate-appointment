<script setup lang="ts">
import { ClockIcon } from '@heroicons/vue/24/outline'
import {computed, onMounted, ref} from "vue";
import dayjs from 'dayjs';

const status = ref("")

const props = defineProps({
  isCanceled: {
    type: Boolean,
    required: true
  },
  date: {
    type: String,
    required: true
  }
})

const daysLeft = computed(() => {
  const now = dayjs();
  const appointment = dayjs(props.date);
  const dayDiff =  appointment.diff(now, 'day');
  if (dayDiff === 0) {
    return appointment.diff(now, 'hour') + ' hours'
  }
  return dayDiff + ' days'
});

onMounted(() => {
  if (props.isCanceled) {
    status.value = 'Canceled'
  } else {
    if (new Date(props.date) < new Date()) {
      status.value = 'Completed'
    } else {
      status.value = 'Upcoming'
    }
  }
})

</script>

<template>
  <div class="flex flex-col gap-y-3 md:gap-y-0 md:flex-row items-center bg-indigo-500 py-2 px-3 justify-start rounded-md w-full">
    <div v-if="status === 'Upcoming'" class="flex flex-col md:flex-row rounded-lg bg-white w-6/12 py-2 items-center justify-around h-full text-sm">
      <span class="text-orange-400 ">{{ status }}</span>
      <span>{{ daysLeft }}</span>
    </div>
    <div v-else class="flex rounded-lg bg-white w-6/12 py-2 items-center justify-center h-full text-red-500 text-sm">
      <span v-if="status === 'Canceled'" class="text-red-500">Canceled</span>
      <span v-else class="text-green-500">Completed</span>
    </div>
    <div class="w-2/12 flex items-center justify-center">
      <clock-icon class="h-5 w-5 text-white" />
    </div>
    <div class="flex flex-row justify-center items-center text-white text-sm w-4/12 ">
      {{ dayjs(props.date).format('YYYY.MM.DD HH.mm') }}
    </div>
  </div>
</template>

<style scoped>

</style>