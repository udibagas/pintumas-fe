<template>
  <u-modal
    :open="show"
    :title="title"
    :errors="errors"
    :description="description"
    :close="{ onClick: () => emit('close') }"
    class="w-[400px]"
  >
    <template #body>
      <u-form
        :state="formState"
        class="flex gap-4 flex-col"
        id="user-form"
        @submit.prevent="emit('submit', formState)"
      >
        <u-form-field label="Nama Pengguna" :error="errors.name?.join(',')">
          <u-input
            v-model="formState.name"
            placeholder="Nama Pengguna"
            class="w-full"
          />
        </u-form-field>

        <u-form-field label="Alamat Email" :error="errors.email?.join(',')">
          <u-input
            v-model="formState.email"
            placeholder="Alamat Email"
            class="w-full"
          />
        </u-form-field>

        <u-form-field label="Role" :error="errors.role?.join(',')">
          <u-select
            v-model="formState.role"
            :items="['ADMIN', 'EDITOR', 'USER']"
            placeholder="Pilih Role"
            class="w-full"
          ></u-select>
        </u-form-field>

        <u-form-field label="Kata Sandi" :error="errors.password?.join(',')">
          <u-input
            type="password"
            v-model="formState.password"
            placeholder="Kata Sandi"
            class="w-full"
          />
        </u-form-field>

        <u-form-field label="Ulangi Kata Sandi">
          <u-input
            type="password"
            v-model="formState.password_confirmation"
            placeholder="Ulangi Kata Sandi"
            class="w-full"
          />
        </u-form-field>
      </u-form>
    </template>

    <template #footer>
      <div class="flex justify-end items-center gap-2 w-full">
        <u-button
          color="neutral"
          icon="lucide-circle-x"
          variant="outline"
          @click="emit('close')"
        >
          Batal
        </u-button>
        <u-button
          type="submit"
          form="user-form"
          icon="lucide-save"
          variant="solid"
          color="warning"
        >
          Simpan
        </u-button>
      </div>
    </template>
  </u-modal>
</template>

<script setup lang="ts">
const { formState } = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "Form Pengguna",
  },
  description: {
    type: String,
    default: "Tambah Pengguna Baru",
  },
  formState: {
    type: Object as () => Record<string, any>,
    default: () => ({}),
  },
  errors: {
    type: Object as () => Record<string, string[]>,
    default: () => ({}),
  },
});

const emit = defineEmits(["submit", "close"]);
</script>
