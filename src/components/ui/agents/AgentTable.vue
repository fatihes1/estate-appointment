<template>
  <div class="mt-8 flow-root">
    <div class="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle table-height overflow-y-scroll border-b-2">
        <table class="min-w-full border-separate border-spacing-0">
          <thead>
          <tr>
            <th scope="col" class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">
              <span class="sr-only">Profile Picture</span>
            </th>
            <th scope="col" class="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell">Name & Surname</th>
            <th scope="col" class="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell">Agent Number</th>
            <th scope="col" class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter">T.A.C</th>
            <th scope="col" class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
          </thead>
          <tbody v-if="agents">
          <tr v-for="(person, personIdx) in agents" :key="person.id" class="hover:bg-indigo-50">
            <td :class="[personIdx !== agents.length - 1 ? 'border-b border-gray-200' : '', 'hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell']">
              <div class="w-8 h-8 flex flex-row items-center justify-center text-white rounded-full" :style="{ backgroundColor: person.fields.color }" >
                {{ person.fields.agent_name.charAt(0) }}{{ person.fields.agent_surname.charAt(0) }}
              </div>
            </td>
            <td :class="[personIdx !== agents.length - 1 ? 'border-b border-gray-200' : '', 'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-2 lg:pl-3']">{{ person.fields.agent_name }} {{ person.fields.agent_surname }}</td>
            <td :class="[personIdx !== agents.length - 1 ? 'border-b border-gray-200' : '', 'hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell']">{{ person.fields.number }}</td>
            <td :class="[personIdx !== agents.length - 1 ? 'border-b border-gray-200' : '', 'whitespace-nowrap px-3 py-4 text-sm text-gray-500']">{{ person.fields.appointments ? person.fields.appointments.length : 0}}</td>
            <td :class="[personIdx !== agents.length - 1 ? 'border-b border-gray-200' : '', 'relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-8 lg:pr-8']">
              <div class="flex flex-row gap-x-4">
                <button disabled @click="() => console.log('EDIT BUTTON CLICKED')" class="cursor-not-allowed flex justify-center items-center w-7 h-7 bg-gray-200 rounded-md text-black hover:bg-indigo-500 hover:text-white duration-100">
                  <PencilSquareIcon class="h-4 w-4" aria-hidden="true" />
                </button>
                <button disabled @click="() => console.log('DELETE BUTTON CLICKED')" class="cursor-not-allowed  flex justify-center items-center w-7 h-7 bg-gray-200 rounded-md text-black hover:bg-indigo-500 hover:text-white duration-100">
                  <TrashIcon class="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="flex justify-center items-center mx-auto py-2">
          <InfiniteLoading @infinite="fetchData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {PencilSquareIcon, TrashIcon} from "@heroicons/vue/24/outline";
import "v3-infinite-loading/lib/style.css";
import {onMounted, ref} from "vue";
import {getAllAgents} from "@/requests/agents-requests.ts";
import InfiniteLoading from "v3-infinite-loading";

const agents = ref([])
const nextOffset = ref(null);

const fetchData = async $state => {
  try {
    const { data } = await getAllAgents(10, nextOffset.value);
      agents.value.push(...data.records)
      nextOffset.value = data.offset || "";
    if (!data.offset) $state.complete();
    else $state.loaded();

  } catch (error) {
    if ($state) {
      $state.error();
    }
  }
};



</script>