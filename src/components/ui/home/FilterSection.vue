<script setup lang="ts">

import AvatarGroup from "@/components/ui/common/avatar/AvatarGroup.vue";
import {ref} from "vue";
import {useUserStore} from "@/stores/UserStore.ts";
const userStore = useUserStore();
</script>

<template>
  <div class="flex flex-row justify-between border-b-2 border-gray-200 pb-3">
    <div class="flex flex-row justify-around">
      <avatar-group :users="userStore.agents.map((user) => {
    return {
      id: user.id,
      name: user.fields.agent_name,
      surname: user.fields.agent_surname,
      color: user.fields.color
    }
  })" />
    </div>
    <div class="flex justify-end">
      // TODO: SEARCH HERE!
    </div>
  </div>
</template>

<style scoped>

</style>