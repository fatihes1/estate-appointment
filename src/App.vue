<template>
  <Navbar />
  <div class="container mx-auto mt-10">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/UserStore.ts'
import Navbar from "@/components/ui/common/navbar/Navbar.vue"

const userStore = useUserStore()

</script>

<style scoped>
/* Your styles here */
</style>
