
<template>
  <div class="flex flex-row items-center justify-center text-white rounded-full text-sm cursor-pointer" :class="dynamicClasses" :style="{ backgroundColor: userColor }" >
    {{ userName.charAt(0) }}{{ userSurname.charAt(0) }}
  </div>
</template>

<script setup lang="ts">

import {computed} from "vue";

const props = defineProps({
  userName: {
    type: String,
    required: true
  },
  userSurname: {
    type: String,
    required: true
  },
  userColor: {
    type: String,
    default: '#4F46E5',
    required: false,
  },
  size: {
    type: Number,
    default: 8,
    required: false,
  }
})

const dynamicClasses = computed(() => {
  return {
    [`w-${props.size} h-${props.size}`]: true
  }
})

</script>

<style scoped>

</style>