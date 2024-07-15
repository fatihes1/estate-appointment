<script setup>
import {ref, computed, watch} from "vue";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from "@headlessui/vue";
import {CheckIcon, ChevronDownIcon} from "@heroicons/vue/20/solid";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: Object,
  options: {
    type: Array,
    default: () => [],
  },
  loadOptions: Function,
});

const options = ref(props.options);
const isLoading = ref(false);

const queryOption = computed(() => {
  return query.value === ""
      ? null
      : {
        missing: true,
        label: query.value,
      };
});

let query = ref("");
watch(
    query,
    q => {
      if (props.loadOptions) {
        isLoading.value = true;
        props.loadOptions(q, results => {
          options.value = results;

          if (
              props.modelValue &&
              !options.value.some(o => {
                return o.value === props.modelValue?.value;
              })
          ) {
            options.value.unshift(props.modelValue);
          }
          isLoading.value = false;
        });
      }
    },
    {immediate: true}
);

let filteredOptions = computed(() =>
    query.value === ""
        ? options.value
        : options.value.filter(option => {
              if (option.label) {
                return option.label
                    .toLowerCase()
                    .replace(/\s+/g, "")
                    .includes(query.value.toLowerCase().replace(/\s+/g, ""))
              }
            }

        )
);

function handleUpdateModelValue(selected) {

  emit("update:modelValue", selected);
}
</script>

<template>
  <Combobox
      by="value"
      :model-value="props.modelValue"
      @update:model-value="handleUpdateModelValue"
      multiple
  >
    <div class="relative mt-1">
      <div
          class="relative w-full cursor-default border border-gray-200 overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
      >
        <ComboboxInput
            class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
            @change="query = $event.target.value"
        />
        <ComboboxButton
            class="absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <ChevronDownIcon
              class="h-5 w-5 text-gray-400"
              aria-hidden="true"
          />
        </ComboboxButton>
      </div>
      <TransitionRoot
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          @after-leave="query = ''"
      >
        <ComboboxOptions
            class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <div
              v-if="
              filteredOptions.length === 0 &&
              !isLoading &&
              !queryOption
            "
              class="relative cursor-default select-none py-2 px-4 text-gray-700"
          >
            Nothing found.
          </div>

          <div
              v-if="isLoading && !queryOption"
              class="relative cursor-default select-none py-2 px-4 text-gray-700"
          >
            Write the name of the contact.
          </div>
          <div
              v-if="isLoading && queryOption"
              class="relative cursor-default select-none py-2 px-4 text-gray-700"
          >
            Loading...
          </div>

          <template v-if="!isLoading">
            <ComboboxOption
                v-for="option in filteredOptions"
                as="template"
                :key="option.value"
                :value="option"
                v-slot="{selected, active}"
            >
              <li
                  class="relative cursor-pointer select-none py-2 pl-10 pr-4"
                  :class="{
                  'bg-indigo-500 text-white': active,
                  'text-gray-900': !active,
                }"
              >
                <span
                    class="block truncate"
                    :class="{'font-medium': selected, 'font-normal': !selected}"
                >
                  {{ option.label }}
                </span>
                <span
                    v-if="selected"
                    class="absolute inset-y-0 left-0 flex items-center pl-3"
                    :class="{'text-white': active, 'text-indigo-500': !active}"
                >
                  <CheckIcon
                      class="h-5 w-5"
                      aria-hidden="true"
                  />
                </span>
              </li>
            </ComboboxOption>
          </template>
        </ComboboxOptions>
      </TransitionRoot>
    </div>
  </Combobox>
</template>