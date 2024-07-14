
<template>
  <a-avatar-group
    :max-count="4"
    size="default"
    :max-style="{ backgroundColor: '#e2e2e2', color: '#000000' }"
  >
    <a-tooltip v-for="user in users" :title="user.name + ' ' + user.surname" :key="user.id">
      <a-avatar
          @click="handleOnClickAvatar(user.id)"
          class="cursor-pointer border-2 border-white"
          :key="user.id"
          :style="{ backgroundColor: user.color }"
          :class="{ '!border-green-500': selectedUsers.includes(user.id)}"
      >{{ user.name.charAt(0) }}{{ user.surname.charAt(0) }}</a-avatar>
    </a-tooltip>
  </a-avatar-group>
</template>

<script setup lang="ts">

import Avatar from "@/components/ui/common/avatar/Avatar.vue";
import {ref, watch} from "vue";

const selectedUsers = ref([]);

const handleOnClickAvatar = (user) => {
  // If the user already selected, deselect it
  // If not add the list
  if (selectedUsers.value.includes(user)) {
    selectedUsers.value = selectedUsers.value.filter((selectedUser) => selectedUser !== user);
  } else {
    selectedUsers.value = [...selectedUsers.value, user];
  }
}

const props = defineProps({
  maxCount: {
    type: Number,
    default: 2,
    required: false
  },
  size: {
    type: String,
    default: 'default',
    required: false
  },
  maxStyle: {
    type: Object,
    default: () => {
      return {
        backgroundColor: '#f56a00',
        color: '#f56a00'
      }
    },
    required: false
  },
  users: {
    type: Array,
    default: [],
    required: true
  }
})

</script>


<style scoped>

</style>