<script setup lang="ts">

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { PlusIcon } from '@heroicons/vue/20/solid'
import UserSelection from "@/components/ui/common/navbar/UserSelection.vue";
import {ref} from "vue";
import AppointmentModal from "@/components/ui/modals/AppointmentModal.vue";

const isOpen = ref(false)
function closeModal() {
  isOpen.value = false
}

function openCreateModal() {
  isOpen.value = true
}

</script>

<template>
  <Disclosure as="nav" class="bg-white shadow" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex">
          <div class="-ml-2 mr-2 flex items-center md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span class="absolute -inset-0.5" />
              <span class="sr-only">Open main menu</span>
              <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
          <router-link to="/" class="flex flex-shrink-0 items-center bg-indigo-600 rounded-lg my-2 px-3 py-2">
            <img class="h-8 w-auto" src="https://cdn.prod.website-files.com/644a6ceae40c04757d3fddbf/645e277376ae297d29a9d340_Iceberg-Digital.svg" alt="Your Company" />
          </router-link>
          <div class="hidden md:ml-6 md:flex md:space-x-8">
            <!-- Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
            <router-link to="/" class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700" active-class="border-b-2 border-indigo-500 text-indigo-600" exact-active-class="border-b-2 border-indigo-500 text-indigo-600">Home</router-link>
            <router-link to="/clients" class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700" active-class="border-b-2 border-indigo-500 text-indigo-600">Clients</router-link>
            <router-link to="/agents" class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700" active-class="border-b-2 border-indigo-500 text-indigo-600">Agents</router-link>
            <router-link to="/appointments" class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700" active-class="border-b-2 border-indigo-500 text-indigo-600">Appointments</router-link>
          </div>
        </div>
        <div class="flex-row items-center justify-center gap-x-4 hidden md:flex">
          <div class="flex-shrink-0">
            <button @click="openCreateModal" type="button" class="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <PlusIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
              New Appointment
            </button>
          </div>
          <div class="hidden md:flex">
            <user-selection />
          </div>
        </div>
      </div>
    </div>

    <DisclosurePanel class="md:hidden">
      <div class="space-y-1 pb-3 pt-2">
        <!-- Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" -->
        <router-link
            to="/"
            custom
            v-slot="{ isActive, isExactActive, href, navigate }"
        >
          <a
              :href="href"
              @click="navigate"
              :class="[
      isExactActive
        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
        : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700',
      'block border-l-4 py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6'
    ]"
          >
            Dashboard
          </a>
        </router-link>

        <router-link
            to="/clients"
            custom
            v-slot="{ isActive, href, navigate }"
        >
          <a
              :href="href"
              @click="navigate"
              :class="[
      isActive
        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
        : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700',
      'block border-l-4 py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6'
    ]"
          >
            Team
          </a>
        </router-link>

        <router-link
            to="/agents"
            custom
            v-slot="{ isActive, href, navigate }"
        >
          <a
              :href="href"
              @click="navigate"
              :class="[
      isActive
        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
        : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700',
      'block border-l-4 py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6'
    ]"
          >
            Projects
          </a>
        </router-link>

        <router-link
            to="/appointments"
            custom
            v-slot="{ isActive, href, navigate }"
        >
          <a
              :href="href"
              @click="navigate"
              :class="[
      isActive
        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
        : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700',
      'block border-l-4 py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6'
    ]"
          >
            Calendar
          </a>
        </router-link>
      </div>
      <div class="border-t border-gray-200 pb-3 pt-4">
        <div class="flex flex-col items-start justify-center gap-y-4 px-4 sm:px-6">
          <div class="flex-shrink-0">
            <button @click="openCreateModal" type="button" class="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <PlusIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
              New Appointment
            </button>
          </div>
          <user-selection />
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
  <appointment-modal
      :isOpen="isOpen"
      :on-cancel="closeModal"
      :modal-type="'add'"
  />
</template>

<style scoped>

</style>