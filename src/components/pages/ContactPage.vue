<script setup lang="ts">
import ContactTable from '@/components/ui/contact/ContactTable.vue'
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">
          Client Contacts
        </h1>
        <p class="mt-2 text-sm text-gray-700">
          A list of all the clients in your customer list including their name,
          email, phone and total appointment count
          <span class="font-bold">(T.A.C)</span>.
        </p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button
          disabled
          type="button"
          class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-not-allowed"
        >
          Add Contact
        </button>
      </div>
    </div>
    <contact-table />
  </div>
</template>

<style scoped></style>
