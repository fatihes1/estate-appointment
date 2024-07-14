<template>
  <a-select
      v-model="selectedItems"
      :options="options"
      :loading="fetching"
      :filter-option="false"
      @search="handleSearch"
      @change="handleOnChange"
      style="width: 100%;"
      mode="multiple"
      placeholder="Select Contact"
      :not-found-content="fetching ? 'Searching...' : 'Write the name of the contact!'"
  />
</template>

<script setup lang="ts">
import {onMounted, PropType, ref, watch} from 'vue';
import useContactFilter from '@/composables/useContactFilter.ts';
import { SelectProps } from 'ant-design-vue';

interface BadgeFilterProps extends SelectProps {
  onSelected?: (selectedItems: any) => void;
  dataType?: 'value' | 'label';
  defaultSelectedItems?: any[];
}

const props = defineProps<BadgeFilterProps >();
const emit = defineEmits(['onSelected']);

const { handleOnChange, handleSearch, contactIds, fetching, options, selectedItems, setInitialData} = useContactFilter();

watch(contactIds, (newContactIds) => {
  if (props.onSelected) {
    if (props.dataType === 'value') {
      emit('onSelected', newContactIds);
    } else {
      emit('onSelected', selectedItems.value);
    }
  }
});
</script>
