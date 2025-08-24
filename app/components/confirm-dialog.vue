<template>
  <u-modal
    :open="show"
    :close="{ onClick: () => emit('cancel', false) }"
    :title="title"
    description="Aksi ini tidak bisa dibatalkan"
  >
    <template #body>
      <p class="text-center">{{ message }}</p>
    </template>
    <template #footer>
      <div class="flex justify-center items-center gap-2 w-full">
        <u-button
          color="neutral"
          variant="outline"
          label="Tidak"
          @click="emit('cancel', true)"
        />
        <u-button color="error" label="Ya" @click="emit('ok', false)" />
      </div>
    </template>
  </u-modal>
</template>

<script setup>
const emit = defineEmits(["cancel", "ok"]);

defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "Konfirmasi",
  },
  message: {
    type: String,
    default: "Apakah anda yakin?",
  },
});
</script>
