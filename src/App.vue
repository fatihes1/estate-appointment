<script setup lang="ts">
import { useUserStore } from "@/stores/UserStore.ts";
const userStore = useUserStore();

</script>

<template>
  <div>
    <h1>Hello from user: {{ userStore.user.name }}</h1>
    <h1>Hello from user: {{ userStore.app }}</h1>
  </div>
</template>

