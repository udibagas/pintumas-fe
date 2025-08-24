<template>
  <div class="flex flex-wrap gap-4 mt-6 items-center justify-between">
    <div class="flex flex-wrap gap-2">
      <u-select
        :model-value="pageSize"
        @update:model-value="(size) => emit('update:pageSize', size)"
        size="sm"
        :items="[10, 25, 50, 100]"
        class="min-w-16"
      />

      <UPagination
        size="sm"
        active-color="warning"
        :page="page"
        :items-per-page="pageSize"
        :total="total"
        @update:page="(page) => emit('update:page', page)"
      />
    </div>

    <div>
      Halaman
      <u-input
        :model-value="page"
        @update:model-value="(page) => emit('update:page', page)"
        type="number"
        size="sm"
        min="1"
        class="mx-2 min-w-16"
        :max="lastPage"
      />
      dari {{ lastPage }}
    </div>

    <div>Menampilkan {{ from }} - {{ to }} dari {{ total }} data</div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  page: {
    type: Number,
    required: true,
  },
  lastPage: {
    type: Number,
    required: true,
  },
  pageSize: {
    type: Number,
    required: true,
  },
  from: {
    type: Number,
    required: true,
  },
  to: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits<{
  (e: "update:page", page: number): void;
  (e: "update:pageSize", pageSize: number): void;
}>();
</script>
