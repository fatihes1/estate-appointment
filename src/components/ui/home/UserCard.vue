<script setup lang="ts">
import { UserIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  }
});

</script>

<template>
    <div class="flex flex-col justify-center items-start gap-y-1">
      <div class="flex flex-row gap-x-3">
        <user-icon class="h-4 w-4 text-gray-500" />
        <span class="text-black font-medium text-sm">{{ name }}{{' '}}{{ surname }}</span>
      </div>
      <div class="flex flex-row gap-x-3">
        <envelope-icon class="h-4 w-4 text-gray-500" />
        <span class="text-gray-500 text-sm">{{ email }}</span>
      </div>
      <div class="flex flex-row gap-x-3">
        <phone-icon class="h-4 w-4 text-gray-500" />
        <span class="text-gray-500 text-sm">{{ phone }}</span>
      </div>
    </div>
</template>

<style scoped>

</style>