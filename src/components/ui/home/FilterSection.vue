<script setup lang="ts">
import AvatarGroup from '@/components/ui/common/filters/AvatarGroup.vue'
import { useUserStore } from '@/stores/UserStore.ts'
import StatusFilter from '@/components/ui/common/filters/StatusFilter.vue'
import RangePicker from '@/components/ui/common/filters/RangePicker.vue'
import SearchFilter from '@/components/ui/common/filters/SearchFilter.vue'
const userStore = useUserStore()
</script>

<template>
  <div
    class="flex flex-col px-5 md:px-2 lg:px-0 md:flex-row justify-between border-b-2 border-gray-200 pb-3"
  >
    <div class="flex flex-col md:flex-row gap-y-3 md:gap-x-10 w-full">
      <avatar-group
        :clickable="true"
        :users="
          userStore.agents.map((user) => {
            return {
              id: user.id,
              name: user.fields.agent_name,
              surname: user.fields.agent_surname,
              color: user.fields.color,
            }
          })
        "
        :max-count="5"
      />
      <status-filter />
      <range-picker />
    </div>
    <div class="flex justify-end mt-3 md:mt-0">
      <search-filter />
    </div>
  </div>
</template>

<style scoped></style>
