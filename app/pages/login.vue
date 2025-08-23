<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const { login } = useSanctumAuth();

definePageMeta({
  layout: "auth",
});

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
});

const show = ref(false);
const submitting = ref(false);
const error = ref<string | undefined>(undefined);

async function onSubmit(event: FormSubmitEvent<Schema>) {
  submitting.value = true;
  error.value = undefined;

  try {
    const res = await login(event.data);
    console.log(res);
  } catch (e) {
    console.log(e);
    error.value = "Alamat email atau kata sandi Anda salah";
  }

  submitting.value = false;
}
</script>

<template>
  <UCard class="shadow-xl w-100">
    <template #header>
      <h1 class="text-center text-3xl text-yellow-600">PINTUMAS</h1>
      <div class="text-center">
        Pusat Informasi Terpadu Pelabuhan Tanjung Mas
      </div>
    </template>

    <UAlert
      v-if="error"
      title="UPS!"
      :description="error"
      variant="outline"
      color="error"
      class="mb-6"
    />

    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormField label="Alamat Email" name="email">
        <UInput
          v-model="state.email"
          size="xl"
          placeholder="Masukkan email Anda"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Kata Sandi" name="password">
        <UInput
          v-model="state.password"
          size="xl"
          placeholder="Masukkan kata sandi Anda"
          class="w-full"
          :type="show ? 'text' : 'password'"
          :ui="{ trailing: 'pe-1' }"
        >
          <template #trailing>
            <UButton
              color="neutral"
              variant="link"
              size="sm"
              :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
              :aria-label="show ? 'Hide password' : 'Show password'"
              :aria-pressed="show"
              aria-controls="password"
              @click="show = !show"
            />
          </template>
        </UInput>
      </UFormField>

      <UButton
        type="submit"
        size="xl"
        color="warning"
        block
        class="mt-6"
        :loading="submitting"
      >
        Masuk
      </UButton>
    </UForm>
  </UCard>
</template>
