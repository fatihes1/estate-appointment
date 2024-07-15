<script setup lang="ts">
import { HomeIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  location: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div
    class="h-full flex flex-row justify-start items-center gap-x-1 truncate px-5"
  >
    <home-icon class="h-5 w-5 text-gray-500 pb-1" />
    <a-tooltip :title="location">
      <span class="text-black font-medium text-sm truncate">{{
        location ? location : 'No specified address'
      }}</span>
    </a-tooltip>
  </div>
</template>

<style scoped></style>
