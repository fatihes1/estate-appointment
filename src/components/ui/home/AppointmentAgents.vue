<script setup lang="ts">

import AvatarGroup from "@/components/ui/common/avatar/AvatarGroup.vue";
import {useUserStore} from "@/stores/UserStore.ts";
import {onMounted, ref, watch} from "vue";
const userStore = useUserStore();

const users = ref([])

const props = defineProps({
  agents: {
    type: Array,
    default: [],
    required: false
  }
})

onMounted(() => {
  users.value = userStore.agents.filter((user) => {
    if (props.agents) {
      return props.agents.includes(user.id)
    }
  })
})


</script>


<template>
  <div class="flex flex-row justify-center items-center">
    <avatar-group :users="users.map((user) => {
    return {
      id: user.id,
      name: user.fields.agent_name,
      surname: user.fields.agent_surname,
      color: user.fields.color
    }
  })" />
  </div>
</template>

<style scoped>

</style>