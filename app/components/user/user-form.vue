<template>
  <u-modal
    :open="show"
    :title="title"
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
        <u-form-field label="Nama Pengguna">
          <u-input
            v-model="formState.name"
            placeholder="Nama Pengguna"
            class="w-full"
          />
        </u-form-field>
        <u-form-field label="Alamat Email">
          <u-input
            v-model="formState.email"
            placeholder="Alamat Email"
            class="w-full"
          />
        </u-form-field>

        <u-form-field label="Kata Sandi">
          <u-input
            v-model="formState.password"
            placeholder="Kata Sandi"
            class="w-full"
          />
        </u-form-field>

        <u-form-field label="Ulangi Kata Sandi">
          <u-input
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
const props = defineProps({
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
  data: {
    type: Object as () => {
      id?: number;
      name?: string;
      email?: string;
      role?: string;
      password?: string;
      password_confirmation?: string;
    } | null,
    default: () => ({}),
  },
});

const emit = defineEmits(["submit", "close"]);

const formState = reactive({
  id: props.data?.id,
  name: props.data?.name,
  email: props.data?.email,
  role: props.data?.role,
  password: props.data?.password,
  password_confirmation: props.data?.password_confirmation,
});
</script>
