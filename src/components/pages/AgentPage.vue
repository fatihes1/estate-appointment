<script setup lang="ts">

import ContactTable from "@/components/ui/contact/ContactTable.vue";
import AgentTable from "@/components/ui/agents/AgentTable.vue";
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">Agent Contacts</h1>
        <p class="mt-2 text-sm text-gray-700">A list of all the agents in your agency list including their name, agent number and total appointment count <span class="font-bold">(T.A.C)</span>.</p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button type="button" disabled class="cursor-not-allowed block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add Agent</button>
      </div>
    </div>
    <agent-table />
  </div>
</template>

<style scoped>

</style>